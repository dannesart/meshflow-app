<template>
  <div
    class="relative transition-all bg-white shadow-lg dark:bg-primary-950 rounded-xl hover:shadow-xl hover:cursor-pointer"
    :class="{ 'p-6 py-4': size === 'small', 'p-10 py-8': size !== 'small' }"
  >
    <UIHeadline size="h3" data-title :class="{ 'pr-12': true }">
      {{ title }}
    </UIHeadline>

    <p
      class="truncate first-letter:capitalize"
      v-if="body"
      :class="{
        'mb-0': !tags || !tags.length,
        'pr-12': true,
        'text-slate-400': body !== 'public' && body !== 'private',
        'text-emerald-400': body === 'public',
        'text-rose-400': body === 'private',
      }"
      data-body
    >
      {{ body }}
    </p>

    <UIBadge
      v-if="badge"
      :badge="badge"
      :class="'absolute top-6 right-6'"
    ></UIBadge>

    <div class="flex gap-3 mt-4" v-if="user || tags">
      <UIUserTag v-if="user" :id="user" :size="'small'"></UIUserTag>
      <ModulesTagsList :can-add="false" v-if="tags && tags.length">
        <UITag class="px-2 py-0.5 text-sm">
          {{ tags[0] }}
        </UITag>
        <UITag class="px-2 py-0.5 text-sm" v-if="tags.length > 1">
          {{ tags.length - 1 }}+
        </UITag>
      </ModulesTagsList>
    </div>
  </div>
</template>

<script setup lang="ts">
const { title, body, size, tags, user, badge } = defineProps([
  "title",
  "body",
  "size",
  "tags",
  "user",
  "badge",
]);
</script>

<script lang="ts">
export default defineComponent({
  name: "Card",
});
</script>
