import { Resend } from "resend";
import { ContactFormData } from "../../shared/types/contact.js";
import { prisma } from "../db/client.js";

// ── Attachment payload (populated by multer, passed from controller) ──────────
export interface AttachmentPayload {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

// ── Lazy Resend client (initialised once on first send) ───────────────────────
let resend: Resend | null = null;

const getResendClient = (): Resend | null => {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
};

// ── Recipient list ────────────────────────────────────────────────────────────
// EMAIL_TO        → general inbox  (e.g. lynn@sureay.com)
// EMAIL_TO_OWNER  → owner's private inbox (e.g. liyucityu@hotmail.com)
const buildRecipients = (): string[] => {
  const list: string[] = [];
  if (process.env.EMAIL_TO) list.push(process.env.EMAIL_TO);
  if (process.env.EMAIL_TO_OWNER) list.push(process.env.EMAIL_TO_OWNER);
  return list.length > 0 ? list : ["lynn@sureay.com"];
};

// ── HTML escape helper ────────────────────────────────────────────────────────
function escHtml(s: string | undefined | null): string {
  if (s == null) return "";
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ── Subject line ──────────────────────────────────────────────────────────────
const buildSubject = (data: ContactFormData): string => {
  const type = data.inquiryType ? ` [${data.inquiryType.toUpperCase()}]` : "";
  const company = data.company ? ` — ${data.company}` : "";
  return `[NEW INQUIRY]${type} from ${data.name}${company}`;
};

// ── HTML template — industrial English ───────────────────────────────────────
const buildHtml = (
  data: ContactFormData,
  attachment?: AttachmentPayload
): string => {
  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Shanghai",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  // Pre-escape all user-controlled values before inserting into HTML
  const safeName = escHtml(data.name);
  const safeEmail = escHtml(data.email);
  const safeCompany = data.company ? escHtml(data.company) : undefined;
  const safePhone = data.phone ? escHtml(data.phone) : undefined;
  const safeInquiryType = data.inquiryType
    ? escHtml(data.inquiryType)
    : undefined;
  const safeMessage = escHtml(data.message).replace(/\n/g, "<br>");
  const safeOrigName = attachment
    ? escHtml(attachment.originalname)
    : undefined;

  const row = (label: string, value: string) => `
    <tr>
      <td style="
        padding:12px 16px;
        border-bottom:1px solid #e2e8f0;
        font-size:11px;
        font-weight:700;
        letter-spacing:0.1em;
        text-transform:uppercase;
        color:#64748b;
        white-space:nowrap;
        width:150px;
        vertical-align:top;
      ">${label}</td>
      <td style="
        padding:12px 16px;
        border-bottom:1px solid #e2e8f0;
        font-size:15px;
        color:#0f172a;
        line-height:1.6;
        word-break:break-word;
      ">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Inquiry — Sureay Machinery</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;">

  <!-- HEADER -->
  <tr>
    <td style="background:#001f4d;padding:28px 32px 0;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#e8b84b;">
        SUREAY MACHINERY · INQUIRY PORTAL
      </p>
      <h1 style="margin:0 0 18px;font-size:22px;font-weight:900;letter-spacing:0.04em;text-transform:uppercase;color:#ffffff;">
        New Customer Inquiry
      </h1>
    </td>
  </tr>

  <!-- GOLD RULE -->
  <tr>
    <td style="background:#001f4d;padding:0 32px;">
      <div style="height:3px;background:#e8b84b;"></div>
    </td>
  </tr>

  <!-- TYPE + TIMESTAMP -->
  <tr>
    <td style="background:#001f4d;padding:14px 32px 24px;">
      <table cellpadding="0" cellspacing="0" width="100%"><tr>
        <td>
          ${safeInquiryType ? `<span style="display:inline-block;background:#e8b84b;color:#001f4d;font-size:10px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;padding:4px 12px;">${safeInquiryType}</span>` : "&nbsp;"}
        </td>
        <td align="right">
          <span style="font-size:11px;color:#94a3b8;font-family:'Courier New',monospace;">${timestamp}</span>
        </td>
      </tr></table>
    </td>
  </tr>

  <!-- CONTACT DETAILS -->
  <tr>
    <td>
      <table width="100%" cellpadding="0" cellspacing="0">
        ${row("Name", `<strong>${safeName}</strong>`)}
        ${row("Email", `<a href="mailto:${safeEmail}" style="color:#001f4d;font-weight:700;text-decoration:none;">${safeEmail}</a>`)}
        ${safeCompany ? row("Company", safeCompany) : ""}
        ${safePhone ? row("Phone", `<a href="tel:${safePhone}" style="color:#001f4d;text-decoration:none;">${safePhone}</a>`) : ""}
      </table>
    </td>
  </tr>

  <!-- MESSAGE -->
  <tr>
    <td style="padding:0 32px 28px;">
      <p style="margin:24px 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#64748b;">
        Project Details
      </p>
      <div style="background:#f8fafc;border-left:4px solid #001f4d;padding:16px 20px;font-size:14px;color:#1e293b;line-height:1.7;white-space:pre-wrap;word-break:break-word;">
${safeMessage}
      </div>
    </td>
  </tr>

  <!-- ATTACHMENT (conditional) -->
  ${
    attachment
      ? `
  <tr>
    <td style="padding:0 32px 28px;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#64748b;">
        CAD / Technical File
      </p>
      <table cellpadding="0" cellspacing="0" style="background:#eff6ff;border:1px solid #bfdbfe;padding:14px 18px;width:100%;"><tr>
        <td style="font-size:22px;line-height:1;width:36px;">📎</td>
        <td style="padding-left:12px;">
          <div style="font-size:13px;font-weight:700;color:#001f4d;font-family:'Courier New',monospace;">${safeOrigName}</div>
          <div style="font-size:11px;color:#64748b;margin-top:3px;">${(attachment.size / 1024).toFixed(1)} KB &nbsp;·&nbsp; ${attachment.mimetype} &nbsp;·&nbsp; <em>Attached to this email</em></div>
        </td>
      </tr></table>
    </td>
  </tr>`
      : ""
  }

  <!-- CTA -->
  <tr>
    <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 32px;">
      <table cellpadding="0" cellspacing="0" width="100%"><tr>
        <td>
          <a href="mailto:${safeEmail}?subject=Re%3A%20Your%20Inquiry%20to%20Sureay%20Machinery"
             style="display:inline-block;background:#001f4d;color:#ffffff;font-size:11px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;text-decoration:none;padding:12px 24px;">
            REPLY TO CUSTOMER ↗
          </a>
        </td>
        <td align="right" style="font-size:11px;color:#94a3b8;">
          Submitted via sureay.com
        </td>
      </tr></table>
    </td>
  </tr>

</table>
</td></tr>
</table>

</body>
</html>`;
};

// ── Plain-text fallback ───────────────────────────────────────────────────────
const buildText = (
  data: ContactFormData,
  attachment?: AttachmentPayload
): string =>
  `NEW INQUIRY — Sureay Machinery
${"─".repeat(44)}
${data.inquiryType ? `Type    : ${data.inquiryType}\n` : ""}Name    : ${data.name}
Email   : ${data.email}
${data.company ? `Company : ${data.company}\n` : ""}${data.phone ? `Phone   : ${data.phone}\n` : ""}
Project Details:
${data.message}
${attachment ? `\nAttachment : ${attachment.originalname} (${(attachment.size / 1024).toFixed(1)} KB)` : ""}
${"─".repeat(44)}
Submitted via sureay.com
`;

// ── Main export ───────────────────────────────────────────────────────────────
export const sendContactEmail = async (
  data: ContactFormData,
  _metadata?: { ipAddress?: string; userAgent?: string },
  attachment?: AttachmentPayload
): Promise<{ success: boolean; emailLogId?: string }> => {
  const client = getResendClient();
  const to = buildRecipients();
  const subject = buildSubject(data);

  // ── No API key: log to DB and skip ──────────────────────────────────────
  if (!client) {
    console.warn("⚠️  RESEND_API_KEY not configured — email skipped");
    try {
      const emailLog = await prisma.emailLog.create({
        data: {
          to: to.join(", "),
          subject,
          templateName: "inquiry_v2",
          status: "skipped",
          provider: "resend",
          errorMessage: "RESEND_API_KEY not configured",
        },
      });
      return { success: false, emailLogId: emailLog.id };
    } catch {
      return { success: false };
    }
  }

  // ── Send via Resend ──────────────────────────────────────────────────────
  try {
    console.log("📧 Sending inquiry email via Resend…", {
      from: process.env.EMAIL_FROM || "inquiry@sureay.com",
      to,
      subject,
      attachment: attachment?.originalname ?? "none",
    });

    const result = await client.emails.send({
      from:
        process.env.EMAIL_FROM || "Sureay Inquiry Portal <inquiry@sureay.com>",
      to,
      replyTo: data.email,
      subject,
      html: buildHtml(data, attachment),
      text: buildText(data, attachment),
      ...(attachment && {
        attachments: [
          {
            filename: attachment.originalname,
            content: attachment.buffer,
          },
        ],
      }),
    });

    const status = result.data?.id ? "sent" : "failed";
    const providerId = result.data?.id ?? null;
    const errorMsg = result.error?.message ?? null;

    console.log(
      status === "sent"
        ? `✅ Inquiry email sent — Resend ID: ${providerId}`
        : `❌ Resend error: ${errorMsg}`
    );

    const emailLog = await prisma.emailLog.create({
      data: {
        to: to.join(", "),
        subject,
        templateName: "inquiry_v2",
        status,
        provider: "resend",
        providerId,
        errorMessage: errorMsg,
        sentAt: status === "sent" ? new Date() : null,
      },
    });

    return { success: status === "sent", emailLogId: emailLog.id };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error";
    console.error("❌ Email send exception:", msg);

    try {
      await prisma.emailLog.create({
        data: {
          to: to.join(", "),
          subject,
          templateName: "inquiry_v2",
          status: "failed",
          provider: "resend",
          errorMessage: msg,
        },
      });
    } catch {
      /* DB log failure is non-fatal */
    }

    return { success: false };
  }
};
