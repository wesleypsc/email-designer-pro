import { EmailData } from "@/types/email";

function isSectionEnabled(data: EmailData, sectionId: string): boolean {
  return data.sections.find((s) => s.id === sectionId)?.enabled ?? true;
}

function replaceCustomFields(text: string, data: EmailData): string {
  let result = text;
  data.customFields.forEach((field) => {
    result = result.replace(
      new RegExp(`\\{\\{${field.label}\\}\\}`, "g"),
      field.value || `{{${field.label}}}`
    );
  });
  return result;
}

function headerContent(data: EmailData, textStyle: string): string {
  if (data.headerMode === "image" && data.headerLogo) {
    return `<img src="${data.headerLogo}" alt="${data.headerCompany}" style="max-height:50px;max-width:200px;" />`;
  }
  return `<span style="${textStyle}">${data.headerCompany}</span>`;
}

function ctaButtonsHTML(data: EmailData, borderRadius: string = "6px"): string {
  if (!isSectionEnabled(data, "cta") || !data.ctaButtons?.length) return "";
  const buttons = data.ctaButtons
    .map(
      (btn) =>
        `<a href="${btn.url}" style="display:inline-block;padding:12px 28px;background-color:${btn.color};color:#ffffff;text-decoration:none;border-radius:${borderRadius};font-size:15px;font-weight:600;margin:4px;" target="_blank">${btn.text}</a>`
    )
    .join(" ");
  return `<div style="padding:16px 40px 24px;text-align:center;">${buttons}</div>`;
}

const responsiveStyles = `<style>
@media only screen and (max-width: 620px) {
  .email-wrapper { padding: 16px 0 !important; }
  .email-container { width: 100% !important; max-width: 100% !important; border-radius: 0 !important; }
  .email-pad { padding-left: 20px !important; padding-right: 20px !important; }
  .email-title { font-size: 22px !important; }
  .cta-btn { display: block !important; margin: 8px 0 !important; text-align: center !important; }
}
</style>`;

export function generateCorporateHTML(data: EmailData): string {
  const body = replaceCustomFields(data.body, data);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.title}</title>${responsiveStyles}</head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
<div class="email-wrapper" style="padding:32px 0;">
<div class="email-container" style="max-width:600px;margin:0 auto;background-color:#ffffff;">
${isSectionEnabled(data, "header") ? `<div class="email-pad" style="background-color:${data.primaryColor};padding:28px 40px;">
<div style="color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px;">${headerContent(data, "color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px;")}</div>
</div>` : ""}
${isSectionEnabled(data, "title") ? `<div class="email-pad" style="padding:36px 40px 12px;border-bottom:2px solid ${data.primaryColor};">
<h1 class="email-title" style="margin:0;font-size:24px;color:${data.primaryColor};font-weight:700;">${data.title}</h1>
</div>` : ""}
${isSectionEnabled(data, "body") ? `<div class="email-pad" style="padding:28px 40px;font-size:15px;line-height:1.7;color:#333333;">${body}</div>` : ""}
${ctaButtonsHTML(data, "4px")}
${isSectionEnabled(data, "footer") ? `<div class="email-pad" style="background-color:#f8f9fa;padding:24px 40px;border-top:1px solid #e5e7eb;">
<p style="margin:0;font-size:12px;color:#6b7280;text-align:center;">${data.footerText}</p>
<p style="margin:8px 0 0;font-size:11px;color:#9ca3af;text-align:center;">${data.footerLinks}</p>
</div>` : ""}
</div></div></body></html>`;
}

export function generateModernHTML(data: EmailData): string {
  const body = replaceCustomFields(data.body, data);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.title}</title>${responsiveStyles}</head>
<body style="margin:0;padding:0;background-color:#eef2ff;font-family:'Segoe UI',Roboto,sans-serif;">
<div class="email-wrapper" style="padding:32px 0;">
<div class="email-container" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
${isSectionEnabled(data, "header") ? `<div class="email-pad" style="background:linear-gradient(135deg,${data.primaryColor},${data.primaryColor}cc);padding:32px 40px;">
<div style="color:#ffffff;font-size:22px;font-weight:700;">${headerContent(data, "color:#ffffff;font-size:22px;font-weight:700;")}</div>
</div>` : ""}
${isSectionEnabled(data, "title") ? `<div class="email-pad" style="padding:36px 40px 16px;">
<h1 class="email-title" style="margin:0;font-size:26px;color:#1e293b;font-weight:700;">${data.title}</h1>
<div style="width:48px;height:4px;background:linear-gradient(90deg,${data.primaryColor},${data.primaryColor}88);border-radius:2px;margin-top:12px;"></div>
</div>` : ""}
${isSectionEnabled(data, "body") ? `<div class="email-pad" style="padding:20px 40px 32px;font-size:15px;line-height:1.8;color:#475569;">${body}</div>` : ""}
${ctaButtonsHTML(data, "24px")}
${isSectionEnabled(data, "footer") ? `<div class="email-pad" style="background-color:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;">
<p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">${data.footerText}</p>
<p style="margin:8px 0 0;font-size:11px;color:#cbd5e1;text-align:center;">${data.footerLinks}</p>
</div>` : ""}
</div></div></body></html>`;
}

export function generateMinimalHTML(data: EmailData): string {
  const body = replaceCustomFields(data.body, data);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.title}</title>${responsiveStyles}</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:Georgia,'Times New Roman',serif;">
<div class="email-wrapper" style="padding:48px 0;">
<div class="email-container" style="max-width:560px;margin:0 auto;">
${isSectionEnabled(data, "header") ? `<div style="padding:0 0 24px;border-bottom:1px solid #e5e5e5;">
${headerContent(data, "font-size:14px;letter-spacing:3px;text-transform:uppercase;color:" + data.primaryColor + ";font-weight:600;")}
</div>` : ""}
${isSectionEnabled(data, "title") ? `<div style="padding:32px 0 8px;">
<h1 class="email-title" style="margin:0;font-size:28px;color:#111827;font-weight:400;line-height:1.3;">${data.title}</h1>
</div>` : ""}
${isSectionEnabled(data, "body") ? `<div style="padding:20px 0 40px;font-size:16px;line-height:1.9;color:#4b5563;">${body}</div>` : ""}
${ctaButtonsHTML(data, "0")}
${isSectionEnabled(data, "footer") ? `<div style="padding:24px 0 0;border-top:1px solid #e5e5e5;">
<p style="margin:0;font-size:12px;color:#9ca3af;">${data.footerText}</p>
<p style="margin:6px 0 0;font-size:11px;color:#d1d5db;">${data.footerLinks}</p>
</div>` : ""}
</div></div></body></html>`;
}

export function generateBoldHTML(data: EmailData): string {
  const body = replaceCustomFields(data.body, data);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.title}</title>${responsiveStyles}</head>
<body style="margin:0;padding:0;background-color:#111827;font-family:Arial,Helvetica,sans-serif;">
<div class="email-wrapper" style="padding:32px 0;">
<div class="email-container" style="max-width:600px;margin:0 auto;background-color:#1f2937;border-radius:8px;overflow:hidden;">
${isSectionEnabled(data, "header") ? `<div class="email-pad" style="background-color:${data.primaryColor};padding:20px 40px;">
${headerContent(data, "color:#ffffff;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;")}
</div>` : ""}
${isSectionEnabled(data, "title") ? `<div class="email-pad" style="padding:40px 40px 16px;">
<h1 class="email-title" style="margin:0;font-size:32px;color:#ffffff;font-weight:900;line-height:1.2;text-transform:uppercase;">${data.title}</h1>
<div style="width:60px;height:4px;background-color:${data.primaryColor};margin-top:16px;"></div>
</div>` : ""}
${isSectionEnabled(data, "body") ? `<div class="email-pad" style="padding:24px 40px 40px;font-size:15px;line-height:1.8;color:#d1d5db;">${body}</div>` : ""}
${ctaButtonsHTML(data, "4px")}
${isSectionEnabled(data, "footer") ? `<div class="email-pad" style="background-color:#111827;padding:24px 40px;">
<p style="margin:0;font-size:12px;color:#6b7280;text-align:center;">${data.footerText}</p>
<p style="margin:8px 0 0;font-size:11px;color:#4b5563;text-align:center;">${data.footerLinks}</p>
</div>` : ""}
</div></div></body></html>`;
}

export function generateHTML(data: EmailData): string {
  switch (data.templateId) {
    case "corporate": return generateCorporateHTML(data);
    case "modern": return generateModernHTML(data);
    case "minimal": return generateMinimalHTML(data);
    case "bold": return generateBoldHTML(data);
    default: return generateCorporateHTML(data);
  }
}
