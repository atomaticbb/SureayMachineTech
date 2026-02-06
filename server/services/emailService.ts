import { Resend } from 'resend';
import { ContactFormData } from '../../shared/types/contact.js';
import { prisma } from '../db/client.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// HTML 邮件模板
const createContactEmailHtml = (data: ContactFormData) => `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>新的联系表单提交</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #1A365D;
      color: white;
      padding: 30px 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      padding: 30px 20px;
    }
    .field {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .label {
      display: block;
      font-weight: 600;
      color: #1A365D;
      margin-bottom: 8px;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .value {
      font-size: 16px;
      color: #333;
    }
    .value a {
      color: #1A365D;
      text-decoration: none;
    }
   .value a:hover {
      text-decoration: underline;
    }
    .message-box {
      background-color: #f9fafb;
      border-left: 4px solid #1A365D;
      padding: 16px;
      margin-top: 8px;
      border-radius: 4px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .footer {
      background-color: #f9fafb;
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 13px;
      border-top: 1px solid #eee;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📧 新的联系表单提交</h1>
      <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">来自破碎机刀片网站</p>
    </div>
    <div class="content">
      <div class="field">
        <span class="label">姓名</span>
        <div class="value">${data.name}</div>
      </div>
      <div class="field">
        <span class="label">邮箱</span>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${
        data.phone
          ? `<div class="field">
          <span class="label">电话</span>
          <div class="value"><a href="tel:${data.phone}">${data.phone}</a></div>
        </div>`
          : ''
      }
      ${
        data.company
          ? `<div class="field">
          <span class="label">公司</span>
          <div class="value">${data.company}</div>
        </div>`
          : ''
      }
      <div class="field">
        <span class="label">留言内容</span>
        <div class="message-box">${data.message}</div>
      </div>
    </div>
    <div class="footer">
      <p><strong>此邮件由网站联系表单自动发送</strong></p>
      <p>请及时回复客户咨询</p>
    </div>
  </div>
</body>
</html>
`;

// 纯文本邮件模板（备用）
const createContactEmailText = (data: ContactFormData) => `
新的联系表单提交

姓名：${data.name}
邮箱：${data.email}
${data.phone ? `电话：${data.phone}` : ''}
${data.company ? `公司：${data.company}` : ''}

留言内容：
${data.message}

---
此邮件由网站联系表单自动发送
`;

export const sendContactEmail = async (
  data: ContactFormData,
  metadata?: { ipAddress?: string; userAgent?: string }
): Promise<{ success: boolean; emailLogId?: string }> => {
  try {
    console.log('📧 Sending contact email via Resend...', {
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM,
    });

    // 1. 发送邮件
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: process.env.EMAIL_TO || 'contact@yourdomain.com',
      subject: `新的联系表单提交 - ${data.name}`,
      html: createContactEmailHtml(data),
      text: createContactEmailText(data),
      // 可选：添加回复地址
      replyTo: data.email,
    });

    console.log('Resend API result:', result);

    // 2. 记录邮件日志到数据库
    const emailLog = await prisma.emailLog.create({
      data: {
        to: process.env.EMAIL_TO || 'contact@yourdomain.com',
        subject: `新的联系表单提交 - ${data.name}`,
        templateName: 'contact_form',
        status: result.data?.id ? 'sent' : 'failed',
        provider: 'resend',
        providerId: result.data?.id || null,
        errorMessage: result.error?.message || null,
        sentAt: result.data?.id ? new Date() : null,
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

    // 记录失败到数据库
    try {
      await prisma.emailLog.create({
        data: {
          to: process.env.EMAIL_TO || 'contact@yourdomain.com',
          subject: `新的联系表单提交 - ${data.name}`,
          templateName: 'contact_form',
          status: 'failed',
          provider: 'resend',
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    } catch (dbError) {
      console.error('Failed to log email error to database:', dbError);
    }

    return { success: false };
  }
};
