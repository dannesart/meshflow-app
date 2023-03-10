<template>
    <UIButton data-favorite :type="favoriteState ? 'love' : 'dead'" size="round"
        @click="event => toggleFavorite(event, favoriteState)" class="absolute"
        :class="{ 'top-8 right-8': size !== 'small', 'top-4 right-4': size === 'small' }">
        <UIIcons name="heart"></UIIcons>
    </UIButton>
</template>

<script setup lang=ts>

const { favorite, size } = defineProps(["favorite", "size"]);
const eventEmit = defineEmits(["favorite"])
const favoriteState = ref(favorite);

const toggleFavorite = (event: Event, _favorite: boolean) => {
    event.stopPropagation();
    event.preventDefault();
    favoriteState.value = !_favorite;
    eventEmit("favorite", !_favorite);
}

</script>