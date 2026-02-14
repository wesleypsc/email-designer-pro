import { useMemo } from "react";
import { EmailData } from "@/types/email";
import { generateHTML } from "@/lib/emailTemplates";

interface EmailPreviewProps {
  data: EmailData;
}

const EmailPreview = ({ data }: EmailPreviewProps) => {
  const html = useMemo(() => generateHTML(data), [data]);

  return (
    <div className="h-full flex flex-col">
      <iframe
        srcDoc={html}
        className="flex-1 w-full border-0 bg-muted/30 rounded-lg"
        title="Email Preview"
        sandbox="allow-same-origin"
      />
    </div>
  );
};

export default EmailPreview;
