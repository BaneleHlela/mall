"use client"

import { useRef } from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Button } from "../../../components/tiptap-ui-primitive/button"
import { Spacer } from "../../../components/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "../../../components/tiptap-ui-primitive/toolbar"

// Default content
const defaultContent = "<p>Start typing...</p>"

interface SimpleEditorProps {
  content?: string;
  onUpdate?: (editor: any) => void;
}

export function SimpleEditor({ content = "", onUpdate }: SimpleEditorProps = {}) {
  const toolbarRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit,
    ],
    content: content || defaultContent,
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        onUpdate(editor);
      }
    },
  })

  const MainToolbarContent = () => {
    return (
      <>
        <Spacer />
        
        <ToolbarGroup>
          <Button
            type="button"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor?.isActive('bold') ? 'bg-blue-100' : ''
            }`}
            title="Bold"
          >
            <strong>B</strong>
          </Button>
          <Button
            type="button"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor?.isActive('italic') ? 'bg-blue-100' : ''
            }`}
            title="Italic"
          >
            <em>I</em>
          </Button>
          <Button
            type="button"
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor?.isActive('strike') ? 'bg-blue-100' : ''
            }`}
            title="Strikethrough"
          >
            <s>S</s>
          </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <Button
            type="button"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor?.isActive('bulletList') ? 'bg-blue-100' : ''
            }`}
            title="Bullet List"
          >
            • List
          </Button>
          <Button
            type="button"
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50 ${
              editor?.isActive('orderedList') ? 'bg-blue-100' : ''
            }`}
            title="Numbered List"
          >
            1. List
          </Button>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <Button
            type="button"
            onClick={() => editor?.chain().focus().undo().run()}
            className="px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50"
            title="Undo"
          >
            ↶
          </Button>
          <Button
            type="button"
            onClick={() => editor?.chain().focus().redo().run()}
            className="px-2 py-1 text-sm bg-white border rounded hover:bg-gray-50"
            title="Redo"
          >
            ↷
          </Button>
        </ToolbarGroup>

        <Spacer />
      </>
    )
  }

  if (!editor) {
    return null;
  }

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar ref={toolbarRef}>
          <MainToolbarContent />
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  )
}
