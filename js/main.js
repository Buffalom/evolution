const boardInit = {
  cols: 20
}
var board
const animalInit = {
  count: 1,
  eyeCount: 3,
  fieldOfVision: 120,
  visualRange: 2,
  size: 0.7
}
var animals

function setup () {
  tileSize = windowWidth / boardInit.cols
  cols = boardInit.cols
  rows = Math.floor(windowHeight / tileSize)

  createCanvas(cols * tileSize, rows * tileSize)
  angleMode(DEGREES)

  board = new Board(rows, cols, tileSize, {
    waterAmount: 0.05,
    waterSize: 0.88,
    foodRandomness: 2
  })
  board.draw()

  animals = []
  for (let i = 0; i < animalInit.count; i++) {
    let animal = new Animal(board.tileSize * animalInit.size, random(width), random(height), {
      eyeCount: animalInit.eyeCount,
      fieldOfVision: animalInit.fieldOfVision,
      visualRange: animalInit.visualRange * board.tileSize
    })
    animal.draw()
    animals[i] = animal
  }

  animals.forEach((animal, index) => {
    console.log(`Animal ${index}`)
    animal.eyes.forEach((eye, index) => {
      // Read eyes
      console.log(`Eye ${index}:`, hueOnPixel(animal.absoluteEyePos(index)))
    })
    animal.draw()
  })
}

function draw () {
  
}

function drawEverything () {
  board.draw()
  animals.forEach((animal, index) => {
    animal.draw()
  })
}

function hueOnPixel (pos) {
  return hue(board.tiles[Math.floor(pos.x / board.tileSize)][Math.floor(pos.y / board.tileSize)].color)
}
