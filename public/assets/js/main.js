const options = {
  cols: 10,
  waterAmount: 0.05,
  waterSize: 0.9,
  foodRandomness: 1
}
const worldId = 'xpp8t'
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
