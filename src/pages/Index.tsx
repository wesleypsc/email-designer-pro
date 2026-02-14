import { useState, useMemo, useCallback } from "react";
import { EmailData, DEFAULT_EMAIL_DATA, TEMPLATES } from "@/types/email";
import { generateHTML } from "@/lib/emailTemplates";
import TemplateSelector from "@/components/TemplateSelector";
import EmailEditorForm from "@/components/EmailEditorForm";
import EmailPreview from "@/components/EmailPreview";
import { Button } from "@/components/ui/button";
import { Copy, Check, Code, Eye, PanelLeftClose, PanelLeft } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [data, setData] = useState<EmailData>(DEFAULT_EMAIL_DATA);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const html = useMemo(() => generateHTML(data), [data]);

  const selectTemplate = useCallback(
    (templateId: string) => {
      const template = TEMPLATES.find((t) => t.id === templateId);
      setData((prev) => ({
        ...prev,
        templateId,
        primaryColor: template?.defaultPrimaryColor ?? prev.primaryColor,
      }));
    },
    []
  );

  const copyHTML = useCallback(() => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    toast.success("HTML copiado para a área de transferência!");
    setTimeout(() => setCopied(false), 2000);
  }, [html]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } shrink-0 bg-sidebar border-r border-sidebar-border transition-all duration-300 overflow-hidden`}
      >
        <div className="h-full flex flex-col w-64">
          <div className="p-5 border-b border-sidebar-border">
            <h1 className="text-lg font-display font-bold text-sidebar-foreground">
              ✉️ Email Builder
            </h1>
            <p className="text-xs text-sidebar-foreground/50 mt-1">
              Gerador de HTML para e-mails
            </p>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4">
            <TemplateSelector
              selectedId={data.templateId}
              onSelect={selectTemplate}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-muted-foreground"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeft className="w-4 h-4" />
              )}
            </Button>
            <span className="text-sm font-medium text-foreground font-display">
              {TEMPLATES.find((t) => t.id === data.templateId)?.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={showCode ? "default" : "outline"}
              size="sm"
              onClick={() => setShowCode(!showCode)}
              className="gap-1.5"
            >
              {showCode ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <Code className="w-3.5 h-3.5" />
              )}
              {showCode ? "Preview" : "Código"}
            </Button>
            <Button
              size="sm"
              onClick={copyHTML}
              className="gap-1.5"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copiado!" : "Copiar HTML"}
            </Button>
          </div>
        </header>

        {/* Editor + Preview */}
        <div className="flex-1 flex overflow-hidden">
          {/* Editor Panel */}
          <div className="w-[400px] shrink-0 border-r border-border overflow-y-auto scrollbar-thin p-5">
            <EmailEditorForm data={data} onChange={setData} />
          </div>

          {/* Preview Panel */}
          <div className="flex-1 p-5 overflow-hidden">
            {showCode ? (
              <div className="h-full overflow-auto rounded-lg bg-primary/5 border border-border">
                <pre className="p-4 text-xs font-mono text-foreground/80 whitespace-pre-wrap break-all">
                  {html}
                </pre>
              </div>
            ) : (
              <EmailPreview data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
