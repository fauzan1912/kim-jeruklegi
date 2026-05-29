"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Quote,
} from "lucide-react"

interface EditorProps {
  content: string
  onChange: (richText: string) => void
}

export default function Editor({ content, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-orange max-w-none focus:outline-none min-h-[300px] border border-t-0 border-gray-200 rounded-b-xl p-4 bg-white",
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-col w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded-t-xl">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("bold") ? "bg-orange-100 text-orange-600 font-bold" : "text-gray-600"
          }`}
          title="Tebal"
        >
          <Bold className="w-4.5 h-4.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("italic") ? "bg-orange-100 text-orange-600" : "text-gray-600"
          }`}
          title="Miring"
        >
          <Italic className="w-4.5 h-4.5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("heading", { level: 2 }) ? "bg-orange-100 text-orange-600 font-bold" : "text-gray-600"
          }`}
          title="Judul 2"
        >
          <Heading2 className="w-4.5 h-4.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("heading", { level: 3 }) ? "bg-orange-100 text-orange-600 font-bold" : "text-gray-600"
          }`}
          title="Judul 3"
        >
          <Heading3 className="w-4.5 h-4.5" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("bulletList") ? "bg-orange-100 text-orange-600" : "text-gray-600"
          }`}
          title="Daftar Simbol"
        >
          <List className="w-4.5 h-4.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("orderedList") ? "bg-orange-100 text-orange-600" : "text-gray-600"
          }`}
          title="Daftar Angka"
        >
          <ListOrdered className="w-4.5 h-4.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive("blockquote") ? "bg-orange-100 text-orange-600" : "text-gray-600"
          }`}
          title="Kutipan"
        >
          <Quote className="w-4.5 h-4.5" />
        </button>
        <div className="w-px h-6 bg-gray-300 flex-grow sm:flex-grow-0" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-50 transition-colors"
          title="Kembali (Undo)"
        >
          <Undo className="w-4.5 h-4.5" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-200 text-gray-600 disabled:opacity-50 transition-colors"
          title="Maju (Redo)"
        >
          <Redo className="w-4.5 h-4.5" />
        </button>
      </div>
      
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}
