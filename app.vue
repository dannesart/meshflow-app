<template>
  <NuxtPage />

</template>
  
<script setup>

import { useSettingsStore } from "~~/stores/settings";
import { useTasksStore } from "~~/stores/tasks";
import { useUserStore } from "~~/stores/user";
import { useProjectStore } from "~~/stores/projects";



const { fetchSettings } = useSettingsStore();
const { fetchTasks } = useTasksStore();
const { fetchUser } = useUserStore();
const { fetchProjects } = useProjectStore();

await fetchProjects();
await fetchSettings();
await fetchTasks();
await fetchUser();


</script>