'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { useEffect, type ReactNode } from 'react';

interface ToolbarButtonProps {
  type?: 'button' | 'submit' | 'reset';
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

function ToolbarButton({ type = 'button', active, disabled, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      type={type}
      className={active ? 'is-active' : ''}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  minCharacters?: number;
  maxCharacters?: number;
  className?: string;
}

export default function RichTextEditor({
  value = '',
  onChange,
  placeholder = 'Describe your project goals, current challenges, target users, and what success should look like.',
  minCharacters = 100,
  maxCharacters = 2000,
  className = '',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        link: false,
        underline: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        'data-placeholder': placeholder,
      },
    },
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const plainText = editor?.getText() || '';
  const characterCount = plainText.trim().length;
  const hasMinimum = characterCount >= minCharacters;

  function setLink() {
    if (!editor) return;

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter link URL', previousUrl || 'https://');

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }

  if (!editor) {
    return null;
  }

  return (
    <div className={`d2m-editor-shell ${className}`}>
      <div className="d2m-editor-toolbar" aria-label="Project description toolbar">
        <ToolbarButton
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </ToolbarButton>

        <ToolbarButton
          active={editor.isActive('link')}
          onClick={setLink}
        >
          Link
        </ToolbarButton>

        <ToolbarButton
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </ToolbarButton>

        <ToolbarButton
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </ToolbarButton>
      </div>

      <div className="d2m-editor-content">
        <EditorContent editor={editor} />
      </div>

      <div className="d2m-editor-footer">
        <span>Minimum {minCharacters} characters recommended.</span>

        <span className={hasMinimum ? 'is-valid' : 'is-warning'}>
          {characterCount} / {maxCharacters}
        </span>
      </div>
    </div>
  );
}
