<template>
  <UIEditorActions :editor="editor" />

  <editor-content
    :editor="editor"
    :class="' border rounded-lg shadow-sm bg-white disabled:bg-slate-100 hover:shadow-lg'"
  />
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";

const { value } = defineProps(["value"]);
const emits = defineEmits(["valueChange"]);

const editor = useEditor({
  content: value,
  extensions: [
    StarterKit,
    Emoji.configure({
      emojis: gitHubEmojis,
      enableEmoticons: true,
    }),
  ],
  onUpdate: () => {
    emits("valueChange", editor.getHTML());
  },
});
</script>

<style>
.tiptap {
  @apply py-3 px-5;
}
</style>
