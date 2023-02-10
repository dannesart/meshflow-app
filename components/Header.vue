<template>
	<header class="py-4 px-10 gap-6 h-full flex flex-row justify-between">
		<div class="h-full flex-1">

			<Button type="back" @click.prevent="$router.back()" v-if="id || type">
				<Icons name="arrow-left"></Icons>
				Back
			</Button>
		</div>
		<div class="flex gap-10">

			<div class="text-xl w-14 h-14 flex justify-center items-center rounded-full relative cursor-pointer hover:shadow-xl"
				@click="openNotificationMenu"
				:class="{ 'text-slate-800 bg-slate-100': !notifications, 'text-white bg-pink-500': notifications }"
				name="user-info-avatar">
				<Icons name="notifications"></Icons>
				<div class="absolute -top-1 -right-1 bg-white shadow-xl rounded-full text-slate-600 w-6 h-6 flex justify-center items-center text-sm"
					v-if="notifications">
					{{ notifications }}</div>
			</div>

			<UserInfo @click="openMenu" :name="currentUser.name" role="developer"></UserInfo>

			<div class="w-96 bg-white outline-none shadow-xl px-10 py-4 flex gap-4 flex-col fixed top-0 right-0 bottom-0 z-30 transition-transform translate-x-full focus-within:translate-x-0"
				ref="menuRef" tabindex="0" @focusin="isMenuActive = true" @focusout="isMenuActive = false">
				<UserInfo :class="'self-end'" :name="currentUser.name" role="developer"></UserInfo>
				<Headline size="h3">
					Projects
				</Headline>
				<List>
					<ListItem v-for="project in projectStore.projects" :class="{ 'justify-between': true, }"
						@click="selectProject(project.id)">
						<Headline size="h4" :class="{ 'text-sky-200': projectStore.activeId === project.id }">
							{{ project.name }}
						</Headline>


						<div class="relative">
							<div
								class="absolute -top-2 right-0 w-10 h-10 rounded-full bg-sky-600 text-white flex justify-center items-center border-2 border-white">
								D
							</div>
							<div
								class="absolute -top-2 right-4 w-10 h-10 rounded-full bg-purple-600 text-white flex justify-center items-center border-2 border-white">
								D
							</div>
						</div>
					</ListItem>
				</List>

				<NuxtLink class="text-blue-600 text-right cursor-pointer" to="/projects/create">
					Create new project
				</NuxtLink>

			</div>

			<div class="w-96 bg-white outline-none shadow-xl px-10 py-4 flex gap-4 flex-col fixed top-0 right-0 bottom-0 z-30 transition-transform translate-x-full focus-within:translate-x-0"
				ref="notificationMenuRef" tabindex="0" @focusin="isNotificationMenuActive = true"
				@focusout="isNotificationMenuActive = false">

				<Headline size="h3">
					Notifications
				</Headline>
				<List>
					<ListItem :class="'flex-col'">
						<Headline size="h4">Title</Headline>
						<p>Something...</p>
					</ListItem>
				</List>
				<Button :type="'link'">
					All notifications
				</Button>
			</div>

		</div>
	</header>
</template>

<script setup lang=ts>
import { useUserStore } from "~~/stores/user";
import { useProjectStore } from "~~/stores/projects";
// Check if route contains Id param.
// Then we know it's not a "root" page. 
// We can then show back button.
const { id, type } = useRoute().params;
const { currentUser } = useUserStore();
const projectStore = useProjectStore();

const isMenuActive = ref(false);
const menuRef = ref();
const openMenu = () => menuRef.value.focus();

const isNotificationMenuActive = ref(false);
const notificationMenuRef = ref();
const openNotificationMenu = () => notificationMenuRef.value.focus();

const selectProject = (projectId: string) => projectStore.setActive(projectId)

const notifications = 3;


</script>