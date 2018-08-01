class World {
  constructor (options, initialize = true) {
    Object.requiresProperties(options, [
      { key: 'cols', type: 'number', min: 1 },
      { key: 'animalCount', type: 'number', min: 0 },
      { key: 'animalSize', type: 'number', min: 0 }
    ])
    this.options = options
    this.initialize = initialize
  }

  setup () {
    let cols =  this.options.cols
    let tileSize = floor(windowWidth / cols)
    let rows = floor(windowHeight / tileSize)
    angleMode(DEGREES)
    colorMode(HSB, 360, 100, 100)
    createCanvas(cols * tileSize, rows * tileSize)

    if (this.initialize !== false) {
      // Initialize board
      let tileOptions = {
        size: tileSize,
        cols,
        rows
      }
      let boardOptions = {
        waterAmount:  this.options.waterAmount,
        waterSize:  this.options.waterSize,
        foodRandomness:  this.options.foodRandomness
      }
      this.board = new Board(tileOptions, boardOptions)

      // Initialize animals
      this.animals = new Array(this.options.animalCount).fill(undefined).map(() => {
        let animalMeta = {
          health: 100
        }
        let animal = new Animal(createVector(random(width), random(height)), this.board.tileOptions.size * this.options.animalSize, animalMeta)
        return animal
      })
      console.log(this.animals)
    }
  }

  getColorAtPos (x, y) {
    return this.board.getTileAtPos(x, y).color
  }

  draw () {
    this.board.draw()
    this.animals.forEach(animal => animal.draw())
  }

  // Generate JS-object with all information to replicate
  createJsObject () {
    let o = {
      options: this.options,
      board: this.board.createJsObject()
    }
    o.animals = this.animals.map(animal => animal.createJsObject())
    return o
  }

  // Replicate from JS-object
  static fromJsObject (o) {
    Object.requiresProperties(o, [
      { key: 'options', type: 'object' },
      { key: 'board', type: 'object' },
      { key: 'animals', type: 'array' }
    ])
    let newWorld = new this(o.options, false)
    newWorld.board = Board.fromJsObject(o.board)
    newWorld.animals = o.animals.map(animal => Animal.fromJsObject(animal))
    return newWorld
  }

  // Generate base64 code of JS-object with all information to replicate
  toCode () {
    return JSON.stringify(this.createJsObject()).lzw_encode()
  }

  // Replicate world from base64 code
  static fromCode (code) {
    if (!code) throw new Error('Please provide a lzw encoded code to convert')
    return this.fromJsObject(JSON.parse(code.lzw_decode()))
  }

  // Clear all worlds in backend store
  static clearAllWorlds () {
    axios.post('/worlds/clear').then(response => {
      console.log(response.data.message)
    })
  }
}