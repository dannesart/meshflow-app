<template>

    <div class="rounded-xl shadow-lg mb-10 bg-white relative hover:shadow-xl hover:cursor-pointer"
        :class="{ 'p-6 py-4': size === 'small', 'p-10 py-8': size !== 'small' }">

        <UIHeadline size="h3" data-title>
            {{ title }}
        </UIHeadline>

        <p class="text-slate-400" data-body>
            {{ body }}
        </p>

        <UIButton data-favorite :type="favoriteState ? 'love' : 'dead'" size="round"
            @click="event => toggleFavorite(event, favoriteState)" class="absolute"
            :class="{ 'top-8 right-8': size !== 'small', 'top-4 right-4': size === 'small' }">
            <UIIcons name="heart"></UIIcons>
        </UIButton>

    </div>

</template>

<script setup lang=ts>


const { title, body, favorite, size } = defineProps(["title", "body", "favorite", "size"]);
const eventEmit = defineEmits(["favorite"])
const favoriteState = ref(favorite);

const toggleFavorite = (event: Event, _favorite: boolean) => {
    event.stopPropagation();
    event.preventDefault();
    favoriteState.value = !_favorite;
    eventEmit("favorite", !_favorite);

}


</script>