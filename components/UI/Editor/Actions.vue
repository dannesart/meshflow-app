<template>
  <div class="flex gap-2">
    <div :class="buttonStyle">
      <div>H</div>
      <div
        class="hidden group-hover:flex p-2 bg-white absolute top-full z-50 gap-2 shadow-lg rounded-lg left-0"
      >
        <button
          v-for="index in 6"
          :class="buttonStyle"
          :style="{ fontSize: 20 - index + 'px' }"
          @click.prevent="
            editor.chain().focus().toggleHeading({ level: index }).run()
          "
        >
          H{{ index }}
        </button>
      </div>
    </div>
    <div :class="buttonStyle">
      <div>😀</div>
      <div
        class="hidden group-hover:flex p-2 bg-white absolute top-full z-50 gap-2 shadow-lg rounded-lg left-0"
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
      :class="buttonStyle + ' font-bold'"
      @click.prevent="editor.chain().focus().toggleBold().run()"
    >
      B
    </div>
    <div
      :class="buttonStyle + ' italic'"
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
  "w-12 h-12 rounded-lg  flex justify-center items-center cursor-pointer group relative bg-white hover:bg-sky-100";
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
