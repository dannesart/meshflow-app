<template>
  <div class="flex gap-2">
    <div :class="buttonStyle">
      <div>😀</div>
      <div
        class="hidden group-hover:flex p-2 bg-white absolute top-full z-50 gap-2 border border-slate-400 rounded-lg left-0"
      >
        <button
          :class="buttonStyle"
          v-for="emoji in emojis"
          @click.prevent="editor.chain().focus().setEmoji(emoji.name).run()"
        >
          {{ emoji.emoji }}
        </button>
      </div>
    </div>
    <div
      :class="buttonStyle"
      @click.prevent="editor.chain().focus().toggleBold().run()"
    >
      B
    </div>
    <div
      :class="buttonStyle"
      @click.prevent="editor.chain().focus().toggleItalic().run()"
    >
      i
    </div>
  </div>
</template>

<script lang="ts" setup>
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";

const { editor } = defineProps(["editor"]);
const buttonStyle =
  "w-8 h-8 rounded-lg border border-slate-400 flex justify-center items-center cursor-pointer group relative bg-white hover:bg-sky-100";
const emojis = [
  {
    emoji: "🚀",
    name: "rocket",
  },
  {
    emoji: "🎉",
    name: "party",
  },
  {
    emoji: "✅",
    name: "white_check_mark",
  },
  {
    emoji: "❌",
    name: "x",
  },
];
</script>
