import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { useEffect, useCallback, useRef } from "react";
import { ELEMENTOR_FIELDS } from "@/types/email";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  List,
  ListOrdered,
  Tag,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
  showElementorFields?: boolean;
  customFields?: { id: string; label: string; value: string }[];
}

const ToolbarButton = ({
  active,
  onClick,
  children,
  title,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded transition-colors ${
      active
        ? "bg-primary/15 text-primary"
        : "text-muted-foreground hover:bg-muted hover:text-foreground"
    }`}
  >
    {children}
  </button>
);

const Toolbar = ({
  editor,
  showElementorFields,
  customFields,
}: {
  editor: Editor;
  showElementorFields?: boolean;
  customFields?: { id: string; label: string; value: string }[];
}) => {
  const setLink = useCallback(() => {
    const url = window.prompt("URL do link:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  const setColor = useCallback(() => {
    const color = window.prompt("Cor (hex):", "#000000");
    if (color) {
      editor.chain().focus().setColor(color).run();
    }
  }, [editor]);

  const insertElementorField = useCallback(
    (tag: string) => {
      editor.chain().focus().insertContent(tag).run();
    },
    [editor]
  );

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5 bg-muted/30">
      <ToolbarButton
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title="Negrito"
      >
        <Bold className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title="Itálico"
      >
        <Italic className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        title="Sublinhado"
      >
        <UnderlineIcon className="w-3.5 h-3.5" />
      </ToolbarButton>

      <div className="w-px h-5 bg-border mx-1" />

      <ToolbarButton
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        title="Alinhar à esquerda"
      >
        <AlignLeft className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        title="Centralizar"
      >
        <AlignCenter className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        title="Alinhar à direita"
      >
        <AlignRight className="w-3.5 h-3.5" />
      </ToolbarButton>

      <div className="w-px h-5 bg-border mx-1" />

      <ToolbarButton
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title="Lista"
      >
        <List className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        title="Lista numerada"
      >
        <ListOrdered className="w-3.5 h-3.5" />
      </ToolbarButton>

      <ToolbarButton
        active={editor.isActive("link")}
        onClick={setLink}
        title="Link"
      >
        <LinkIcon className="w-3.5 h-3.5" />
      </ToolbarButton>

      <ToolbarButton onClick={setColor} title="Cor do texto">
        <Palette className="w-3.5 h-3.5" />
      </ToolbarButton>

      {showElementorFields && (
        <>
          <div className="w-px h-5 bg-border mx-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1 px-2"
              >
                <Tag className="w-3 h-3" />
                Campos
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[160px]">
              {ELEMENTOR_FIELDS.map((field) => (
                <DropdownMenuItem
                  key={field.tag}
                  onClick={() => insertElementorField(field.tag)}
                  className="text-xs font-mono"
                >
                  <span className="mr-2">{field.label}</span>
                  <span className="text-muted-foreground ml-auto">
                    {field.tag}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
      {customFields && customFields.length > 0 && (
        <>
          <div className="w-px h-5 bg-border mx-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1 px-2"
              >
                <Tag className="w-3 h-3" />
                Meus Campos
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[160px]">
              {customFields.map((field) => (
                <DropdownMenuItem
                  key={field.id}
                  onClick={() => insertElementorField(`{{${field.label}}}`)}
                  className="text-xs font-mono"
                >
                  <span className="mr-2">{field.label}</span>
                  <span className="text-muted-foreground ml-auto">
                    {`{{${field.label}}}`}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  minHeight = "150px",
  showElementorFields = true,
  customFields,
}: RichTextEditorProps) => {
  const isInternalUpdate = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      isInternalUpdate.current = true;
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && !isInternalUpdate.current && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
    isInternalUpdate.current = false;
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="rounded-md border border-input overflow-hidden bg-background">
      <Toolbar editor={editor} showElementorFields={showElementorFields} customFields={customFields} />
      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none px-3 py-2 text-sm focus-within:outline-none [&_.tiptap]:outline-none [&_.tiptap]:min-h-[var(--min-h)]"
        style={{ "--min-h": minHeight } as React.CSSProperties}
      />
    </div>
  );
};

export default RichTextEditor;
