<template>
    <div class="absolute" :class="{ 'top-8 right-8': size !== 'small', 'top-4 right-4': size === 'small' }">
        <UIButton data-favorite :type="favoriteState ? 'love' : 'dead'" size="round"
            @click="event => toggleFavorite(event, favoriteState)">
            <UIIcons name="heart"></UIIcons>
        </UIButton>
    </div>
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