<script setup lang="ts">
defineProps<{
    card: {
        name: string,
        cardImage: string,
        clicked: boolean,
    }, clickHandler: () => void
}>()

</script>

<template>
    <div className="single-card" v-on:click="clickHandler">
        <img class="undraggable" :src="card.cardImage" :alt="card.name" />
    </div>
</template>

<style scoped>
.single-card {
    cursor: pointer;
    overflow: hidden;
    border: 4px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;

    & img {
        width: 10rem;
        height: auto;
        transition: transform 0.5s ease-in-out;
    }

    & img:hover {
        transform: scale(1.25);
    }
}



.undraggable {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
</style>
