# ✉️ Email Builder

Gerador de HTML para e-mails institucionais com editor visual WYSIWYG, múltiplos templates e suporte a campos dinâmicos.

## 🚀 Funcionalidades

### Templates
- **Corporativo** — Estilo formal com cores sóbrias e layout limpo
- **Moderno** — Design contemporâneo com gradientes e bordas arredondadas
- **Minimalista** — Layout clean com foco no conteúdo textual
- **Comunicado** — Visual impactante para anúncios e comunicados

### Editor
- Editor Rich Text (WYSIWYG) via **Tiptap** para corpo e rodapé
- Formatação: negrito, itálico, sublinhado, alinhamento, listas, links, cores
- Cabeçalho flexível: texto (nome da empresa) ou imagem (URL de logo)
- Seções ativáveis/desativáveis: Cabeçalho, Título, Corpo e Rodapé
- Cor principal configurável por template

### Campos Dinâmicos
- **Campos personalizados**: crie variáveis e insira no corpo usando `{{nome_do_campo}}`
- **Campos Elementor**: shortcodes compatíveis com o Elementor Forms:
  - `[field id="name"]`, `[field id="email"]`, `[field id="message"]`
  - `[field id="phone"]`, `[field id="company"]`, `[field id="date"]`
  - `[field id="url"]`, `[field id="address"]`

### Exportação / Importação
- **Exportar JSON** — Salva toda a configuração do template para reutilização
- **Exportar HTML** — Gera o HTML final pronto para uso em clientes de e-mail
- **Importar JSON** — Carrega um template previamente salvo

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 | Interface de usuário |
| TypeScript | Tipagem estática |
| Vite | Build e dev server |
| Tailwind CSS | Estilização |
| shadcn/ui | Componentes de UI |
| Tiptap | Editor Rich Text |
| Sonner | Notificações toast |

## 📦 Instalação

```sh
# Clone o repositório
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 📁 Estrutura Principal

```
src/
├── components/
│   ├── EmailEditorForm.tsx    # Formulário de edição do e-mail
│   ├── EmailPreview.tsx       # Preview em iframe
│   ├── RichTextEditor.tsx     # Editor WYSIWYG (Tiptap)
│   ├── TemplateSelector.tsx   # Seletor de templates
│   └── SaveLoadTemplates.tsx  # Exportar/importar templates
├── lib/
│   └── emailTemplates.ts      # Geração de HTML dos 4 templates
├── types/
│   └── email.ts               # Tipos, constantes e campos Elementor
└── pages/
    └── Index.tsx               # Página principal
```

## 🎯 Uso com Elementor

Este editor gera HTML compatível com as configurações de envio de e-mail do Elementor Forms. Para usar:

1. Compose seu e-mail no editor
2. Insira campos do Elementor via o botão **"Campos"** na barra de ferramentas
3. Exporte o HTML e cole nas configurações de e-mail do Elementor

## 📄 Licença

MIT
