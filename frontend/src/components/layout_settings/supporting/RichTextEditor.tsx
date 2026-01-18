import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import { Extension } from "@tiptap/core";
import { useAppSelector } from "../../../app/hooks";
import { AiOutlineFontSize } from "react-icons/ai";

/* Font size extension */
const FontSize = Extension.create({
  name: "fontSize",
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
});

/* Font family extension */
const FontFamily = Extension.create({
  name: "fontFamily",
  addGlobalAttributes() {
    console.log("FontFamily extension loaded");
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: (element) => element.style.fontFamily,
            renderHTML: (attributes) => {
              if (!attributes.fontFamily) return {};
              return { style: `font-family: ${attributes.fontFamily}` };
            },
          },
        },
      },
    ];
  },
});

/* Line height extension */
const LineHeight = Extension.create({
  name: "lineHeight",
  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight,
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) return {};
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },
});

interface RichTextEditorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFontFamilyChange?: (fontFamily: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label,
  value,
  onChange,
  onFontFamilyChange,
}) => {
  const { colors, fonts } = useAppSelector((state) => state.layoutSettings);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3] }),
      TextStyle,
      FontSize,
      FontFamily,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  /* Keep editor in sync when value changes externally */
  useEffect(() => {
    if (!editor) return;
    const currentHTML = editor.getHTML();
    if (value !== currentHTML) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-shadow">{label}</label>

      <div className="border rounded-md overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-[.5vh] p-2 bg-gray-200 border-b text-[1.8vh] overflow-x-auto">
          {/* Text formatting */}
          <div className="flex items-center gap-[.5vh]">
            <Btn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
              <span className="font-bold">B</span>
            </Btn>
            <Btn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
              <span className="italic">I</span>
            </Btn>
            <Btn active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
              <span className="line-through">S</span>
            </Btn>
          </div>

          <Divider />

          {/* Font family dropdown */}
          <div className="flex items-center gap-[.5vh]">
            <select
              className="border rounded px-[.6vh] py-1 text-[1.8vh] min-w-[100px] bg-white"
              onChange={(e) => {
                const fontFamily = e.target.value;
                editor.chain().focus().setMark("textStyle", { fontFamily }).run();
                if (onFontFamilyChange) {
                  onFontFamilyChange(fontFamily);
                }
              }}
              title="Font Family"
            >
              <option value="">Fonts <AiOutlineFontSize/></option>
              {fonts?.primary && <option style={{fontFamily: fonts.primary}} value="primary">Primary</option>}
              {fonts?.secondary && <option style={{fontFamily: fonts.secondary}} value={fonts.secondary}>Secondary</option>}
              {fonts?.tertiary && <option style={{fontFamily: fonts.tertiary}} value={fonts.tertiary}>Tertiary</option>}
            </select>

            {/* Font size dropdown */}
            <select
              className="border rounded px-2 py-1 text-[1.8vh] w-16 bg-white"
              onChange={(e) => {
                const fontSize = e.target.value;
                if (fontSize) {
                  editor.chain().focus().setMark("textStyle", { fontSize }).run();
                }
              }}
              title="Font Size Presets"
            >
              <option value="">Size</option>
              <option value="8px">8px</option>
              <option value="1vh">10px</option>
              <option value="2vh">12px</option>
              <option value="2.3vh">14px</option>
              <option value="2.7vh">16px</option>
              <option value="3.5vh">18px</option>
              <option value="5vh">20px</option>
              <option value="7vh">24px</option>
              <option value="8vh">28px</option>
              <option value="9vh">32px</option>
            </select>

            {/* Font size input */}
            <input
              type="number"
              min="0.3"
              max="72"
              step=".3"
              placeholder="px"
              className="border rounded px-2 py-1 text-[1.8vh] w-12 text-center bg-white"
              onChange={(e) => {
                const fontSize = e.target.value;
                if (fontSize && parseInt(fontSize) >= 8 && parseInt(fontSize) <= 72) {
                  editor.chain().focus().setMark("textStyle", { fontSize: `${fontSize}vh` }).run();
                }
              }}
              title="Custom Font Size"
            />
            {/* Line height dropdown */}
            <select
              className="border rounded px-2 py-1 text-[1.8vh] w-16 bg-white"
              onChange={(e) => {
                const lineHeight = e.target.value;
                const currentNode = editor.state.selection.$head.parent;
                const nodeType = currentNode.type.name;
                if (nodeType === "paragraph" || nodeType === "heading") {
                  editor.chain().focus().updateAttributes(nodeType, { lineHeight: lineHeight || null }).run();
                }
              }}
              title="Line Height"
            >
              <option value="">LH</option>
              <option value="1">1</option>
              <option value="1.2">1.2</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
            </select>
          </div>

          <Divider />

          {/* Colors */}
          <div className="flex items-center gap-[.5vh]">
            <button 
              onClick={() => editor.chain().focus().setColor(colors?.primary || "#000000").run()} 
              title="Primary Color"
              className="h-[3vh] w-[3vh] p-0 flex items-center justify-center"
            >
              <div className="w-full h-full bg-black border border-gray-300" style={{ backgroundColor: colors?.primary || "#000000" }}></div>
            </button>
            <button 
              onClick={() => editor.chain().focus().setColor(colors?.secondary || "#ef4444").run()} 
              title="Secondary Color"
              className="h-[3vh] w-[3vh] p-0 flex items-center justify-center"
            >
              <div className="w-full h-full border border-gray-300" style={{ backgroundColor: colors?.secondary || "#ef4444" }}></div>
            </button>
            <button 
              onClick={() => editor.chain().focus().setColor(colors?.accent || "#2563eb").run()} 
              title="Accent Color"
              className="h-[3vh] w-[3vh] p-0 flex items-center justify-center"
            >
              <div className="w-full h-full border border-gray-300" style={{ backgroundColor: colors?.accent || "#2563eb" }}></div>
            </button>
          </div>

          <Divider />

          {/* Lists */}
          <div className="flex items-center gap-1">
            <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
              •
            </Btn>
            <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List">
              1.
            </Btn>
          </div>

          <Divider />

          {/* Alignment */}
          <div className="flex items-center gap-1">
            <Btn 
              active={editor.isActive({ textAlign: "left" })} 
              onClick={() => editor.chain().focus().setTextAlign("left").run()} 
              title="Align Left"
            >
              ⬅
            </Btn>
            <Btn 
              active={editor.isActive({ textAlign: "center" })} 
              onClick={() => editor.chain().focus().setTextAlign("center").run()} 
              title="Align Center"
            >
              ⬌
            </Btn>
            <Btn 
              active={editor.isActive({ textAlign: "right" })} 
              onClick={() => editor.chain().focus().setTextAlign("right").run()} 
              title="Align Right"
            >
              ➡
            </Btn>
          </div>

          <Divider />

          {/* History */}
          <div className="flex items-center gap-1">
            <Btn onClick={() => editor.chain().focus().undo().run()} title="Undo">
              ↶
            </Btn>
            <Btn onClick={() => editor.chain().focus().redo().run()} title="Redo">
              ↷
            </Btn>
          </div>
        </div>

        {/* Editor */}
        <EditorContent
          editor={editor}
          className="prose max-w-none p-3 min-h-[200px] focus:outline-none  text-shadow-xs"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

/* UI Helpers */
const Btn = ({
  onClick,
  active,
  children,
  className = "",
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`px-[.6vh] border border-gray-300 rounded text-[1.8vh] ${
      active ? "bg-gray-300 border-gray-400" : "bg-white hover:bg-gray-100"
    } ${className}`}
  >
    {children}
  </button>
);

const Divider = () => <div className="w-px h-4 bg-gray-400 mx-1" />;
