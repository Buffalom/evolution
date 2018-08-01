class World {
  constructor (options, initializeBoard = true) {
    Object.requiresProperties(options, [
      { key: 'cols', type: 'number', min: 1 }
    ])
    this.options = options
    this.initializeBoard = initializeBoard
  }

  setup () {
    let cols =  this.options.cols
    let tileSize = floor(windowWidth / cols)
    let rows = floor(windowHeight / tileSize)
    createCanvas(cols * tileSize, rows * tileSize)

    if (this.initializeBoard !== false) {
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
    }
  }

  getColorAtPos (x, y) {
    return this.board.getTileAtPos(x, y).color
  }

  draw () {
    this.board.draw()
  }

  // Generate JS-object with all information to replicate
  createJsObject () {
    return {
      options: this.options,
      board: this.board.createJsObject()
    }
  }

  // Replicate from JS-object
  static fromJsObject (o) {
    Object.requiresProperties(o, [
      { key: 'options', type: 'object' },
      { key: 'board', type: 'object' }
    ])
    let newWorld = new this(o.options, false)
    newWorld.board = Board.fromJsObject(o.board)
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
}