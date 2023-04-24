<template>
	<header class="py-4 px-6 lg:px-10 gap-3 lg:gap-6 h-full flex flex-row lg:justify-between">
		<div class="h-full flex-1">

			<UIButton type="back" @click.prevent="$router.back()" v-if="id || type">
				<UIIcons name="arrow-left"></UIIcons>
				Back
			</UIButton>
		</div>
		<div class="flex gap-3 lg:gap-10">

			<div class="text-xl w-14 h-14 flex justify-center items-center rounded-full relative cursor-pointer hover:shadow-xl"
				@click="openNotificationMenu"
				:class="{ 'text-slate-800 bg-slate-100': !notifications, 'text-white bg-pink-500': notifications }"
				name="user-info-avatar">
				<UIIcons name="notifications"></UIIcons>
				<div class="absolute -top-1 -right-1 bg-white shadow-xl rounded-full text-slate-600 w-6 h-6 flex justify-center items-center text-sm"
					v-if="notifications">
					{{ notifications }}</div>
			</div>

			<UIUserInfo @click="openMenu" :name="data?.user?.name" :image="data?.user?.image" role="developer"></UIUserInfo>

			<div class="w-96 bg-white outline-none shadow-xl justify-between px-10 py-4 flex gap-4 flex-col fixed top-0 right-0 bottom-0 z-30 transition-transform translate-x-full focus-within:translate-x-0"
				ref="menuRef" tabindex="0" @focusin="isMenuActive = true" @focusout="isMenuActive = false">
				<div class="flex gap-4 flex-col">
					<UIUserInfo :class="'self-end'" :image="data?.user?.image" :name="data?.user?.name" role="developer">
					</UIUserInfo>


					<UIHeadline size="h3">
						Projects
					</UIHeadline>
					<UIList>
						<UIListItem v-for="project in projectStore.projects" :class="{ 'justify-between': true, }"
							@click="selectProject(project.id)">
							<UIHeadline size="h4" :class="{ 'text-sky-200': projectStore.activeId === project.id }">
								{{ project.name }}
							</UIHeadline>


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
						</UIListItem>
					</UIList>

					<NuxtLink class="text-blue-600 text-right cursor-pointer" to="/projects/create">
						Create new project
					</NuxtLink>
				</div>

				<div class="flex flex-col gap-3">
					<NuxtLink
						class="text-blue-600 text-center border border-blue-500 px-6 py-3 rounded-lg cursor-pointer hover:shadow-xl"
						to="/user">
						Go to profile
					</NuxtLink>
					<UIButton type="nevermind" class="" @click="logout">
						Log me out, please
					</UIButton>
				</div>

			</div>

			<div class="w-96 bg-white outline-none shadow-xl px-10 py-4 flex gap-4 flex-col fixed top-0 right-0 bottom-0 z-30 transition-transform translate-x-full focus-within:translate-x-0"
				ref="notificationMenuRef" tabindex="0" @focusin="isNotificationMenuActive = true"
				@focusout="isNotificationMenuActive = false">

				<UIHeadline size="h3">
					Notifications
				</UIHeadline>
				<UIList>
					<UIListItem :class="'flex-row'">
						<div class="w-10 h-10 rounded-lg bg-red-100 text-pink-500 flex items-center justify-center">
							<UIIcons name="notifications"></UIIcons>
						</div>
						<div class="flex-col gap-3">
							<UIHeadline size="h4">Title</UIHeadline>
							<p>Something...</p>
						</div>
					</UIListItem>
				</UIList>
				<UIButton :type="'link'">
					All notifications
				</UIButton>
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
const { status, data, signIn, signOut } = useSession()

const isMenuActive = ref(false);
const menuRef = ref();
const openMenu = () => menuRef.value.focus();

const isNotificationMenuActive = ref(false);
const notificationMenuRef = ref();
const openNotificationMenu = () => notificationMenuRef.value.focus();

const selectProject = (projectId: string) => projectStore.setActive(projectId)

const notifications = 3;

const logout = () => {
	// navigateTo('/')
	signOut();
}


</script>