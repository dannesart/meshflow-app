<template>
  <NuxtPage />
</template>
  
<script setup>

import { useSettingsStore } from "~~/stores/settings";
import { useTasksStore } from "~~/stores/tasks";
import { useUserStore } from "~~/stores/user";
import { useProjectStore } from "~~/stores/projects";
import { useDataStore } from "~~/stores/data";
import { usePagesStore } from "./stores/pages";

const { fetchSettings } = useSettingsStore();
const { fetchTasks } = useTasksStore();
const { fetchUser } = useUserStore();
const { fetchProjects } = useProjectStore();
const { fetchData } = useDataStore();
const { fetchPages } = usePagesStore();

await fetchUser();
await fetchProjects();
await fetchSettings();
await fetchTasks();
await fetchData();
await fetchPages();




</script>