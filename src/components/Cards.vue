<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Card from './Card.vue';
import { ICard } from '../App.vue';

const props = defineProps<{ rows: number, cols: number, newGame: () => void }>()

const gameCardsArray = ref([])
const round = ref(1)
const lost = ref(false)
const won = ref(false)
const twiceClickedCard = ref("")

const fetchData = async () => {

  const error = ref<string>('');
  const data = ref<any>([]);
  const tempArr: any = []
  let randomi = Math.floor(Math.random() * 752) + 1
  for (let i = randomi; i < randomi + (props.cols * props.rows); i++) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((result) => result.json())
      .then((data) => {
        tempArr.push({
          name: data.species.name,
          cardImage: !data.sprites.front_default
            ? data.sprites.other["official-artwork"].front_default
            : data.sprites.front_default,
          clicked: false,
        })
      })
      .catch((err) => {
        error.value = err
      })
  }
  data.value = tempArr

  return { data, error }
}


const handleGameStart = async () => {
  const { data, error } = await fetchData()
  if (error.value) {
    console.log(error.value)
  }
  console.log(data)
  gameCardsArray.value = data.value

}
onMounted(() => {
  handleGameStart()
})

const arrayShuffler = (array: ICard[]) => {
  let shuffledArray: any = []
  let usedIndexes: number[] = []

  let i = 0
  while (i < array.length) {
    const RandNum = Math.floor(Math.random() * array.length)
    if (!usedIndexes.includes(RandNum)) {
      shuffledArray.push(array[RandNum])
      usedIndexes.push(RandNum)
      i++
    }
  }
  return shuffledArray
}

const cardClickHandler = (card: any) => {
  console.log(card)
  if (card.clicked) {
    lost.value = true
    console.log(card)
    twiceClickedCard.value = card.name
  }

  const newArray = gameCardsArray.value.map((crd: any) =>
    crd.name === card.name ? { ...crd, clicked: true } : crd
  )

  if (newArray.every(card => card.clicked)) {
    won.value = true
  } else {
    gameCardsArray.value = (arrayShuffler(newArray))
    round.value = round.value + 1

  }


  console.log(gameCardsArray)
}



</script>

<template>
  <div>
    <div v-if="!lost && !won">
      <p v-if="round == 1">
        You created a {{ rows }} x {{ cols }} grid, good luck! Round {{ round }} /
        {{ rows * cols }}
      </p>
      <p v-if="round !== 1">Round {{ round }} out of {{ cols * rows }}</p>

      <div id="cards-grid" :style="{
        display: `grid`, gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`
      }">

        <Card v-for="card in   gameCardsArray" :card="card" :clickHandler="() => cardClickHandler(card)" />
      </div>
    </div>
    <div v-if="lost">
      <p>{{ twiceClickedCard }} was already clicked, do you want to play a new game?</p>
      <button @click="props.newGame()">New game</button>
    </div>
    <div v-if="won">
      <p>You Won, new game?</p>
      <button @click="props.newGame()">New game</button>

    </div>
  </div>
</template>

<style scoped>
#cards-grid {
  display: grid;
  gap: 1rem;
  width: 50%;
  margin: auto;
}

.another-game {
  border: none;
  padding: 1rem 2rem;
  background-color: #d3d3d3;
  color: #1f1f1f;
  border-radius: 0.5rem;
}

@media (max-width: 800px) {
  #cards-grid {
    width: 80%;
    gap: 0.5rem;
  }
}

@media (max-width: 400px) {
  #cards-grid {
    width: 100%;
    gap: 0.25rem;
  }
}
</style>


