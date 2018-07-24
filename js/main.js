var board

function setup () {
  createCanvas(windowWidth, windowHeight)

  board = new Board(50, {
    waterAmount: 0.05,
    waterSize: 0.88,
    foodRandomness: 2
  })
  board.draw()
}

function draw () {

}
