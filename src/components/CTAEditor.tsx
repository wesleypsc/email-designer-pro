import { CTAButton } from "@/types/email";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface CTAEditorProps {
  buttons: CTAButton[];
  onChange: (buttons: CTAButton[]) => void;
  primaryColor: string;
}

const CTAEditor = ({ buttons, onChange, primaryColor }: CTAEditorProps) => {
  const addButton = () => {
    onChange([
      ...buttons,
      {
        id: crypto.randomUUID(),
        text: "Saiba Mais",
        url: "https://",
        color: primaryColor,
      },
    ]);
  };

  const updateButton = (id: string, partial: Partial<CTAButton>) => {
    onChange(buttons.map((b) => (b.id === id ? { ...b, ...partial } : b)));
  };

  const removeButton = (id: string) => {
    onChange(buttons.filter((b) => b.id !== id));
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3 animate-fade-in">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground font-display">
          Botões CTA
        </h3>
        <Button variant="outline" size="sm" onClick={addButton} className="gap-1.5">
          <Plus className="w-3.5 h-3.5" />
          Adicionar
        </Button>
      </div>
      {buttons.length === 0 && (
        <p className="text-xs text-muted-foreground py-2">
          Adicione botões de call-to-action ao seu e-mail
        </p>
      )}
      {buttons.map((btn) => (
        <div key={btn.id} className="space-y-2 rounded-md bg-muted/50 p-3 animate-fade-in">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label className="text-xs text-muted-foreground">Texto</Label>
              <Input
                value={btn.text}
                onChange={(e) => updateButton(btn.id, { text: e.target.value })}
                placeholder="Texto do botão"
                className="mt-1 text-sm"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeButton(btn.id)}
              className="text-destructive hover:text-destructive shrink-0 mt-5"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">URL</Label>
            <Input
              value={btn.url}
              onChange={(e) => updateButton(btn.id, { url: e.target.value })}
              placeholder="https://exemplo.com"
              className="mt-1 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-xs text-muted-foreground">Cor</Label>
            <input
              type="color"
              value={btn.color}
              onChange={(e) => updateButton(btn.id, { color: e.target.value })}
              className="w-8 h-8 rounded border border-border cursor-pointer"
            />
            <Input
              value={btn.color}
              onChange={(e) => updateButton(btn.id, { color: e.target.value })}
              className="flex-1 font-mono text-sm"
              maxLength={7}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CTAEditor;
