import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ServiceItemSnapshot {
  id: string;
  name: string;
  duration?: string;
  price?: string;
  priceNumber?: number;
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
    const resendFromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "LUMÉ Hair Studio <onboarding@resend.dev>";
    const ownerEmail = Deno.env.get("OWNER_EMAIL") || "";

    const { appointmentId, eventType } = await req.json();

    if (!appointmentId || !eventType) {
      return new Response(
        JSON.stringify({ error: "appointmentId and eventType are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return new Response(
        JSON.stringify({ error: "Missing Supabase credentials in Edge Function environment." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // 1. Fetch appointment details
    const { data: appointment, error: appError } = await supabaseAdmin
      .from("appointments")
      .select("*")
      .eq("id", appointmentId)
      .single();

    if (appError || !appointment) {
      return new Response(
        JSON.stringify({ error: "Appointment not found." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Helper to format service names
    const servicesList = Array.isArray(appointment.selected_services)
      ? appointment.selected_services.map((s: ServiceItemSnapshot) => s.name || s.id).join(", ")
      : "Custom Studio Ritual";

    // Helper function to dispatch via Resend REST API
    async function sendResendMail(to: string, subject: string, htmlContent: string) {
      if (!resendApiKey) {
        console.warn("[send-booking-email] RESEND_API_KEY is not configured yet. Skipping actual network dispatch.");
        return { success: false, reason: "RESEND_API_KEY_NOT_CONFIGURED" };
      }

      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFromEmail,
          to: [to],
          subject,
          html: htmlContent,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`[send-booking-email] Resend API error (${res.status}):`, errorText);
        return { success: false, error: errorText };
      }

      const json = await res.json();
      return { success: true, data: json };
    }

    // Helper to check idempotency and record log
    async function recordNotification(eventKey: string, sendFn: () => Promise<{ success: boolean; error?: string }>) {
      // Check if already sent
      const { data: existing } = await supabaseAdmin
        .from("email_notifications")
        .select("id, status")
        .eq("appointment_id", appointment.id)
        .eq("event_type", eventKey)
        .maybeSingle();

      if (existing && existing.status === "sent") {
        console.log(`[send-booking-email] Event ${eventKey} already sent for appointment ${appointment.id}. Skipping.`);
        return { skipped: true };
      }

      const result = await sendFn();

      if (result.success) {
        await supabaseAdmin.from("email_notifications").upsert(
          {
            appointment_id: appointment.id,
            event_type: eventKey,
            status: "sent",
            sent_at: new Date().toISOString(),
            error_message: null,
          },
          { onConflict: "appointment_id,event_type" }
        );
      } else {
        await supabaseAdmin.from("email_notifications").upsert(
          {
            appointment_id: appointment.id,
            event_type: eventKey,
            status: "failed",
            sent_at: null,
            error_message: result.error || "Failed or unconfigured",
          },
          { onConflict: "appointment_id,event_type" }
        );
      }

      return result;
    }

    // ========================================================================
    // EVENT 1: BOOKING RECEIVED (Customer + Owner)
    // ========================================================================
    if (eventType === "booking_received") {
      // Customer Email
      await recordNotification("booking_received_customer", async () => {
        const subject = "Your LUMÉ Appointment Request Has Been Received";
        const html = `
          <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #F7F3EE; color: #24201D; padding: 32px; border: 1px solid #EDE5DC;">
            <div style="text-align: center; border-bottom: 1px solid rgba(36,32,29,0.1); padding-bottom: 24px; margin-bottom: 24px;">
              <h1 style="letter-spacing: 0.25em; font-size: 28px; margin: 0; color: #24201D;">LUMÉ</h1>
              <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #B98272; margin-top: 6px;">Hair Artistry · SoHo, New York</p>
            </div>
            
            <h2 style="font-size: 22px; font-weight: normal; margin-bottom: 16px;">Appointment Request Received</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #50463E;">Dear ${appointment.customer_name},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #50463E;">
              Thank you for choosing LUMÉ Hair Studio. We have received your booking request. 
              <strong>Your appointment is currently pending confirmation</strong> by our studio concierge.
            </p>
            
            <div style="background: #FFFFFF; border: 1px solid rgba(36,32,29,0.15); padding: 20px; margin: 24px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr><td style="padding: 6px 0; color: #756B63;">Reference Code:</td><td style="padding: 6px 0; font-family: monospace; font-weight: bold; text-align: right;">${appointment.booking_reference}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Services:</td><td style="padding: 6px 0; font-weight: 500; text-align: right;">${servicesList}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Master Artist:</td><td style="padding: 6px 0; text-align: right;">${appointment.stylist_name || "First Available Master Artist"}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Requested Date:</td><td style="padding: 6px 0; text-align: right;">${appointment.appointment_date}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Requested Time:</td><td style="padding: 6px 0; text-align: right;">${appointment.appointment_time}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Current Status:</td><td style="padding: 6px 0; font-weight: bold; color: #B98272; text-align: right;">PENDING CONFIRMATION</td></tr>
              </table>
            </div>

            <p style="font-size: 13px; line-height: 1.6; color: #756B63;">
              Our studio concierge will review your schedule and send a confirmation email once your appointment has been finalized on our calendar.
            </p>

            <div style="border-top: 1px solid rgba(36,32,29,0.1); margin-top: 32px; padding-top: 20px; font-size: 11px; color: #756B63; text-align: center;">
              <p>LUMÉ Hair Studio · 123 Mercer Street, SoHo, New York, NY 10012</p>
              <p>Need to modify your request? Call (555) 123-4567 or email concierge@lumehairstudio.com</p>
            </div>
          </div>
        `;
        return sendResendMail(appointment.customer_email, subject, html);
      });

      // Owner Notification Email
      if (ownerEmail) {
        await recordNotification("booking_received_owner", async () => {
          const subject = `New Appointment Request — ${appointment.booking_reference}`;
          const html = `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #FFFFFF; color: #24201D; padding: 24px; border: 1px solid #E5E7EB;">
              <h2 style="margin-top: 0; color: #24201D;">New Client Appointment Request</h2>
              <p style="font-size: 14px; color: #4B5563;">A new booking has been submitted on the website and is awaiting your confirmation.</p>
              
              <ul style="font-size: 14px; line-height: 1.8; color: #1F2937;">
                <li><strong>Reference:</strong> ${appointment.booking_reference}</li>
                <li><strong>Customer:</strong> ${appointment.customer_name}</li>
                <li><strong>Email:</strong> ${appointment.customer_email}</li>
                <li><strong>Phone:</strong> ${appointment.customer_phone}</li>
                <li><strong>Services:</strong> ${servicesList}</li>
                <li><strong>Stylist:</strong> ${appointment.stylist_name || "No Preference"}</li>
                <li><strong>Date:</strong> ${appointment.appointment_date}</li>
                <li><strong>Time:</strong> ${appointment.appointment_time}</li>
                <li><strong>Notes:</strong> ${appointment.notes || "None provided"}</li>
                <li><strong>Status:</strong> Pending</li>
              </ul>

              <p style="font-size: 13px; color: #6B7280; margin-top: 24px;">Log in to the LUMÉ Admin Dashboard to confirm or reschedule this request.</p>
            </div>
          `;
          return sendResendMail(ownerEmail, subject, html);
        });
      }
    }

    // ========================================================================
    // EVENT 2: BOOKING CONFIRMED (Customer)
    // ========================================================================
    else if (eventType === "booking_confirmed") {
      await recordNotification("booking_confirmed_customer", async () => {
        const subject = "Your LUMÉ Appointment is Confirmed";
        const html = `
          <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #F7F3EE; color: #24201D; padding: 32px; border: 1px solid #EDE5DC;">
            <div style="text-align: center; border-bottom: 1px solid rgba(36,32,29,0.1); padding-bottom: 24px; margin-bottom: 24px;">
              <h1 style="letter-spacing: 0.25em; font-size: 28px; margin: 0; color: #24201D;">LUMÉ</h1>
              <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #B98272; margin-top: 6px;">Hair Artistry · SoHo, New York</p>
            </div>
            
            <h2 style="font-size: 22px; font-weight: normal; margin-bottom: 16px; color: #3F6647;">Appointment Confirmed</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #50463E;">Dear ${appointment.customer_name},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #50463E;">
              We are delighted to confirm your upcoming appointment at LUMÉ Hair Studio. Your reserved time has been secured on our schedule.
            </p>
            
            <div style="background: #FFFFFF; border: 1px solid rgba(36,32,29,0.15); padding: 20px; margin: 24px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr><td style="padding: 6px 0; color: #756B63;">Reference Code:</td><td style="padding: 6px 0; font-family: monospace; font-weight: bold; text-align: right;">${appointment.booking_reference}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Services:</td><td style="padding: 6px 0; font-weight: 500; text-align: right;">${servicesList}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Master Artist:</td><td style="padding: 6px 0; text-align: right;">${appointment.stylist_name || "Assigned Master Artist"}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Date:</td><td style="padding: 6px 0; text-align: right; font-weight: bold;">${appointment.appointment_date}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Time:</td><td style="padding: 6px 0; text-align: right; font-weight: bold;">${appointment.appointment_time}</td></tr>
                <tr><td style="padding: 6px 0; color: #756B63;">Status:</td><td style="padding: 6px 0; font-weight: bold; color: #3F6647; text-align: right;">CONFIRMED</td></tr>
              </table>
            </div>

            <p style="font-size: 13px; line-height: 1.6; color: #756B63;">
              We kindly ask that you arrive 5–10 minutes prior to your appointment time to enjoy our organic herbal refreshments and relaxing consultation.
            </p>

            <div style="border-top: 1px solid rgba(36,32,29,0.1); margin-top: 32px; padding-top: 20px; font-size: 11px; color: #756B63; text-align: center;">
              <p>LUMÉ Hair Studio · 123 Mercer Street, SoHo, New York, NY 10012</p>
              <p>For rescheduling, please provide 48 hours notice at (555) 123-4567.</p>
            </div>
          </div>
        `;
        return sendResendMail(appointment.customer_email, subject, html);
      });
    }

    // ========================================================================
    // EVENT 3: BOOKING CANCELLED (Customer)
    // ========================================================================
    else if (eventType === "booking_cancelled") {
      await recordNotification("booking_cancelled_customer", async () => {
        const subject = "Update Regarding Your LUMÉ Appointment";
        const html = `
          <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #F7F3EE; color: #24201D; padding: 32px; border: 1px solid #EDE5DC;">
            <div style="text-align: center; border-bottom: 1px solid rgba(36,32,29,0.1); padding-bottom: 24px; margin-bottom: 24px;">
              <h1 style="letter-spacing: 0.25em; font-size: 28px; margin: 0; color: #24201D;">LUMÉ</h1>
            </div>
            
            <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 16px; color: #8A5243;">Appointment Status Update</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #50463E;">Dear ${appointment.customer_name},</p>
            <p style="font-size: 14px; line-height: 1.6; color: #50463E;">
              We are writing to let you know that your appointment request (Ref: <code>${appointment.booking_reference}</code>) scheduled for ${appointment.appointment_date} at ${appointment.appointment_time} has been <strong>cancelled</strong>.
            </p>
            
            <p style="font-size: 13px; line-height: 1.6; color: #756B63;">
              If this cancellation was unexpected or you would like to select an alternative date or stylist, please visit our website or contact our concierge directly.
            </p>

            <div style="border-top: 1px solid rgba(36,32,29,0.1); margin-top: 32px; padding-top: 20px; font-size: 11px; color: #756B63; text-align: center;">
              <p>LUMÉ Hair Studio · 123 Mercer Street, SoHo, New York · (555) 123-4567</p>
            </div>
          </div>
        `;
        return sendResendMail(appointment.customer_email, subject, html);
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: `Processed ${eventType} event successfully.` }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: unknown) {
    console.error("[send-booking-email] Exception:", err);
    const msg = err instanceof Error ? err.message : "Internal error";
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
