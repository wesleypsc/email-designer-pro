import { EmailData } from "@/types/email";
import { generateHTML } from "@/lib/emailTemplates";
import { Button } from "@/components/ui/button";
import { Download, Upload, FileCode } from "lucide-react";
import { toast } from "sonner";
import { useRef } from "react";

interface SaveLoadTemplatesProps {
  data: EmailData;
  onLoad: (data: EmailData) => void;
}

const SaveLoadTemplates = ({ data, onLoad }: SaveLoadTemplatesProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveAsJSON = () => {
    downloadFile(JSON.stringify(data, null, 2), "email-template.json", "application/json");
    toast.success("Template JSON exportado!");
  };

  const saveAsHTML = () => {
    downloadFile(generateHTML(data), "email-template.html", "text/html");
    toast.success("HTML exportado!");
  };

  const loadJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string) as EmailData;
        if (!parsed.templateId || !parsed.sections) {
          throw new Error("Invalid template");
        }
        onLoad(parsed);
        toast.success("Template carregado com sucesso!");
      } catch {
        toast.error("Arquivo JSON inválido.");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground font-display">
        Salvar / Carregar
      </h3>
      <div className="flex flex-col gap-2">
        <Button variant="outline" size="sm" onClick={saveAsJSON} className="gap-1.5 justify-start">
          <Download className="w-3.5 h-3.5" />
          Exportar JSON
        </Button>
        <Button variant="outline" size="sm" onClick={saveAsHTML} className="gap-1.5 justify-start">
          <FileCode className="w-3.5 h-3.5" />
          Exportar HTML
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-1.5 justify-start"
        >
          <Upload className="w-3.5 h-3.5" />
          Importar JSON
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={loadJSON}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default SaveLoadTemplates;
