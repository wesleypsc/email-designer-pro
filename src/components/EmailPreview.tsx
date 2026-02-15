import { useMemo, useState } from "react";
import { EmailData } from "@/types/email";
import { generateHTML } from "@/lib/emailTemplates";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";

interface EmailPreviewProps {
  data: EmailData;
}

const EmailPreview = ({ data }: EmailPreviewProps) => {
  const html = useMemo(() => generateHTML(data), [data]);
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-center gap-1 pb-3">
        <Button
          variant={view === "desktop" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("desktop")}
          className="gap-1.5"
        >
          <Monitor className="w-3.5 h-3.5" />
          Desktop
        </Button>
        <Button
          variant={view === "mobile" ? "default" : "outline"}
          size="sm"
          onClick={() => setView("mobile")}
          className="gap-1.5"
        >
          <Smartphone className="w-3.5 h-3.5" />
          Mobile
        </Button>
      </div>
      <div className="flex-1 flex justify-center overflow-auto">
        <iframe
          srcDoc={html}
          className={`border-0 bg-muted/30 rounded-lg transition-all duration-300 h-full ${
            view === "mobile" ? "w-[375px] border border-border shadow-lg" : "w-full"
          }`}
          title="Email Preview"
          sandbox="allow-same-origin"
        />
      </div>
    </div>
  );
};

export default EmailPreview;
