<script>
  export let knowGameRules
  const knowRules = () => (knowGameRules = true)
</script>

<div id="explainer">
  <h3>Here's how the game works:</h3>
  <p>
    You have to click different cards each round to win the game, <br /> if you click
    a card you have already clicked you lose...
  </p>
  <button on:click={knowRules}>Continue</button>
</div>

<style>
  #explainer {
    & h3 {
      font-size: 1.75rem;
      margin-bottom: 0;
    }
    & p {
      text-wrap: balance;
      font-size: 0.75rem;
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
