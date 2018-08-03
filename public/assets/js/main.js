const DEBUG = true

const options = {
  // World
  cols: 10,
  waterAmount: 0.05,
  waterSize: 0.9,
  foodRandomness: 20,
  // Animal
  animalCount: 1,
  animalSize: 0.7,
  eyeCount: 5,
  fieldOfVision: 160,
  visualRangeInTiles: 2,
  maxSpeed: 10,
  maxForce: 0.5
}

const generateNewId = false
var worldId
const worldIdRegex = /^[a-zA-Z0-9]{5}$/
if (window.location.pathname.split('/')[1].match(worldIdRegex)) {
  worldId = window.location.pathname.split('/')[1]
}

var world

async function setup () {
  if (worldId) {
    let response = await axios.get('/worlds/' + worldId)
    world = World.fromCode(response.data.worldCode)
  } else {
    world = new World(options)
  }

  world.setup()

  if (!worldId && generateNewId) {
    let worldCode = world.toCode()
    axios.post('/worlds/add', { worldCode }).then(response => {
      console.log('World Id:', response.data.id)
    })
  }
}

function draw () {
  world.draw()
}

function mousePressed () {
  world.animals.forEach(animal => {
    animal.setTarget(createVector(mouseX, mouseY))
  })
}

function keyPressed () {
  handleKey(keyCode, true)
}

function keyReleased () {
  handleKey(keyCode, false)
}

async function handleKey (k, p) {
  let u = 0, r = 0, d = 0, l = 0
  if (k === 87) u = p ? -1 : 1
  if (k === 68) r = p ? 1 : -1
  if (k === 83) d = p ? 1 : -1
  if (k === 65) l = p ? -1 : 1
  world.animals.forEach(animal => {
    animal.accelerate(createVector(r + l, u + d))
  })
}
