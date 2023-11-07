<template>
  <UIEditorActions :editor="editor" />

  <editor-content
    :editor="editor"
    :class="' border rounded-lg shadow-sm bg-white disabled:bg-slate-100 hover:shadow-lg headings'"
  />
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Mention from "@tiptap/extension-mention";
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";

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
    Mention.configure({
      HTMLAttributes: {
        class: "mention",
      },
      renderLabel({ options, node }) {
        return `<span class='bg-sky-200 text-sky-600 px-1 py-0.5 rounded-md'>${
          options.suggestion.char
        }${node.attrs.label ?? node.attrs.id}</span>`;
      },
      suggestions,
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
</style>
