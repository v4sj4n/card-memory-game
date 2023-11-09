<script setup lang="ts">
export interface ICard {
  name: string;
  cardImage: string;
  clicked: boolean;
}

import { ref } from 'vue'
import Cards from "./components/Cards.vue"


const knowGame = ref<boolean>(false)
const startGame = ref<boolean>(false)
const rowsForGrid = ref<number>(2)
const colsForGrid = ref<number>(2)



</script>

<template>
  <div>
    <header>
      <h1>
        <a href="/">Memory Game</a>
      </h1>
    </header>
    <div v-if="!knowGame" id="explainer">
      <p>Here&apos;s how the game works:</p>
      <p>
        You have to click different cards each round to win the game, <br />if you click a card you have already clicked
        you lose...
      </p>
      <button v-on:click="knowGame = true">Continue</button>
    </div>
    <div v-if="knowGame && !startGame" id="game-creator">
      <p>Create your cards grid:</p>
      <input type="number" :min="2" :max="5" v-model="rowsForGrid" />
      <input type="number" :min="2" :max="5" v-model="colsForGrid" />
      <br />
      <button v-on:click="startGame = true">Start game</button>
    </div>

    <Cards v-if="startGame" :rows="rowsForGrid" :cols="colsForGrid" :newGame="() => startGame = false" />
  </div>
</template>

<style scoped>
header h1 a {
  font-size: 2.5rem;
  text-decoration: none;
  color: white;
}

header h1 a:hover {
  color: #d3d3d3;
}


#explainer {
  display: grid;
  place-content: center;
  height: 70svh;
  text-align: center;
}

#explainer p:first-child {
  font-size: 2rem;
  margin-bottom: 0;
  font-weight: 700;
}

#explainer p:nth-child(2) {
  font-size: 1rem;
}

#explainer button {
  padding: 1rem 2rem;
  font-family: Gabarito, sans-serif;
  font-size: 1.25rem;
  background-color: #d3d3d3;
  color: #1f1f1f;
  border-radius: 8px;
}



#game-creator input {
  width: 2rem;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  margin: 4px;
}

#game-creator button {
  margin-top: 1rem;
  font-family: Gabarito, sans-serif;
  font-size: 1.25rem;
  padding: 1rem 1.1rem;
  border-radius: 8px;
  border: none;
  color: #1f1f1f;
  background-color: #d3d3d3;

}
</style>
