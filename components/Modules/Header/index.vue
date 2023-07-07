<template>
	<header class="py-4 px-6 lg:px-10 gap-3 lg:gap-6 h-full flex flex-row lg:justify-between items-center">
		<div class="h-14 flex-1 flex items-center">

			<UIButton type="back" @click.prevent="$router.back()" v-if="id || type" class="max-md:hidden">
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
			<UIUserInfo @click="openMenu" :name="data?.user?.name" :image="data?.user?.image" role="developer">
			</UIUserInfo>

			<div class="w-96 bg-white outline-none shadow-xl justify-between px-6 md:px-10 py-4 flex gap-4 flex-col fixed top-0 right-0 bottom-0 z-50 transition-transform translate-x-full focus-within:translate-x-0"
				ref="menuRef" tabindex="0" @focusin="isMenuActive = true" @focusout="isMenuActive = false">
				<div class="flex gap-4 flex-col">



					<UIUserInfo :class="'self-end hidden md:flex'" :image="data?.user?.image" :name="data?.user?.name"
						role="developer">
					</UIUserInfo>


					<UIHeadline size="h3">
						Projects
					</UIHeadline>
					<UIList>
						<UIListItem v-for=" project  in  projectStore.projects " :class="{ 'justify-between': true, }"
							@click="selectProject(project.id)">
							<UIHeadline size="h4">
								{{ project.name }}
								<span class="text-sm text-gray-400">
									{{ projectStore.activeId === project.id ? '(current)' : '' }}
								</span>
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

					<NuxtLink class="text-blue-600 text-right cursor-pointer" to="/projects/create"
						v-if="projectStore.projects.length < MAX_PROJECTS">
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
					<UIButton type="system" @click="closeMenu" class="md:hidden">Close
					</UIButton>
				</div>

			</div>

			<div class="w-96 bg-white outline-none shadow-xl justify-between px-6 md:px-10 py-4 flex gap-4 flex-col fixed top-0 right-0 bottom-0 z-50 transition-transform translate-x-full focus-within:translate-x-0"
				ref="notificationMenuRef" tabindex="0" @focusin="isNotificationMenuActive = true"
				@focusout="isNotificationMenuActive = false">

				<div class="flex gap-4 flex-col">
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
				<div class="flex flex-col gap-3 ">
					<UIButton type="system" @click="closeNotificationMenu" class="md:hidden">Close
					</UIButton>
				</div>
			</div>

		</div>
	</header>
</template>

<script setup lang=ts>
import { useProjectStore } from "~~/stores/projects";
import { useUsersStore } from "~~/stores/users";
// Check if route contains Id param.
// Then we know it's not a "root" page. 
// We can then show back button.
const { id, type } = useRoute().params;
const projectStore = useProjectStore();
const { status, data, signIn, signOut } = useAuth()

const user = (email: string) => {
	return useUsersStore().userByEmail(email);
}

const MAX_PROJECTS = 2;
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
		isMenuActive.value = false
	}, 100)

};

const isNotificationMenuActive = ref(false);
const notificationMenuRef = ref();
const openNotificationMenu = () => notificationMenuRef.value.focus();
const closeNotificationMenu = (e: Event) => {
	e.preventDefault();
	e.stopPropagation();
	setTimeout(() => {
		notificationMenuRef.value.blur();
		isNotificationMenuActive.value = false
	}, 100)

};

const selectProject = (projectId: string) => {
	projectStore.setActive(projectId);
	closeMenu()
}

const notifications = 3;

const logout = async () => {
	// navigateTo('/')
	await signOut();
}


</script>