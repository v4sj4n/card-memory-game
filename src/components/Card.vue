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
        <img :src="card.cardImage" :alt="card.name" class="undraggable" />
    </div>
</template>

<style scoped></style>
