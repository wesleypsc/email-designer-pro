import { useState, useMemo, useCallback } from "react";
import { EmailData, DEFAULT_EMAIL_DATA, TEMPLATES } from "@/types/email";
import { generateHTML } from "@/lib/emailTemplates";
import TemplateSelector from "@/components/TemplateSelector";
import EmailEditorForm from "@/components/EmailEditorForm";
import EmailPreview from "@/components/EmailPreview";
import SaveLoadTemplates from "@/components/SaveLoadTemplates";
import { Button } from "@/components/ui/button";
import { Copy, Check, Code, Eye, PanelLeftClose, PanelLeft, Menu, X } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b border-sidebar-border">
        <h1 className="text-lg font-display font-bold text-sidebar-foreground">
          ✉️ Email Builder
        </h1>
        <p className="text-xs text-sidebar-foreground/50 mt-1">
          Gerador de HTML para e-mails
        </p>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
        <TemplateSelector
          selectedId={data.templateId}
          onSelect={selectTemplate}
        />
        <SaveLoadTemplates data={data} onLoad={setData} />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } shrink-0 bg-sidebar border-r border-sidebar-border transition-all duration-300 overflow-hidden hidden md:block`}
      >
        <div className="w-64">
          <SidebarContent />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <header className="flex items-center justify-between border-b border-border bg-card px-3 py-2 md:px-4 md:py-3 gap-2">
          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 bg-sidebar">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            {/* Desktop sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-muted-foreground hidden md:inline-flex"
            >
              {sidebarOpen ? (
                <PanelLeftClose className="w-4 h-4" />
              ) : (
                <PanelLeft className="w-4 h-4" />
              )}
            </Button>
            <span className="text-sm font-medium text-foreground font-display truncate">
              {TEMPLATES.find((t) => t.id === data.templateId)?.name}
            </span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant={showCode ? "default" : "outline"}
              size="sm"
              onClick={() => setShowCode(!showCode)}
              className="gap-1.5 hidden sm:inline-flex"
            >
              {showCode ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
              {showCode ? "Preview" : "Código"}
            </Button>
            <Button size="sm" onClick={copyHTML} className="gap-1.5">
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? "Copiado!" : "Copiar HTML"}</span>
            </Button>
          </div>
        </header>

        {/* Mobile: Tabs layout / Desktop: Side-by-side */}
        <div className="flex-1 overflow-hidden">
          {/* Desktop layout */}
          <div className="hidden md:flex h-full">
            <div className="w-[400px] shrink-0 border-r border-border overflow-y-auto scrollbar-thin p-5">
              <EmailEditorForm data={data} onChange={setData} />
            </div>
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

          {/* Mobile layout */}
          <div className="md:hidden h-full flex flex-col">
            <Tabs defaultValue="editor" className="flex-1 flex flex-col">
              <TabsList className="w-full rounded-none border-b border-border shrink-0">
                <TabsTrigger value="editor" className="flex-1">Editor</TabsTrigger>
                <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
                <TabsTrigger value="code" className="flex-1">Código</TabsTrigger>
              </TabsList>
              <TabsContent value="editor" className="flex-1 overflow-y-auto p-4 mt-0">
                <EmailEditorForm data={data} onChange={setData} />
              </TabsContent>
              <TabsContent value="preview" className="flex-1 overflow-hidden p-4 mt-0">
                <EmailPreview data={data} />
              </TabsContent>
              <TabsContent value="code" className="flex-1 overflow-auto p-4 mt-0">
                <div className="h-full overflow-auto rounded-lg bg-primary/5 border border-border">
                  <pre className="p-4 text-xs font-mono text-foreground/80 whitespace-pre-wrap break-all">
                    {html}
                  </pre>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
