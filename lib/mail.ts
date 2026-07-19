import { Resend } from 'resend';

export async function sendLeadNotification(lead: { 
  name: string; 
  email: string; 
  phone?: string; 
  company?: string; 
  subject?: string; 
  message?: string; 
  createdAt: Date 
}) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("CRITICAL ERROR: RESEND_API_KEY is not set in environment variables!");
      return false;
    }
    
    const resend = new Resend(apiKey);

    // 1. Send the internal notification to the company
    const { error: notificationError } = await resend.emails.send({
      from: 'I-SPINE <onboarding@resend.dev>', // Resend testing domain (change to your verified domain later)
      to: process.env.ADMIN_EMAIL || 'ispineofficial@gmail.com', 
      subject: lead.subject ? `New Lead: ${lead.subject}` : 'New Contact Form Submission',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #a51c30; margin-bottom: 20px; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 120px;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${lead.email}" style="color: #0066cc;">${lead.email}</a></td>
            </tr>
            ${lead.phone ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${lead.phone}</td>
            </tr>` : ''}
            ${lead.company ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Company:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${lead.company}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><strong>Submitted At:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${lead.createdAt.toISOString()}</td>
            </tr>
          </table>

          ${lead.message ? `
          <div style="margin-top: 25px;">
            <h3 style="color: #333; font-size: 16px; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #a51c30; white-space: pre-wrap; font-family: monospace;">
              ${lead.message}
            </div>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #888; text-align: center;">
            This email was sent automatically from the I-SPINE PVT LTD platform.
          </div>
        </div>
      `
    });

    if (notificationError) {
      console.error("Resend API Error (Internal Notification):", notificationError);
      return false;
    }

    // 2. Send the confirmation auto-reply to the user (COMMENTED OUT FOR TESTING TIER)
    // Resend's free tier / onboarding domain ONLY allows sending to your own verified email.
    // Sending an auto-reply to the user's email will cause a 403 Forbidden error until you verify a custom domain.
    /*
    const { error: autoReplyError } = await resend.emails.send({
      from: 'I-SPINE <onboarding@resend.dev>', // Resend testing domain
      to: lead.email, 
      subject: 'We received your message',
      html: \`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #0A1F44; margin-bottom: 20px;">Thank You for Reaching Out</h2>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Dear \${lead.name},
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            We have securely received your inquiry. Our advisory team will review your details and reach out shortly to discuss your strategic objectives.
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin-top: 30px;">
            Best regards,<br>
            <strong>The I-SPINE PVT LTD Team</strong>
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #888;">
            You are receiving this email because you submitted a contact form on our website. Please do not reply directly to this automated message.
          </div>
        </div>
      \`
    });

    if (autoReplyError) {
      console.error("Resend API Error (Auto-Reply):", autoReplyError);
    }
    */
    
    return true;
  } catch (error) {
    console.error("Error sending email via Resend:", error);
    return false;
  }
}
