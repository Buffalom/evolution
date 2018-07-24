const boardInit = {
  cols: 50
}
var board
const animalInit = {
  count: 1,
  size: 0.7
}
var animals

function setup () {
  tileSize = windowWidth / boardInit.cols
  cols = boardInit.cols
  rows = Math.floor(windowHeight / tileSize)

  createCanvas(cols * tileSize, rows * tileSize)

  board = new Board(rows, cols, tileSize, {
    waterAmount: 0.05,
    waterSize: 0.88,
    foodRandomness: 2
  })
  board.draw()

  this.animals = []
  for (let i = 0; i < animalInit.count; i++) {
    let animal = new Animal(board.tileSize * animalInit.size, random(width), random(height))
    animal.draw()
    this.animals[i] = animal
  }
}

function draw () {

}
