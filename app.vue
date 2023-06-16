<template>
  <NuxtPage />
</template>
  
<script setup>

import { useSettingsStore } from "~~/stores/settings";
import { useTasksStore } from "~~/stores/tasks";
import { useUsersStore } from "~~/stores/users";
import { useAuthStore } from "~~/stores/auth";
import { useProjectStore } from "~~/stores/projects";
import { useDataStore } from "~~/stores/data";
import { usePagesStore } from "./stores/pages";

const { fetchSettings } = useSettingsStore();
const { fetchTasks } = useTasksStore();
const { fetchUser } = useAuthStore();
const { fetchProjects } = useProjectStore();
const { fetchData } = useDataStore();
const { fetchPages } = usePagesStore();
const { fetchUserMap } = useUsersStore();

await fetchUser();
await fetchUserMap();
await fetchProjects();
await fetchSettings();
await fetchTasks();
await fetchData();
await fetchPages();

</script>