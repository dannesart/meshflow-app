<template>
  <div class="items">
    <template v-if="items.length">
      <button
        class="item"
        :class="{ 'is-selected': index === selectedIndex }"
        v-for="(item, index) in items"
        :key="index"
        @click="selectItem(index)"
      >
        {{ item }}
      </button>
    </template>
    <div class="item" v-else>No result</div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  items: Array<string>;
  command: any;
};

const { items, command } = defineProps<Props>();
const selectedIndex = ref(0);

watch(items, () => {
  selectedIndex.value = 0;
});

const selectItem = (index: number) => {
  const item = items[index];

  if (item) {
    command({ id: item });
  }
};
</script>
