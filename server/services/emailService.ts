import { Resend } from 'resend';
import { ContactFormData } from '../../shared/types/contact.js';
import { prisma } from '../db/client.js';

// ── Attachment payload (set by multer, passed from controller) ─────────────
export interface AttachmentPayload {
  buffer:       Buffer;
  originalname: string;
  mimetype:     string;
  size:         number;
}

// ── Lazy Resend client init ────────────────────────────────────────────────
let resend: Resend | null = null;

const getResendClient = (): Resend | null => {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
};

// ── HTML email template ────────────────────────────────────────────────────
const createContactEmailHtml = (
  data: ContactFormData,
  attachment?: AttachmentPayload,
) => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>新的联系表单提交</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background-color: #1A365D; color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
    .content { padding: 30px 20px; }
    .field { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
    .field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .label { display: block; font-weight: 600; color: #1A365D; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { font-size: 16px; color: #333; }
    .value a { color: #1A365D; text-decoration: none; }
    .value a:hover { text-decoration: underline; }
    .message-box { background-color: #f9fafb; border-left: 4px solid #1A365D; padding: 16px; margin-top: 8px; white-space: pre-wrap; word-wrap: break-word; }
    .attachment-box { display: flex; align-items: center; gap: 10px; background-color: #eef4fb; border: 1px solid #b8d0ec; padding: 12px 16px; margin-top: 8px; }
    .attachment-icon { font-size: 20px; flex-shrink: 0; }
    .attachment-name { font-weight: 700; color: #1A365D; font-size: 14px; }
    .attachment-size { font-size: 12px; color: #666; }
    .footer { background-color: #f9fafb; text-align: center; padding: 20px; color: #666; font-size: 13px; border-top: 1px solid #eee; }
    .footer p { margin: 5px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 新的联系表单提交</h1>
      <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">来自Sureay重型机械官网</p>
    </div>
    <div class="content">
      ${data.inquiryType ? `<div class="field"><span class="label">询价类型</span><div class="value">${data.inquiryType}</div></div>` : ''}
      <div class="field">
        <span class="label">姓名</span>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <span class="label">邮箱</span>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.phone ? `<div class="field"><span class="label">电话</span><div class="value"><a href="tel:${data.phone}">${data.phone}</a></div></div>` : ''}
      ${data.company ? `<div class="field"><span class="label">公司</span><div class="value">${data.company}</div></div>` : ''}
      <div class="field">
        <span class="label">留言内容</span>
        <div class="message-box">${data.message}</div>
      </div>
      ${attachment ? `
      <div class="field">
        <span class="label">附件 / CAD 文件</span>
        <div class="attachment-box">
          <div class="attachment-icon">📎</div>
          <div>
            <div class="attachment-name">${attachment.originalname}</div>
            <div class="attachment-size">${(attachment.size / 1024).toFixed(1)} KB · ${attachment.mimetype}</div>
          </div>
        </div>
      </div>` : ''}
    </div>
    <div class="footer">
      <p><strong>此邮件由网站联系表单自动发送</strong></p>
      <p>请及时回复客户咨询</p>
    </div>
  </div>
</body>
</html>
`;

// ── Plain-text fallback ────────────────────────────────────────────────────
const createContactEmailText = (
  data: ContactFormData,
  attachment?: AttachmentPayload,
) => `
新的联系表单提交

${data.inquiryType ? `询价类型：${data.inquiryType}\n` : ''}姓名：${data.name}
邮箱：${data.email}
${data.phone   ? `电话：${data.phone}\n`   : ''}${data.company ? `公司：${data.company}\n` : ''}
留言内容：
${data.message}
${attachment ? `\n附件：${attachment.originalname} (${(attachment.size / 1024).toFixed(1)} KB)` : ''}
---
此邮件由网站联系表单自动发送
`;

// ── Main export ────────────────────────────────────────────────────────────
export const sendContactEmail = async (
  data:        ContactFormData,
  metadata?:   { ipAddress?: string; userAgent?: string },
  attachment?: AttachmentPayload,
): Promise<{ success: boolean; emailLogId?: string }> => {

  const resendClient = getResendClient();

  // ── No API key: log to DB and bail ──────────────────────────────────────
  if (!resendClient) {
    console.warn('⚠️  Resend API key not configured — skipping email send');
    try {
      const emailLog = await prisma.emailLog.create({
        data: {
          to:           process.env.EMAIL_TO || 'contact@yourdomain.com',
          subject:      `新的联系表单提交 - ${data.name}`,
          templateName: 'contact_form',
          status:       'skipped',
          provider:     'resend',
          errorMessage: 'Resend API key not configured',
        },
      });
      return { success: false, emailLogId: emailLog.id };
    } catch (dbError) {
      console.error('Failed to log skipped email to database:', dbError);
      return { success: false };
    }
  }

  // ── Send via Resend ──────────────────────────────────────────────────────
  try {
    console.log('📧 Sending contact email via Resend…', {
      to:         process.env.EMAIL_TO,
      from:       process.env.EMAIL_FROM,
      attachment: attachment ? attachment.originalname : 'none',
    });

    const result = await resendClient.emails.send({
      from:    process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to:      process.env.EMAIL_TO   || 'contact@yourdomain.com',
      subject: `新的联系表单提交 - ${data.name}`,
      html:    createContactEmailHtml(data, attachment),
      text:    createContactEmailText(data, attachment),
      replyTo: data.email,
      // Buffer attached in-memory — no temp files written to disk
      ...(attachment && {
        attachments: [{
          filename: attachment.originalname,
          content:  attachment.buffer,
        }],
      }),
    });

    console.log('Resend API result:', result);

    const emailLog = await prisma.emailLog.create({
      data: {
        to:           process.env.EMAIL_TO || 'contact@yourdomain.com',
        subject:      `新的联系表单提交 - ${data.name}`,
        templateName: 'contact_form',
        status:       result.data?.id ? 'sent' : 'failed',
        provider:     'resend',
        providerId:   result.data?.id   || null,
        errorMessage: result.error?.message || null,
        sentAt:       result.data?.id ? new Date() : null,
      },
    });

    if (result.error) {
      console.error('❌ Email sending failed:', result.error);
      return { success: false, emailLogId: emailLog.id };
    }

    console.log('✅ Email sent successfully:', result.data?.id);
    return { success: true, emailLogId: emailLog.id };

  } catch (error) {
    console.error('❌ Failed to send email:', error);
    try {
      await prisma.emailLog.create({
        data: {
          to:           process.env.EMAIL_TO || 'contact@yourdomain.com',
          subject:      `新的联系表单提交 - ${data.name}`,
          templateName: 'contact_form',
          status:       'failed',
          provider:     'resend',
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } catch (dbError) {
      console.error('Failed to log email error to database:', dbError);
    }
    return { success: false };
  }
};
