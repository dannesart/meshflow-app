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
import { useBlocksStore } from "./stores/blocks";
import { useUiStore } from "./stores/ui";


const { setLoading } = useUiStore();

const { fetchProjects } = useProjectStore();
const { fetchSettings } = useSettingsStore();
const { fetchTasks } = useTasksStore();
const { fetchUser } = useAuthStore();
const { fetchData } = useDataStore();
const { fetchPages } = usePagesStore();
const { fetchUserMap } = useUsersStore();
const { fetchBlockModels } = useBlocksStore();

setLoading(true);
await Promise.all([fetchUser(), fetchProjects()]);
await Promise.all([fetchUser(), fetchProjects(), fetchUserMap(), fetchSettings(), fetchTasks(), fetchData(), fetchPages(), fetchBlockModels()])
setLoading(false);

</script>

