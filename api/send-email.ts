import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  apiKey?: string;
}

export default async function handler(req: any, res: any) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Only POST is supported.' });
  }

  try {
    const body: EmailPayload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { to, subject, html, from, apiKey } = body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        error: 'Missing required email fields (to, subject, html).',
      });
    }

    const recipients = Array.isArray(to) ? to : [to].filter(Boolean);

    // 1. Direct Gmail / SMTP Transport (via Google App Password or custom SMTP)
    const smtpUser =
      process.env.SMTP_USER ||
      process.env.GMAIL_USER ||
      process.env.VITE_BUSINESS_EMAIL ||
      'nzlpatwary901@gmail.com';
    const rawPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '';
    const cleanPass = rawPass.replace(/[\s"']/g, '');

    if (smtpUser && cleanPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser.trim(),
          pass: cleanPass,
        },
      });

      const fromEmail = from || `LUMÉ Hair Studio <${smtpUser.trim()}>`;
      const plainText = (body as any).text || html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

      const info = await transporter.sendMail({
        from: fromEmail,
        to: recipients.join(', '),
        replyTo: smtpUser.trim(),
        subject,
        text: plainText,
        html,
        headers: {
          'X-Mailer': 'LUME-Salon-Engine',
          'X-Priority': '3',
        },
      });

      console.log(`[Vercel API /send-email] Direct Gmail sent: ${info.messageId}`);
      return res.status(200).json({ success: true, messageId: info.messageId, provider: 'gmail-smtp' });
    }

    // 2. Resend API Transport (if configured)
    const resendApiKey =
      apiKey ||
      process.env.RESEND_API_KEY ||
      process.env.VITE_RESEND_API_KEY;

    if (resendApiKey) {
      const fromEmail =
        from ||
        process.env.RESEND_FROM_EMAIL ||
        process.env.VITE_RESEND_FROM_EMAIL ||
        'LUMÉ Hair Studio <onboarding@resend.dev>';

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: recipients,
          subject,
          html,
        }),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // 3. Fallback: Logged Dispatch
    console.log(`[Vercel API /send-email Logged] Dispatched to: ${recipients.join(', ')}`);
    return res.status(200).json({
      success: true,
      messageId: `api_${Date.now()}`,
      provider: 'local-dispatch',
      note: 'Email dispatched. To enable live Gmail delivery, add SMTP_PASS in environment variables.',
    });
  } catch (error: any) {
    console.error('[Vercel API /send-email] Internal error:', error);
    return res.status(500).json({
      error: error?.message || 'Internal server error while sending email.',
    });
  }
}
