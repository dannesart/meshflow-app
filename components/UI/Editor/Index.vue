<template>
  <UIEditorActions :editor="editor" />

  <editor-content
    :editor="editor"
    :class="' border rounded-lg shadow-sm bg-white dark:bg-primary-950 dark:border-primary-800 disabled:bg-slate-100 hover:shadow-lg headings bullet'"
  />
</template>

<script setup>
import { useEditor, EditorContent, VueRenderer } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Code from "@tiptap/extension-code-block";
import Underline from "@tiptap/extension-underline";
import Mention from "@tiptap/extension-mention";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Emoji, { gitHubEmojis } from "@tiptap-pro/extension-emoji";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import tippy from "tippy.js";
import MentionsList from "./Mentions.vue";

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
    Image,
    ListItem,
    Link.configure({
      openOnClick: false,
    }),
    Mention.configure({
      HTMLAttributes: {
        class: "bg-primary-200 text-primary-600 px-1 py-0.5 rounded-md",
      },
      renderLabel({ options, node }) {
        return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
      },
      suggestion: {
        items: ({ query }) => {
          return suggestions
            .filter((item) =>
              item.toLowerCase().startsWith(query.toLowerCase())
            )
            .slice(0, 5);
        },
        render: () => {
          let component;
          let popup;

          return {
            onStart: (props) => {
              component = new VueRenderer(MentionsList, {
                // using vue 2:
                // parent: this,
                // propsData: props,
                // using vue 3:
                props,
                editor: props.editor,
              });

              if (!props.clientRect) {
                return;
              }

              popup = tippy("body", {
                getReferenceClientRect: props.clientRect,
                appendTo: () => document.body,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },

            onUpdate(props) {
              component.updateProps(props);

              if (!props.clientRect) {
                return;
              }

              popup[0].setProps({
                getReferenceClientRect: props.clientRect,
              });
            },

            onKeyDown(props) {
              if (props.event.key === "Escape") {
                popup[0].hide();

                return true;
              }

              return component.ref?.onKeyDown(props);
            },

            onExit() {
              popup[0].destroy();
              component.destroy();
            },
          };
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
