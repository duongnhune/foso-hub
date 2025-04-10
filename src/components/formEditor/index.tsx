import React, { useCallback, useState } from "react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import {
  EditorProvider,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import commonApi from "@/api/commonApi";
import env from "@/app/env";
import TextAlign from "@tiptap/extension-text-align";
import { Video } from "@/components/formEditor/extentions/VideoExtention";
import { CustomImage } from "@/components/formEditor/extentions/ImageExtention";
import { MathExtension } from "@aarkue/tiptap-math-extension";
import "katex/dist/katex.min.css";

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) return null;

  const setVideo= React.useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("video", file);

        const response = await commonApi.uploadVideo(formData);

        if (response.ok && response.body) {
          editor?.commands.setVideo(env.baseGatewayUrl + "media" + response.body.filePath);
        } else {
          throw new Error("Upload failed!");
        }
      } catch (error) {
        console.error("Error uploading video:", error);
        alert("Failed to upload video. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };
  }, [editor]);

  const addImage = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      setIsUploading(true);

      try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await commonApi.uploadImage(formData);

        if (response.ok && response.body) {
          editor
            .chain()
            .focus()
            .setImage({
              src: env.baseGatewayUrl + "media" + response.body.filePath,
            })
            .run();
        } else {
          throw new Error("Upload failed!");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };
  }, [editor]);

  const buttons = [
    {
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
      canExecute: editor.can().chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
      canExecute: editor.can().chain().focus().toggleItalic().run(),
    },
    {
      label: "Strike",
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
      canExecute: editor.can().chain().focus().toggleStrike().run(),
    },
    {
      label: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive("code"),
      canExecute: editor.can().chain().focus().toggleCode().run(),
    },
    {
      label: "Clear Marks",
      action: () => editor.chain().focus().unsetAllMarks().run(),
      active: false,
      canExecute: true,
    },
    {
      label: "Clear Nodes",
      action: () => editor.chain().focus().clearNodes().run(),
      active: false,
      canExecute: true,
    },
    {
      label: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      active: editor.isActive("paragraph"),
      canExecute: true,
    },
    {
      label: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
      canExecute: true,
    },
    {
      label: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
      canExecute: true,
    },
    {
      label: "Undo",
      action: () => editor.chain().focus().undo().run(),
      active: false,
      canExecute: editor.can().chain().focus().undo().run(),
    },
    {
      label: "Redo",
      action: () => editor.chain().focus().redo().run(),
      active: false,
      canExecute: editor.can().chain().focus().redo().run(),
    },
  ];

  const headingButtons = [1, 2, 3, 4, 5, 6].map((level) => ({
    label: `H${level}`,
    action: () => editor.chain().focus().toggleHeading({ level }).run(),
    active: editor.isActive("heading", { level }),
    canExecute: true,
  }));

  return (
    <div className="control-group">
      <div className="button-group">
        {buttons.map(({ label, action, active, canExecute }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            disabled={!canExecute}
            className={active ? "is-active" : ""}
          >
            {label}
          </button>
        ))}

        {headingButtons.map(({ label, action, active, canExecute }) => (
          <button
            key={label}
            type="button"
            onClick={action}
            disabled={!canExecute}
            className={active ? "is-active" : ""}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal Rule
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Hard Break
        </button>
        {/* <button
          type="button"
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          className={
            editor.isActive("textStyle", { color: "#958DF1" })
              ? "is-active"
              : ""
          }
        >
          Purple
        </button> */}
        <button onClick={addImage} type="button" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Insert Image"}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          Align Left
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          Align Center
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          Align Right
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          Justify
        </button>
        <button type="button" onClick={setVideo} className={editor.isActive('video') ? 'is-active' : ''}>Video</button>
      </div>
    </div>
  );
};

interface IFormEditor {
  onChange: (data: any) => void;
  data?: any;
}

const FormEditor: React.FunctionComponent<IFormEditor> = ({
  data,
  onChange,
}) => {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle,
    CustomImage,
    Video,
    MathExtension.configure({ evaluation: true }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
    TextAlign.configure({
      types: ["heading", "paragraph", "image"],
      alignments: ["left", "center", "right", "justify"],
    }),
  ];

  const handleUpdate = ({ editor }: any) => {
    onChange(editor.getHTML());
  };

  return (
    <div className="form-editor-wrapper">
      {data && (
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          onUpdate={handleUpdate}
          content={data}
        />
      )}
    </div>
  );
};

export default FormEditor;
