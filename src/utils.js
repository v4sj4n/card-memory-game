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

export { arrayShuffler }
