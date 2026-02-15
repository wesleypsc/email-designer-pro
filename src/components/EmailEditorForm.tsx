import { EmailData, CustomField, ELEMENTOR_FIELDS } from "@/types/email";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Image, Type } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import CTAEditor from "@/components/CTAEditor";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface EmailEditorFormProps {
  data: EmailData;
  onChange: (data: EmailData) => void;
}

const EmailEditorForm = ({ data, onChange }: EmailEditorFormProps) => {
  const update = (partial: Partial<EmailData>) =>
    onChange({ ...data, ...partial });

  const toggleSection = (sectionId: string) => {
    update({
      sections: data.sections.map((s) =>
        s.id === sectionId ? { ...s, enabled: !s.enabled } : s
      ),
    });
  };

  const addCustomField = () => {
    const id = crypto.randomUUID();
    update({
      customFields: [
        ...data.customFields,
        { id, label: `campo_${data.customFields.length + 1}`, value: "" },
      ],
    });
  };

  const updateCustomField = (id: string, partial: Partial<CustomField>) => {
    update({
      customFields: data.customFields.map((f) =>
        f.id === id ? { ...f, ...partial } : f
      ),
    });
  };

  const removeCustomField = (id: string) => {
    update({
      customFields: data.customFields.filter((f) => f.id !== id),
    });
  };

  const isSectionEnabled = (id: string) =>
    data.sections.find((s) => s.id === id)?.enabled ?? true;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Sections Toggle */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3 font-display">
          Seções do E-mail
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {data.sections.map((section) => (
            <div
              key={section.id}
              className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
            >
              <Label
                htmlFor={`section-${section.id}`}
                className="text-sm cursor-pointer"
              >
                {section.label}
              </Label>
              <Switch
                id={`section-${section.id}`}
                checked={section.enabled}
                onCheckedChange={() => toggleSection(section.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Color */}
      <div className="rounded-lg border border-border bg-card p-4">
        <Label className="text-sm font-semibold text-foreground font-display">
          Cor Principal
        </Label>
        <div className="flex items-center gap-3 mt-2">
          <input
            type="color"
            value={data.primaryColor}
            onChange={(e) => update({ primaryColor: e.target.value })}
            className="w-10 h-10 rounded-md border border-border cursor-pointer"
          />
          <Input
            value={data.primaryColor}
            onChange={(e) => update({ primaryColor: e.target.value })}
            className="flex-1 font-mono text-sm"
            maxLength={7}
          />
        </div>
      </div>

      {/* Header */}
      {isSectionEnabled("header") && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground font-display">
            Cabeçalho
          </h3>
          <Tabs
            value={data.headerMode}
            onValueChange={(v) =>
              update({ headerMode: v as "text" | "image" })
            }
          >
            <TabsList className="w-full">
              <TabsTrigger value="text" className="flex-1 gap-1.5">
                <Type className="w-3.5 h-3.5" />
                Texto
              </TabsTrigger>
              <TabsTrigger value="image" className="flex-1 gap-1.5">
                <Image className="w-3.5 h-3.5" />
                Imagem
              </TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-3">
              <Label className="text-xs text-muted-foreground">
                Nome da Empresa
              </Label>
              <Input
                value={data.headerCompany}
                onChange={(e) => update({ headerCompany: e.target.value })}
                placeholder="Sua Empresa"
                className="mt-1"
              />
            </TabsContent>
            <TabsContent value="image" className="mt-3 space-y-2">
              <Label className="text-xs text-muted-foreground">
                URL da Imagem (Logo)
              </Label>
              <Input
                value={data.headerLogo}
                onChange={(e) => update({ headerLogo: e.target.value })}
                placeholder="https://exemplo.com/logo.png"
                className="mt-1"
              />
              {data.headerLogo && (
                <div className="p-3 bg-muted/50 rounded-md flex items-center justify-center">
                  <img
                    src={data.headerLogo}
                    alt="Preview do logo"
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Use serviços como{" "}
                <a
                  href="https://imgbb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  ImgBB
                </a>
                ,{" "}
                <a
                  href="https://imgur.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  Imgur
                </a>{" "}
                ou{" "}
                <a
                  href="https://postimages.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline"
                >
                  PostImages
                </a>{" "}
                para hospedar sua imagem gratuitamente.
              </p>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Title */}
      {isSectionEnabled("title") && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground font-display">
            Título
          </h3>
          <Input
            value={data.title}
            onChange={(e) => update({ title: e.target.value })}
            placeholder="Título do E-mail"
          />
        </div>
      )}

      {/* Body - Rich Text */}
      {isSectionEnabled("body") && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground font-display">
            Corpo do E-mail
          </h3>
          <RichTextEditor
            value={data.body}
            onChange={(html) => update({ body: html })}
            placeholder="Conteúdo do e-mail..."
            minHeight="180px"
            showElementorFields
            customFields={data.customFields}
          />
          <p className="text-xs text-muted-foreground">
            Campos personalizados: {`{{nome_do_campo}}`} · Campos Elementor via botão "Campos"
          </p>
        </div>
      )}

      {/* Custom Fields */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground font-display">
            Campos Personalizados
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={addCustomField}
            className="gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            Adicionar
          </Button>
        </div>
        {data.customFields.length === 0 && (
          <p className="text-xs text-muted-foreground py-2">
            Adicione campos para usar no corpo do e-mail com {`{{nome}}`}
          </p>
        )}
        {data.customFields.map((field) => (
          <div
            key={field.id}
            className="flex items-start gap-2 animate-fade-in"
          >
            <div className="flex-1 space-y-1">
              <Input
                value={field.label}
                onChange={(e) =>
                  updateCustomField(field.id, { label: e.target.value })
                }
                placeholder="Nome do campo"
                className="text-sm"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Input
                value={field.value}
                onChange={(e) =>
                  updateCustomField(field.id, { value: e.target.value })
                }
                placeholder="Valor"
                className="text-sm"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeCustomField(field.id)}
              className="text-destructive hover:text-destructive shrink-0 mt-0.5"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      {isSectionEnabled("cta") && (
        <CTAEditor
          buttons={data.ctaButtons}
          onChange={(ctaButtons) => update({ ctaButtons })}
          primaryColor={data.primaryColor}
        />
      )}

      {/* Footer - Rich Text */}
      {isSectionEnabled("footer") && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-3 animate-fade-in">
          <h3 className="text-sm font-semibold text-foreground font-display">
            Rodapé
          </h3>
          <RichTextEditor
            value={data.footerText}
            onChange={(html) => update({ footerText: html })}
            placeholder="Texto do rodapé..."
            minHeight="80px"
            showElementorFields={false}
          />
          <div>
            <Label className="text-xs text-muted-foreground">Links</Label>
            <Input
              value={data.footerLinks}
              onChange={(e) => update({ footerLinks: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailEditorForm;
