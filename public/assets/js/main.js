const options = {
  cols: 10,
  waterAmount: 0.01,
  waterSize: 0.9,
  foodRandomness: 20
}

var worldId
const worldIdRegex = /^[a-zA-Z0-9]{5}$/
if (window.location.pathname.split('/')[1].match(worldIdRegex)) {
  worldId = window.location.pathname.split('/')[1]
}

var world

async function setup () {
  if (worldId) {
    let response = await axios.get('/worlds/' + worldId)
    world = World.fromCode(response.data.worldHash)
  } else {
    world = new World(options)
  }

  world.setup()

  if (!worldId) {
    let worldHash = world.toCode()
    axios.post('/worlds/add', { worldHash }).then(response => {
      console.log('World Id:', response.data.id)
    })
  }
  
  world.draw()
}

function draw () {

}
