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
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";

const { value } = defineProps(["value"]);
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
