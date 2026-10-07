import type { Appointment } from '../types';

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Format service names from JSONB
 */
function formatServices(services: any): string {
  if (Array.isArray(services)) {
    return services.map((s: any) => s.name || s.id || 'Custom Ritual').join(', ');
  }
  return 'Salon Service Ritual';
}

/**
 * Send an email via the /api/send-email endpoint (works in both Vite dev & Vercel serverless)
 */
export async function sendEmailViaApi(payload: {
  to: string | string[];
  subject: string;
  html: string;
  apiKey?: string;
  from?: string;
}): Promise<SendEmailResult> {
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${res.status}: Failed to send email`,
      };
    }

    return {
      success: true,
      messageId: data.id || data.data?.id,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Network error communicating with email endpoint',
    };
  }
}

/**
 * Send booking received email to customer and owner
 */
export async function sendBookingReceivedEmails(
  appointment: Appointment,
  overrideApiKey?: string
): Promise<{ customer: SendEmailResult; owner?: SendEmailResult }> {
  const servicesList = formatServices(appointment.selected_services);

  // 1. Customer Confirmation Email
  const customerSubject = `Reservation Request Received — LUMÉ Hair Studio (Ref: ${appointment.booking_reference})`;
  const customerHtml = `
    <div style="background-color: #ECE7E1; padding: 40px 15px; font-family: 'Georgia', serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #D4AF37; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 40px 32px;">
        
        <div style="text-align: center; border-bottom: 2px solid #F5EFEB; padding-bottom: 24px; margin-bottom: 28px;">
          <h1 style="margin: 0; font-size: 32px; letter-spacing: 0.28em; color: #24201D; font-weight: 400;">L U M É</h1>
          <p style="margin: 6px 0 0 0; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #B98272; font-family: sans-serif;">
            Hair Artistry &amp; Organic Scalp Rituals · SoHo, New York
          </p>
        </div>

        <div style="background-color: #FBF9F6; border-left: 4px solid #B98272; padding: 16px 20px; margin-bottom: 28px;">
          <span style="font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #B98272; font-weight: bold; display: block; margin-bottom: 4px;">
            ● Request Received · Pending Concierge Confirmation
          </span>
          <h2 style="margin: 0; font-size: 20px; color: #24201D; font-weight: 400;">
            We Have Received Your Appointment Request
          </h2>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #50463E; margin-bottom: 16px;">
          Dear <strong>${appointment.customer_name}</strong>,
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #50463E; margin-bottom: 24px;">
          Thank you for choosing LUMÉ Hair Studio. Your reservation request has been received by our salon concierge. We are reviewing schedule availability and will send your final confirmation shortly.
        </p>

        <div style="background-color: #FAF8F5; border: 1px solid #EBE4DC; padding: 24px; margin-bottom: 28px;">
          <div style="text-align: right; margin-bottom: 16px;">
            <span style="background: #24201D; color: #D4AF37; font-family: monospace; font-size: 11px; padding: 4px 10px; font-weight: bold; letter-spacing: 0.1em;">
              REF: ${appointment.booking_reference}
            </span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; font-family: sans-serif;">
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Requested Rituals:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #24201D;">${servicesList}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Preferred Artist:</td>
              <td style="padding: 10px 0; text-align: right; color: #24201D;">${appointment.stylist_name || 'Assigned Master Artist'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Requested Date:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #24201D;">${appointment.appointment_date}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Requested Time:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #24201D;">${appointment.appointment_time}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Estimated Total:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #B98272; font-size: 16px;">$${Number(appointment.total_price || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #756B63;">Current Status:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #B98272;">PENDING CONFIRMATION</td>
            </tr>
          </table>
        </div>

        <div style="border-top: 1px solid #EDE5DC; padding-top: 24px; text-align: center; font-size: 12px; color: #756B63; font-family: sans-serif;">
          <p style="margin: 0 0 4px 0; font-weight: 600; color: #24201D;">LUMÉ Hair Studio · Manhattan Flagship</p>
          <p style="margin: 0 0 8px 0;">123 Mercer Street, SoHo, New York, NY 10012</p>
          <p style="margin: 0; font-size: 11px; color: #A09489;">Direct Line: (555) 123-4567 · concierge@lumehairstudio.com</p>
        </div>
      </div>
    </div>
  `;

  const customerResult = await sendEmailViaApi({
    to: appointment.customer_email,
    subject: customerSubject,
    html: customerHtml,
    apiKey: overrideApiKey,
  });

  // 2. Salon Owner Alert Email
  const ownerEmail =
    (import.meta as any).env?.VITE_BUSINESS_EMAIL ||
    'nzlpatwary901@gmail.com';

  const ownerSubject = `🚨 New Booking Alert: ${appointment.customer_name} (Ref: ${appointment.booking_reference})`;
  const ownerHtml = `
    <div style="background-color: #ECE7E1; padding: 40px 15px; font-family: 'Georgia', serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #D4AF37; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 40px 32px;">
        
        <div style="text-align: center; border-bottom: 2px solid #F5EFEB; padding-bottom: 24px; margin-bottom: 28px;">
          <h1 style="margin: 0; font-size: 32px; letter-spacing: 0.28em; color: #24201D; font-weight: 400;">L U M É</h1>
          <p style="margin: 6px 0 0 0; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #B98272; font-family: sans-serif;">
            Salon Owner &amp; Concierge Notification Desk
          </p>
        </div>

        <div style="background-color: #FBF9F6; border-left: 4px solid #D4AF37; padding: 16px 20px; margin-bottom: 28px;">
          <span style="font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #8A6D3B; font-weight: bold; display: block; margin-bottom: 4px;">
            🚨 Action Required · New Client Booking
          </span>
          <h2 style="margin: 0; font-size: 20px; color: #24201D; font-weight: 400;">
            New Appointment Request Received
          </h2>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #50463E; margin-bottom: 20px;">
          A new client has just submitted an appointment reservation request on your studio website. Review the client details below and open your salon dashboard to confirm or reschedule.
        </p>

        <!-- Client Info Card -->
        <div style="background-color: #FAF8F5; border: 1px solid #EBE4DC; padding: 20px; margin-bottom: 24px; font-family: sans-serif;">
          <div style="font-weight: 600; color: #24201D; font-size: 14px; margin-bottom: 12px; border-bottom: 1px solid #EAE3DA; padding-bottom: 8px;">
            Client Information
          </div>
          <table style="width: 100%; font-size: 13px;">
            <tr><td style="color: #756B63; padding: 4px 0;">Client Name:</td><td style="font-weight: 600; text-align: right; color: #24201D;">${appointment.customer_name}</td></tr>
            <tr><td style="color: #756B63; padding: 4px 0;">Email:</td><td style="text-align: right; color: #24201D;"><a href="mailto:${appointment.customer_email}">${appointment.customer_email}</a></td></tr>
            <tr><td style="color: #756B63; padding: 4px 0;">Phone:</td><td style="text-align: right; color: #24201D;">${appointment.customer_phone}</td></tr>
            ${appointment.notes ? `<tr><td style="color: #756B63; padding: 4px 0;">Notes:</td><td style="text-align: right; font-style: italic; color: #24201D;">"${appointment.notes}"</td></tr>` : ''}
          </table>
        </div>

        <!-- Appointment Info Card -->
        <div style="background-color: #FAF8F5; border: 1px solid #EBE4DC; padding: 20px; margin-bottom: 28px; font-family: sans-serif;">
          <div style="font-weight: 600; color: #24201D; font-size: 14px; margin-bottom: 12px; border-bottom: 1px solid #EAE3DA; padding-bottom: 8px;">
            Reservation Details
          </div>
          <table style="width: 100%; font-size: 13px;">
            <tr><td style="color: #756B63; padding: 4px 0;">Booking Ref:</td><td style="font-family: monospace; font-weight: bold; text-align: right; color: #24201D;">${appointment.booking_reference}</td></tr>
            <tr><td style="color: #756B63; padding: 4px 0;">Requested Services:</td><td style="font-weight: 600; text-align: right; color: #24201D;">${servicesList}</td></tr>
            <tr><td style="color: #756B63; padding: 4px 0;">Stylist:</td><td style="text-align: right; color: #24201D;">${appointment.stylist_name || 'First Available Master Artist'}</td></tr>
            <tr><td style="color: #756B63; padding: 4px 0;">Date:</td><td style="font-weight: 600; text-align: right; color: #24201D;">${appointment.appointment_date}</td></tr>
            <tr><td style="color: #756B63; padding: 4px 0;">Time:</td><td style="font-weight: 600; text-align: right; color: #24201D;">${appointment.appointment_time}</td></tr>
            <tr><td style="color: #756B63; padding: 4px 0;">Total Starting Price:</td><td style="font-weight: bold; color: #B98272; font-size: 15px; text-align: right;">$${Number(appointment.total_price || 0).toFixed(2)}</td></tr>
            <tr><td style="color: #756B63; padding: 4px 0;">Current Status:</td><td style="font-weight: bold; color: #B98272; text-align: right;">PENDING CONFIRMATION</td></tr>
          </table>
        </div>

        <div style="border-top: 1px solid #EDE5DC; padding-top: 20px; text-align: center; font-size: 12px; color: #756B63; font-family: sans-serif;">
          <p style="margin: 0 0 4px 0;">Log in to your <strong>Studio Reservations Desk</strong> to confirm or reschedule.</p>
          <p style="margin: 0; color: #A09489;">LUMÉ Hair Studio · Automated Concierge System</p>
        </div>
      </div>
    </div>
  `;

  let ownerResult: SendEmailResult | undefined;
  if (ownerEmail && ownerEmail !== appointment.customer_email) {
    ownerResult = await sendEmailViaApi({
      to: ownerEmail,
      subject: ownerSubject,
      html: ownerHtml,
      apiKey: overrideApiKey,
    });
  }

  return { customer: customerResult, owner: ownerResult };
}

/**
 * Send appointment confirmation email to customer
 */
export async function sendBookingConfirmedEmail(
  appointment: Appointment,
  overrideApiKey?: string
): Promise<SendEmailResult> {
  const servicesList = formatServices(appointment.selected_services);
  const subject = `Your Reservation is Confirmed — LUMÉ Hair Studio (Ref: ${appointment.booking_reference})`;
  const html = `
    <div style="background-color: #ECE7E1; padding: 40px 15px; font-family: 'Georgia', serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #D4AF37; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 40px 32px;">
        
        <div style="text-align: center; border-bottom: 2px solid #F5EFEB; padding-bottom: 24px; margin-bottom: 28px;">
          <h1 style="margin: 0; font-size: 32px; letter-spacing: 0.28em; color: #24201D; font-weight: 400;">L U M É</h1>
          <p style="margin: 6px 0 0 0; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #B98272; font-family: sans-serif;">
            Hair Artistry &amp; Organic Scalp Rituals · SoHo, New York
          </p>
        </div>

        <div style="background-color: #FBF9F6; border-left: 4px solid #3F6647; padding: 16px 20px; margin-bottom: 28px;">
          <span style="font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #3F6647; font-weight: bold; display: block; margin-bottom: 4px;">
            ● Officially Confirmed &amp; Secured
          </span>
          <h2 style="margin: 0; font-size: 20px; color: #24201D; font-weight: 400;">
            We Look Forward to Welcoming You
          </h2>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #50463E; margin-bottom: 16px;">
          Dear <strong>${appointment.customer_name}</strong>,
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #50463E; margin-bottom: 24px;">
          We are delighted to confirm that your upcoming appointment at LUMÉ Hair Studio has been officially approved and reserved on our calendar.
        </p>

        <div style="background-color: #FAF8F5; border: 1px solid #EBE4DC; padding: 24px; margin-bottom: 28px;">
          <div style="text-align: right; margin-bottom: 16px;">
            <span style="background: #24201D; color: #D4AF37; font-family: monospace; font-size: 11px; padding: 4px 10px; font-weight: bold; letter-spacing: 0.1em;">
              REF: ${appointment.booking_reference}
            </span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; font-family: sans-serif;">
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Confirmed Rituals:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #24201D;">${servicesList}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Master Artist:</td>
              <td style="padding: 10px 0; text-align: right; color: #24201D;">${appointment.stylist_name || 'Assigned Master Artist'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Appointment Date:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #24201D;">${appointment.appointment_date}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Scheduled Time:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #24201D;">${appointment.appointment_time}</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Total Investment:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #B98272; font-size: 16px;">$${Number(appointment.total_price || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #756B63;">Booking Status:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #3F6647;">CONFIRMED &amp; SECURED</td>
            </tr>
          </table>
        </div>

        <div style="font-size: 13px; line-height: 1.6; color: #756B63; font-family: sans-serif; margin-bottom: 28px;">
          <p style="margin: 0 0 8px 0;"><strong>Salon Concierge Notes:</strong></p>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Please arrive 5–10 minutes early to enjoy our organic herbal botanical tea.</li>
            <li>For any rescheduling requests, please provide 24 hours advance notice.</li>
          </ul>
        </div>

        <div style="border-top: 1px solid #EDE5DC; padding-top: 24px; text-align: center; font-size: 12px; color: #756B63; font-family: sans-serif;">
          <p style="margin: 0 0 4px 0; font-weight: 600; color: #24201D;">LUMÉ Hair Studio · Manhattan Flagship</p>
          <p style="margin: 0 0 8px 0;">123 Mercer Street, SoHo, New York, NY 10012</p>
          <p style="margin: 0; font-size: 11px; color: #A09489;">Direct Line: (555) 123-4567 · concierge@lumehairstudio.com</p>
        </div>
      </div>
    </div>
  `;

  return sendEmailViaApi({
    to: appointment.customer_email,
    subject,
    html,
    apiKey: overrideApiKey,
  });
}

/**
 * Send an ultra-luxurious VIP salon test confirmation email to verify Resend styling
 */
export async function sendTestResendEmail(
  toEmail: string,
  apiKey?: string
): Promise<SendEmailResult> {
  const subject = `VIP Appointment Confirmation Preview — LUMÉ Hair Studio (Ref: LUME-VIP-901)`;
  const html = `
    <div style="background-color: #ECE7E1; padding: 40px 15px; font-family: 'Georgia', serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #D4AF37; box-shadow: 0 4px 20px rgba(0,0,0,0.06); padding: 40px 32px;">
        
        <!-- Top Gold Ribbon & Logo -->
        <div style="text-align: center; border-bottom: 2px solid #F5EFEB; padding-bottom: 24px; margin-bottom: 28px;">
          <div style="display: inline-block; padding: 4px 12px; background: #FAF7F2; border: 1px solid #D4AF37; color: #8A6D3B; font-size: 10px; font-family: sans-serif; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 12px; font-weight: 600;">
            Official Concierge Verification
          </div>
          <h1 style="margin: 0; font-size: 32px; letter-spacing: 0.28em; color: #24201D; font-weight: 400;">L U M É</h1>
          <p style="margin: 6px 0 0 0; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #B98272; font-family: sans-serif;">
            Hair Artistry &amp; Organic Scalp Rituals · SoHo, New York
          </p>
        </div>

        <!-- Status Banner -->
        <div style="background-color: #FBF9F6; border-left: 4px solid #D4AF37; padding: 16px 20px; margin-bottom: 28px;">
          <span style="font-family: sans-serif; font-size: 11px; text-transform: uppercase; letter-spacing: 0.15em; color: #3F6647; font-weight: bold; display: block; margin-bottom: 4px;">
            ● Resend Email Engine Active &amp; Verified
          </span>
          <h2 style="margin: 0; font-size: 20px; color: #24201D; font-weight: 400;">
            VIP Reservation Confirmation Preview
          </h2>
        </div>

        <!-- Client Greeting -->
        <p style="font-size: 15px; line-height: 1.6; color: #50463E; margin-bottom: 16px;">
          Dear <strong>Salon Owner / Valued Client</strong>,
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #50463E; margin-bottom: 24px;">
          This is the actual luxury appointment confirmation letter your clients receive when their booking is confirmed at LUMÉ Hair Studio.
        </p>

        <!-- Appointment Card with Gold Borders -->
        <div style="background-color: #FAF8F5; border: 1px solid #EBE4DC; padding: 24px; margin-bottom: 28px;">
          <div style="text-align: right; margin-bottom: 16px;">
            <span style="background: #24201D; color: #D4AF37; font-family: monospace; font-size: 11px; padding: 4px 10px; font-weight: bold; letter-spacing: 0.1em;">
              REF: LUME-2026-VIP-901
            </span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; font-family: sans-serif;">
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Selected Rituals:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #24201D;">Signature Botanical Cut &amp; Organic Gloss</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Master Artist:</td>
              <td style="padding: 10px 0; text-align: right; color: #24201D;">Elena Vance (Creative Director)</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Appointment Date:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #24201D;">Friday, October 9, 2026</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Scheduled Time:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #24201D;">3:00 PM EST (75 min)</td>
            </tr>
            <tr style="border-bottom: 1px solid #EAE3DA;">
              <td style="padding: 10px 0; color: #756B63;">Total Investment:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #B98272; font-size: 16px;">$185.00 USD</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #756B63;">Booking Status:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #3F6647;">CONFIRMED &amp; SECURED</td>
            </tr>
          </table>
        </div>

        <!-- Concierge Instructions -->
        <div style="font-size: 13px; line-height: 1.6; color: #756B63; font-family: sans-serif; margin-bottom: 28px;">
          <p style="margin: 0 0 8px 0;"><strong>Salon Concierge Notes:</strong></p>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Please arrive 10 minutes early to enjoy our complementary organic herbal botanical tea.</li>
            <li>Private valet parking available at Mercer Street entrance.</li>
            <li>For any rescheduling requests, please provide 24 hours advance notice.</li>
          </ul>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #EDE5DC; padding-top: 24px; text-align: center; font-size: 12px; color: #756B63; font-family: sans-serif;">
          <p style="margin: 0 0 4px 0; font-weight: 600; color: #24201D;">LUMÉ Hair Studio · Manhattan Flagship</p>
          <p style="margin: 0 0 8px 0;">123 Mercer Street, SoHo, New York, NY 10012</p>
          <p style="margin: 0; font-size: 11px; color: #A09489;">Direct Line: (555) 123-4567 · concierge@lumehairstudio.com</p>
        </div>

      </div>
    </div>
  `;

  return sendEmailViaApi({
    to: toEmail,
    subject,
    html,
    apiKey,
  });
}
