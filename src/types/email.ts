export interface EmailSection {
  id: string;
  label: string;
  enabled: boolean;
}

export interface CustomField {
  id: string;
  label: string;
  value: string;
}

export interface EmailData {
  templateId: string;
  headerLogo: string;
  headerCompany: string;
  title: string;
  body: string;
  footerText: string;
  footerLinks: string;
  sections: EmailSection[];
  customFields: CustomField[];
  primaryColor: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  defaultPrimaryColor: string;
}

export const DEFAULT_SECTIONS: EmailSection[] = [
  { id: "header", label: "Cabeçalho", enabled: true },
  { id: "title", label: "Título", enabled: true },
  { id: "body", label: "Corpo", enabled: true },
  { id: "footer", label: "Rodapé", enabled: true },
];

export const TEMPLATES: EmailTemplate[] = [
  {
    id: "corporate",
    name: "Corporativo",
    description: "Estilo formal com cores sóbrias e layout limpo",
    preview: "🏢",
    defaultPrimaryColor: "#1a365d",
  },
  {
    id: "modern",
    name: "Moderno",
    description: "Design contemporâneo com gradientes e bordas arredondadas",
    preview: "✨",
    defaultPrimaryColor: "#2563eb",
  },
  {
    id: "minimal",
    name: "Minimalista",
    description: "Layout clean com foco no conteúdo textual",
    preview: "📝",
    defaultPrimaryColor: "#374151",
  },
  {
    id: "bold",
    name: "Comunicado",
    description: "Visual impactante para anúncios e comunicados",
    preview: "📢",
    defaultPrimaryColor: "#b91c1c",
  },
];

export const DEFAULT_EMAIL_DATA: EmailData = {
  templateId: "corporate",
  headerLogo: "",
  headerCompany: "Sua Empresa",
  title: "Título do E-mail",
  body: "<p>Olá,</p><p>Este é o corpo do seu e-mail institucional. Edite este texto conforme necessário.</p><p>Atenciosamente,<br/>Equipe</p>",
  footerText: "© 2026 Sua Empresa. Todos os direitos reservados.",
  footerLinks: "Descadastrar | Política de Privacidade",
  sections: [...DEFAULT_SECTIONS],
  customFields: [],
  primaryColor: "#1a365d",
};
