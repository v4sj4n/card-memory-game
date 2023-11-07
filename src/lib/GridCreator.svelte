<script>
  export let rows
  export let cols
  export let createdGrid
  export let gameGrid

  const createGrid = async () => {
    let randomi = Math.floor(Math.random() * 752) + 1
    console.log(rows)
    console.log(cols)
    let size = rows * cols
    for (let i = randomi; i < randomi + size; i++) {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((result) => result.json())
        .then((data) => {
          gameGrid.push({
            name: data.species.name,
            cardImage: !data.sprites.front_default
              ? data.sprites.other['official-artwork'].front_default
              : data.sprites.front_default,
            clicked: false,
          })
        })
    }
    createdGrid = true
  }

  const colRowHandler = (numstr, type) => {
    let num = parseInt(numstr, 10)
    if (isNaN(num) || num < 2) {
      num = 2
    } else if (num > 5) {
      num = 5
    }
    if (type === 'rows') {
      rows = num
    } else if (type === 'cols') {
      cols = num
    }
  }
</script>

<div id="game-creator">
  <h3>Create your cards grid:</h3>
  <div>
    <input
      type="number"
      min="2"
      max="5"
      bind:value={rows}
      on:change={() => colRowHandler(rows, 'rows')}
    />
    <input
      type="number"
      min="2"
      max="5"
      bind:value={cols}
      on:change={() => colRowHandler(cols, 'cols')}
    />
  </div>
  <button on:click={createGrid}>Start game</button>
</div>

<style>
  #game-creator {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    & h3 {
      font-size: 2rem;
      margin-bottom: 0;
    }
    & div {
      display: flex;
      gap: 0.5rem;
    }

    & input {
      padding: 1rem 2rem;
      font-size: 1rem;
      border-radius: 4px;
      border: none;
      font-weight: bold;
      text-align: center;
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
</style>
