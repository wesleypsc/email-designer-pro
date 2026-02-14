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

export function generateCorporateHTML(data: EmailData): string {
  const body = replaceCustomFields(data.body, data);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.title}</title></head>
<body style="margin:0;padding:0;background-color:#f4f5f7;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f7;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:0;">
${isSectionEnabled(data, "header") ? `<tr><td style="background-color:${data.primaryColor};padding:28px 40px;">
<table width="100%"><tr><td style="color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px;">${headerContent(data, "color:#ffffff;font-size:20px;font-weight:bold;letter-spacing:0.5px;")}</td></tr></table>
</td></tr>` : ""}
${isSectionEnabled(data, "title") ? `<tr><td style="padding:36px 40px 12px;border-bottom:2px solid ${data.primaryColor};">
<h1 style="margin:0;font-size:24px;color:${data.primaryColor};font-weight:700;">${data.title}</h1>
</td></tr>` : ""}
${isSectionEnabled(data, "body") ? `<tr><td style="padding:28px 40px;font-size:15px;line-height:1.7;color:#333333;">${body}</td></tr>` : ""}
${isSectionEnabled(data, "footer") ? `<tr><td style="background-color:#f8f9fa;padding:24px 40px;border-top:1px solid #e5e7eb;">
<p style="margin:0;font-size:12px;color:#6b7280;text-align:center;">${data.footerText}</p>
<p style="margin:8px 0 0;font-size:11px;color:#9ca3af;text-align:center;">${data.footerLinks}</p>
</td></tr>` : ""}
</table></td></tr></table></body></html>`;
}

export function generateModernHTML(data: EmailData): string {
  const body = replaceCustomFields(data.body, data);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.title}</title></head>
<body style="margin:0;padding:0;background-color:#eef2ff;font-family:'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef2ff;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
${isSectionEnabled(data, "header") ? `<tr><td style="background:linear-gradient(135deg,${data.primaryColor},${data.primaryColor}cc);padding:32px 40px;">
<table width="100%"><tr><td style="color:#ffffff;font-size:22px;font-weight:700;">${headerContent(data, "color:#ffffff;font-size:22px;font-weight:700;")}</td></tr></table>
</td></tr>` : ""}
${isSectionEnabled(data, "title") ? `<tr><td style="padding:36px 40px 16px;">
<h1 style="margin:0;font-size:26px;color:#1e293b;font-weight:700;">${data.title}</h1>
<div style="width:48px;height:4px;background:linear-gradient(90deg,${data.primaryColor},${data.primaryColor}88);border-radius:2px;margin-top:12px;"></div>
</td></tr>` : ""}
${isSectionEnabled(data, "body") ? `<tr><td style="padding:20px 40px 32px;font-size:15px;line-height:1.8;color:#475569;">${body}</td></tr>` : ""}
${isSectionEnabled(data, "footer") ? `<tr><td style="background-color:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;">
<p style="margin:0;font-size:12px;color:#94a3b8;text-align:center;">${data.footerText}</p>
<p style="margin:8px 0 0;font-size:11px;color:#cbd5e1;text-align:center;">${data.footerLinks}</p>
</td></tr>` : ""}
</table></td></tr></table></body></html>`;
}

export function generateMinimalHTML(data: EmailData): string {
  const body = replaceCustomFields(data.body, data);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.title}</title></head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;padding:48px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0">
${isSectionEnabled(data, "header") ? `<tr><td style="padding:0 0 24px;border-bottom:1px solid #e5e5e5;">
${headerContent(data, "font-size:14px;letter-spacing:3px;text-transform:uppercase;color:" + data.primaryColor + ";font-weight:600;")}
</td></tr>` : ""}
${isSectionEnabled(data, "title") ? `<tr><td style="padding:32px 0 8px;">
<h1 style="margin:0;font-size:28px;color:#111827;font-weight:400;line-height:1.3;">${data.title}</h1>
</td></tr>` : ""}
${isSectionEnabled(data, "body") ? `<tr><td style="padding:20px 0 40px;font-size:16px;line-height:1.9;color:#4b5563;">${body}</td></tr>` : ""}
${isSectionEnabled(data, "footer") ? `<tr><td style="padding:24px 0 0;border-top:1px solid #e5e5e5;">
<p style="margin:0;font-size:12px;color:#9ca3af;">${data.footerText}</p>
<p style="margin:6px 0 0;font-size:11px;color:#d1d5db;">${data.footerLinks}</p>
</td></tr>` : ""}
</table></td></tr></table></body></html>`;
}

export function generateBoldHTML(data: EmailData): string {
  const body = replaceCustomFields(data.body, data);
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${data.title}</title></head>
<body style="margin:0;padding:0;background-color:#111827;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111827;padding:32px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background-color:#1f2937;border-radius:8px;overflow:hidden;">
${isSectionEnabled(data, "header") ? `<tr><td style="background-color:${data.primaryColor};padding:20px 40px;">
${headerContent(data, "color:#ffffff;font-size:14px;font-weight:700;letter-spacing:2px;text-transform:uppercase;")}
</td></tr>` : ""}
${isSectionEnabled(data, "title") ? `<tr><td style="padding:40px 40px 16px;">
<h1 style="margin:0;font-size:32px;color:#ffffff;font-weight:900;line-height:1.2;text-transform:uppercase;">${data.title}</h1>
<div style="width:60px;height:4px;background-color:${data.primaryColor};margin-top:16px;"></div>
</td></tr>` : ""}
${isSectionEnabled(data, "body") ? `<tr><td style="padding:24px 40px 40px;font-size:15px;line-height:1.8;color:#d1d5db;">${body}</td></tr>` : ""}
${isSectionEnabled(data, "footer") ? `<tr><td style="background-color:#111827;padding:24px 40px;">
<p style="margin:0;font-size:12px;color:#6b7280;text-align:center;">${data.footerText}</p>
<p style="margin:8px 0 0;font-size:11px;color:#4b5563;text-align:center;">${data.footerLinks}</p>
</td></tr>` : ""}
</table></td></tr></table></body></html>`;
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
