import { mergeAttributes } from "@tiptap/core";
import { Image } from "@tiptap/extension-image";

export const CustomImage = Image.extend({
  defaultOptions: {
    ...Image.options,
    sizes: ["inline", "block", "left", "right"],
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "tiptap-image",
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    const { style } = HTMLAttributes;
    return [
      "figure",
      { style },
      ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ];
  },
});
