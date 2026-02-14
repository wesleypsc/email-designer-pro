import { TEMPLATES } from "@/types/email";

interface TemplateSelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

const TemplateSelector = ({ selectedId, onSelect }: TemplateSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/50 px-1">
        Modelos
      </h3>
      <div className="space-y-2">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`w-full text-left rounded-lg p-3 transition-all duration-200 ${
              selectedId === template.id
                ? "bg-sidebar-accent ring-1 ring-accent/40"
                : "hover:bg-sidebar-accent/50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{template.preview}</span>
              <div className="min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    selectedId === template.id
                      ? "text-accent"
                      : "text-sidebar-foreground"
                  }`}
                >
                  {template.name}
                </p>
                <p className="text-xs text-sidebar-foreground/50 truncate">
                  {template.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
