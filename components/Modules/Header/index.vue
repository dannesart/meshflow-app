<template>
  <header
    class="flex flex-row items-center h-full gap-3 px-6 py-4 lg:pr-10 lg:gap-6 lg:justify-between"
  >
    <div class="flex items-center flex-1 h-14">
      <UIButton
        type="back"
        @click.prevent="$router.back()"
        v-if="id || type || category"
        class="max-md:hidden"
      >
        <UIIcons name="arrow-left"></UIIcons>
        Back
      </UIButton>
    </div>
    <div class="flex gap-3 lg:gap-10">
      <div
        class="relative flex items-center justify-center text-xl rounded-full cursor-pointer w-14 h-14 hover:shadow-xl"
        @click="openNotificationMenu"
        :class="{
          'text-slate-800 bg-slate-100 dark:bg-indigo-600 dark:text-indigo-200':
            !nonReadNotifications,
          'text-white bg-sky-500 ': nonReadNotifications,
        }"
        name="user-info-avatar"
      >
        <UIIcons name="notifications"></UIIcons>
        <div
          class="absolute flex items-center justify-center w-6 h-6 text-sm bg-white rounded-full shadow-xl -top-1 -right-1 text-slate-600"
          v-if="nonReadNotifications"
        >
          {{ nonReadNotifications }}
        </div>
      </div>
      <UIUserInfo
        @click="openMenu"
        :image="userObject?.user_metadata?.picture"
        :name="userObject?.user_metadata?.name"
        :role="activeProject?.name"
      >
      </UIUserInfo>

      <div
        class="fixed top-0 bottom-0 right-0 z-50 flex flex-col justify-between gap-4 px-6 py-4 transition-transform translate-x-full bg-white shadow-xl outline-none dark:bg-indigo-900 w-96 md:px-10 focus-within:translate-x-0"
        ref="menuRef"
        tabindex="0"
        @focusin="isMenuActive = true"
        @focusout="isMenuActive = false"
      >
        <div class="flex flex-col gap-4">
          <UIUserInfo
            :class="'self-end hidden md:flex'"
            :image="userObject?.user_metadata?.picture"
            :name="userObject?.user_metadata?.name"
            :role="activeProject?.name"
          >
          </UIUserInfo>

          <UIHeadline size="h3"> Projects </UIHeadline>
          <UIList>
            <UIListItem
              v-for="project in projectStore.projects"
              :key="project.id"
              :class="{ 'justify-between': true }"
              @click="selectProject(project.id)"
            >
              <UIHeadline size="h4">
                {{ project.name }}
                <span class="text-sm text-gray-400">
                  {{ projectStore.activeId === project.id ? "(current)" : "" }}
                </span>
              </UIHeadline>

              <div class="relative">
                <div
                  class="absolute right-0 flex items-center justify-center w-10 h-10 text-white border-2 border-white rounded-full -top-2 bg-sky-600"
                >
                  D
                </div>
                <div
                  class="absolute flex items-center justify-center w-10 h-10 text-white bg-purple-600 border-2 border-white rounded-full -top-2 right-4"
                >
                  D
                </div>
              </div>
            </UIListItem>
          </UIList>

          <NuxtLink
            class="text-right cursor-pointer text-sky-600"
            to="/projects/create"
            v-if="projectStore.projects.length < MAX_PROJECTS"
          >
            Create new project
          </NuxtLink>
        </div>

        <div class="flex flex-col gap-3">
          <NuxtLink
            class="px-6 py-3 text-center border rounded-lg cursor-pointer text-sky-600 border-sky-500 hover:shadow-xl"
            to="/user"
          >
            Go to profile
          </NuxtLink>
          <UIButton type="nevermind" class="" @click="handleLogout">
            Log me out, please
          </UIButton>
          <UIButton type="system" @click="closeMenu" class="md:hidden"
            >Close
          </UIButton>
        </div>
      </div>

      <div
        class="fixed top-0 bottom-0 right-0 z-50 flex flex-col justify-between gap-4 px-6 py-4 transition-transform translate-x-full bg-white shadow-xl outline-none dark:bg-indigo-900 w-96 md:px-10 focus-within:translate-x-0"
        ref="notificationMenuRef"
        tabindex="0"
        @focusin="isNotificationMenuActive = true"
        @focusout="isNotificationMenuActive = false"
      >
        <div class="flex flex-col gap-4">
          <UIHeadline size="h3"> Notifications </UIHeadline>
          <UIList v-if="notifications.length">
            <UIListItem
              :class="'flex-row'"
              v-for="notification in notifications"
              :key="notification.title"
            >
              <div
                class="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg text-sky-500"
              >
                <UIIcons name="notifications"></UIIcons>
              </div>
              <div class="flex-col gap-3">
                <UIHeadline size="h4">{{ notification.title }}</UIHeadline>
                <p>{{ notification.body }}</p>
              </div>
            </UIListItem>
          </UIList>
          <div v-else class="p-6 bg-gray-100 rounded-lg">No notifications</div>
        </div>
        <div class="flex flex-col gap-3">
          <UIButton
            type="system"
            @click="closeNotificationMenu"
            class="md:hidden"
            >Close
          </UIButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Project } from "~~/models/project";
import { storeToRefs } from "pinia";
import { useBlocksStore } from "~~/stores/blocks";
import { usePagesStore } from "~~/stores/pages";
import { useProjectStore } from "~~/stores/projects";
import { useTasksStore } from "~~/stores/tasks";
import { useUiStore } from "~~/stores/ui";
import { useUsersStore } from "~~/stores/users";
import { useNotificationStore } from "~~/stores/notifications";
import { useSettingsStore } from "~/stores/settings";
// Check if route contains Id param.
// Then we know it's not a "root" page.
// We can then show back button.
const { id, type, category } = useRoute().params;
const projectStore = useProjectStore();
const tasksStore = useTasksStore();
const pagesStore = usePagesStore();
const blocksStore = useBlocksStore();
const notificationStore = useNotificationStore();
const settingsStore = useSettingsStore();
const uiStore = useUiStore();
const { setLoading } = uiStore;
const userObject = useSupabaseUser();
const userClient = useSupbaseClient();
const router = useRouter();
const { activeId, getProject } = storeToRefs(projectStore);
const { notifications, nonReadNotifications } = storeToRefs(notificationStore);

const activeProject = computed(() => {
  return getProject.value(activeId.value || "") as Project;
});

const user = (email: string) => {
  return useUsersStore().userByEmail(email);
};

const MAX_PROJECTS = 10;
const isMenuActive = ref(false);
const menuRef = ref();
const openMenu = () => menuRef.value.focus();
const closeMenu = (e?: Event) => {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  setTimeout(() => {
    menuRef.value.blur();
    isMenuActive.value = false;
  }, 100);
};

const isNotificationMenuActive = ref(false);
const notificationMenuRef = ref();
const openNotificationMenu = () => notificationMenuRef.value.focus();
const closeNotificationMenu = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
  setTimeout(() => {
    notificationMenuRef.value.blur();
    isNotificationMenuActive.value = false;
  }, 100);
};

const selectProject = async (projectId: string) => {
  setLoading(true);
  projectStore.setActive(projectId);
  await Promise.all([
    settingsStore.fetchSettings(),
    tasksStore.fetchTasks(),
    pagesStore.fetchPages(),
    blocksStore.fetchBlockModels(),
  ]);

  closeMenu();
  setLoading(false);
};

const handleLogout = async (e) => {
  try {
    const { error } = await userClient.auth.signOut();
    if (error) throw error;
    router.push("/auth/log-in");
  } catch (error) {
    console.log(error.message);
  }
};
</script>

<script lang="ts">
export default defineComponent({
  name: "Header",
});
</script>
