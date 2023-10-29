<template>
  <NuxtLayout>
    <UIHeadline size="h1"> Roles </UIHeadline>
    <div class="flex gap-6">
      <ModulesFilter @filterChange="filterChange" @sortChange="sortChange">
      </ModulesFilter>
      <div class="w-[1px] h-5/6 my-auto bg-slate-300"></div>
      <ModulesAdd> </ModulesAdd>
    </div>

    <UIGrid>
      <NuxtLink
        :to="'/roles/' + item.id"
        class="flex-1 md:max-w-md"
        v-for="(item, index) in data"
        :key="item.id"
      >
        <ModulesCard
          :title="item.title"
          :body="item.body"
          :favorite="item.favorite"
          @favorite="(event) => updateFavorite(event, index)"
        ></ModulesCard>
      </NuxtLink>
    </UIGrid>
  </NuxtLayout>
</template>

<script setup lang="ts">
const filters = ref({});
const sorts = ref({});
const data = ref([
  {
    title: "Admin",
    body: "Can do anything",
    id: "admin-role",
    favorite: false,
  },
  {
    title: "Publisher",
    body: "Can publish data, but not handle users",
    id: "publisher-role",
    favorite: false,
  },
]);

const updateFavorite = (favorite: any, itemIdx: number) => {
  const newData = [...data.value];
  newData[itemIdx] = { ...newData[itemIdx], favorite };
  data.value = newData;
};

const filterChange = async (_filters: { [key: string]: any }) => {
  filters.value = { ...filters.value, ..._filters };
};

const sortChange = async (_sorts: { [key: string]: any }) => {
  sorts.value = { ...sorts.value, ..._sorts };
};
</script>
