import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TipTapHandlerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TipTapHandler: React.FC<TipTapHandlerProps> = ({ label, value, onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-1 h-fit">
      <label className="text-sm font-medium">{label}</label>
      <div className="border rounded-t overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-2 bg-gray-100 border-b">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor.isActive('bold') ? 'bg-blue-100' : ''
            }`}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor.isActive('italic') ? 'bg-blue-100' : ''
            }`}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor.isActive('strike') ? 'bg-blue-100' : ''
            }`}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor.isActive('bulletList') ? 'bg-blue-100' : ''
            }`}
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor.isActive('orderedList') ? 'bg-blue-100' : ''
            }`}
            title="Numbered List"
          >
            1. List
          </button>
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className="px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50"
            title="Undo"
          >
            ↶
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className="px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50"
            title="Redo"
          >
            ↷
          </button>
        </div>
        {/* Editor */}
        <EditorContent
          editor={editor}
          className="p-2 min-h-[200px] max-h-[400px] overflow-y-auto prose prose-sm max-w-none focus:outline-none"
        />
      </div>
    </div>
  );
};

export default TipTapHandler;