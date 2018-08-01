const options = {
  cols: 10,
  waterAmount: 0.05,
  waterSize: 0.9,
  foodRandomness: 1
}
var world = new World(options)

function setup () {
  world.setup()

  let hex = world.toHexCode()
  console.log(hex)
  let world2 = World.fromHexCode(hex)
}

function draw () {
  world.draw()
}
