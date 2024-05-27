<template>
  <NuxtPage />
</template>

<script setup>
/*
import { useSettingsStore } from "~~/stores/settings";
import { useTasksStore } from "~~/stores/tasks";
import { useUsersStore } from "~~/stores/users";
import { useAuthStore } from "~~/stores/auth";
import { useProjectStore } from "~~/stores/projects";
import { useDataStore } from "~~/stores/data";
import { usePagesStore } from "./stores/pages";
import { useBlocksStore } from "./stores/blocks";
import { useUiStore } from "./stores/ui";
*/
const { setLoading } = useUiStore();
const { fetchProjects } = useProjectStore();
const { fetchUser } = useAuthStore();
const { fetchSettings } = useSettingsStore();
const { fetchTasks } = useTasksStore();
const { fetchUserMap } = useUsersStore();
const { fetchPages } = usePagesStore();
const { fetchBlockModels } = useBlocksStore();
setLoading(true);
await Promise.all([fetchUser(), fetchProjects()]);
await Promise.all([
  fetchSettings(),
  fetchTasks(),
  fetchUserMap(),
  fetchPages(),
  fetchBlockModels(),
]);
setLoading(false);
/*

const { fetchUser } = useAuthStore();
const { fetchDataModels } = useDataStore();





await Promise.all([fetchUser(), fetchProjects()]);
await Promise.all([
  
  fetchSettings(),
  fetchDataModels(),
  
  fetchBlockModels(),
]);
setLoading(false);*/
</script>
