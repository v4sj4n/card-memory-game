<script>
  import Explainer from './lib/Explainer.svelte'
  import GridCreator from './lib/GridCreator.svelte'

  let knowGameRules = false
  let createdGrid = false

  let rows = 2
  let cols = 2
  let gameGrid = []
  let hasFailed = false
  let clickedTwicePlayer
  let hasWon = false
  let round = 1

  const arrayShuffler = (array) => {
    let shuffledArray = []
    let usedIndexes = []

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

  const handleCardClick = (cardName) => {
    const newGrid = gameGrid.map((card) => {
      if (card.name == cardName) {
        if (card.clicked) {
          hasFailed = true
          clickedTwicePlayer = card.name
        }
        card.clicked = true
      }
      return card
    })
    if (newGrid.every((card) => card.clicked)) {
      hasWon = true
    }
    round++
    gameGrid = arrayShuffler(newGrid)
  }

  const newGameHandler = () => {
    createdGrid = false
    hasFailed = false
    hasWon = false
    clickedTwicePlayer = ''
    round = 1
    gameGrid = []
  }
</script>

<main>
  {#if !knowGameRules}
    <Explainer bind:knowGameRules />
  {:else if !createdGrid}
    <GridCreator bind:rows bind:cols bind:createdGrid bind:gameGrid />
  {:else if hasWon}
    <div id="status-grid">
      <h3>You won</h3>
      <br />
      <button on:click={newGameHandler}>Play a new game</button>
    </div>
  {:else if hasFailed}
    <div id="status-grid">
      <h3>You lost...</h3>
      <p><span>{clickedTwicePlayer}</span> was clicked once</p>
      <button on:click={newGameHandler}>Play a new game</button>
    </div>
  {:else}
    <h2>Round {round} out of {cols * rows}</h2>
    <div
      id="cards-grid"
      style="    
    grid-template-columns: repeat({cols}, 1fr);
    grid-template-rows: repeat({rows}, 1fr);"
    >
      {#each gameGrid as card (card.name)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={() => handleCardClick(card.name)}>
          <img src={card.cardImage} class="undraggable" alt={card.name} />
          <p>{card.name[0].toUpperCase() + card.name.slice(1)}</p>
        </div>
      {/each}
    </div>
  {/if}
</main>

<style>
  main {
    display: grid;
    place-items: center;
    height: 80svh;
  }
  #cards-grid {
    display: grid;
    width: 50svh;
    height: 50svh;
    margin-left: auto;
    margin-right: auto;
    gap: 1rem;
    & div {
      cursor: pointer;
      border: 2px solid #d3d3d3;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 1rem;

      & img {
        width: 10rem;
        height: auto;
        transition: transform 0.5s ease-in-out;
      }

      & img:hover {
        transform: scale(1.25);
      }
    }
  }

  #status-grid {
    & h3 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 0;
    }
    & span {
      font-weight: bold;
    }
    & button {
      display: block;
      margin: auto;
      border-radius: 0.5rem;
      padding: 1rem 2rem;
      outline: none;
      border: none;
      background-color: #d3d3d3;
      color: #1f1f1f;
      font-size: 1rem;
    }
    & button:hover {
      cursor: pointer;
      background-color: #b4b4b4;
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
