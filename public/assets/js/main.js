const options = {
  cols: 10,
  waterAmount: 0.05,
  waterSize: 0.9,
  foodRandomness: 1
}

function setup () {
  let cols = options.cols
  let tileSize = floor(windowWidth / cols)
  let rows = floor(windowHeight / tileSize)
  createCanvas(cols * tileSize, rows * tileSize)

  let tileOptions = {
    size: tileSize,
    cols, rows
  }
  let worldOptions = {
    waterAmount: options.waterAmount,
    waterSize: options.waterSize,
    foodRandomness: options.foodRandomness
  }
  let board = new Board(tileOptions, worldOptions)
  board.draw()
}

function draw () {

}
