<template>
  <UIEditorActions :editor="editor" />

  <editor-content
    :editor="editor"
    :class="' border rounded-lg shadow-sm bg-white disabled:bg-slate-100 hover:shadow-lg headings bullet'"
  />
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Mention from "@tiptap/extension-mention";
import Link from "@tiptap/extension-link";
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";

const { value, suggestions } = defineProps(["value", "suggestions"]);
const emits = defineEmits(["valueUpdate"]);

const editor = useEditor({
  content: value,
  extensions: [
    StarterKit,
    Underline,
    Emoji.configure({
      emojis: gitHubEmojis,
      enableEmoticons: true,
    }),
    BulletList,
    ListItem,
    Link.configure({
      openOnClick: false,
    }),
    Mention.configure({
      HTMLAttributes: {
        class: "mention",
      },
      renderLabel({ options, node }) {
        return `<span class='bg-sky-200 text-sky-600 px-1 py-0.5 rounded-md'>${
          options.suggestion.char
        }${node.attrs.label ?? node.attrs.id}</span>`;
      },
      suggestion: {
        items: ({ query }) => {
          return suggestions
            .filter((item) =>
              item.toLowerCase().startsWith(query.toLowerCase())
            )
            .slice(0, 5);
        },
      },
    }),
  ],
  onUpdate: () => {
    emits("valueUpdate", editor.value.getHTML());
  },
});
</script>

<style>
.tiptap {
  @apply py-3 px-5 min-h-[10rem] resize-y;
}
.headings h1 {
  @apply text-5xl;
}
.headings h2 {
  @apply text-4xl;
}
.headings h3 {
  @apply text-3xl;
}
.headings h4 {
  @apply text-2xl;
}
.bullet ul {
  @apply list-disc pl-10 my-4;
}
</style>
