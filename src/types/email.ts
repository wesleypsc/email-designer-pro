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

export interface CTAButton {
  id: string;
  text: string;
  url: string;
  color: string;
}

export interface EmailData {
  templateId: string;
  headerMode: "text" | "image";
  headerLogo: string;
  headerCompany: string;
  title: string;
  body: string;
  footerText: string;
  footerLinks: string;
  sections: EmailSection[];
  customFields: CustomField[];
  primaryColor: string;
  ctaButtons: CTAButton[];
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
  { id: "cta", label: "Botão CTA", enabled: false },
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

export const ELEMENTOR_FIELDS = [
  { tag: "[field id=\"name\"]", label: "Nome" },
  { tag: "[field id=\"email\"]", label: "E-mail" },
  { tag: "[field id=\"message\"]", label: "Mensagem" },
  { tag: "[field id=\"phone\"]", label: "Telefone" },
  { tag: "[field id=\"company\"]", label: "Empresa" },
  { tag: "[field id=\"date\"]", label: "Data" },
  { tag: "[field id=\"url\"]", label: "URL" },
  { tag: "[field id=\"address\"]", label: "Endereço" },
];

export const DEFAULT_EMAIL_DATA: EmailData = {
  templateId: "corporate",
  headerMode: "text",
  headerLogo: "",
  headerCompany: "Sua Empresa",
  title: "Título do E-mail",
  body: "<p>Olá,</p><p>Este é o corpo do seu e-mail institucional. Edite este texto conforme necessário.</p><p>Atenciosamente,<br/>Equipe</p>",
  footerText: "© 2026 Sua Empresa. Todos os direitos reservados.",
  footerLinks: "Descadastrar | Política de Privacidade",
  sections: [...DEFAULT_SECTIONS],
  customFields: [],
  primaryColor: "#1a365d",
  ctaButtons: [],
};
