class World {
  constructor (options) {
    Object.requiresProperties(options, [
      { key: 'cols', type: 'number', min: 0 }
    ])
    this.options = options
  }

  setup () {
    let cols =  this.options.cols
    let tileSize = floor(windowWidth / cols)
    let rows = floor(windowHeight / tileSize)
    createCanvas(cols * tileSize, rows * tileSize)

    let tileOptions = {
      size: tileSize,
      cols,
      rows
    }
    let worldOptions = {
      waterAmount:  this.options.waterAmount,
      waterSize:  this.options.waterSize,
      foodRandomness:  this.options.foodRandomness
    }
    this.board = new Board(tileOptions, worldOptions)
    this.board.draw()
  }

  draw () {

  }

  // Generate JS-object with all information to replicate
  createJsObject () {
    // TODO: Generate JS-object with all information to replicate
    return {
      board: this.board.createJsObject()
    }
  }

  // Replicate from JS-object
  static fromJsObject (object) {
    Object.requiresProperties(object)
    // TODO: Replicate from JS-object
    return new this({ cols: 10 })
  }

  // Generate hex code of JS-object with all information to replicate
  toHexCode () {
    return JSON.stringify(this.createJsObject()).hexEncode()
  }

  // Replicate world from hex code
  static fromHexCode (hexCode) {
    if (!hexCode) throw new Error('Please provide a hex code to convert')
    return this.fromJsObject(JSON.parse(hexCode.hexDecode()))
  }
}