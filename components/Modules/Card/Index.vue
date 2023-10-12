<template>
    <div class="rounded-xl shadow-lg bg-white relative hover:shadow-xl hover:cursor-pointer"
        :class="{ 'p-6 py-4': size === 'small', 'p-10 py-8': size !== 'small' }">

        <UIHeadline size="h3" data-title :class="{ 'pr-12': true }">
            {{ title }}
        </UIHeadline>

        <p class="first-letter:capitalize truncate" v-if="body"
            :class="{ 'mb-0': !tags || !tags.length, 'pr-12': true, 'text-slate-400': body !== 'public' && body !== 'private', 'text-emerald-400': body === 'public', 'text-red-400': body === 'private' }"
            data-body>
            {{ body }}
        </p>
        <ModulesFavorite :favorite="favoriteState" @favorite="toggleFavorite" :size="size"></ModulesFavorite>

        <ModulesTagsList :can-add="false" v-if="tags && tags.length" :class="'mt-4'">
            <UITag v-for="tag in tags" class="px-2 py-0.5 text-sm">
                {{ tag }}
            </UITag>
        </ModulesTagsList>

    </div>
</template>

<script setup lang=ts>


const { title, body, favorite, size, tags } = defineProps(["title", "body", "favorite", "size", "tags"]);
const eventEmit = defineEmits(["favorite"])
const favoriteState = ref(favorite);

const toggleFavorite = (_favorite: boolean) => {
    favoriteState.value = !_favorite;
    eventEmit("favorite", !_favorite, title);

}


</script>