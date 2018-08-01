class Board {
  constructor (tileOptions, boardOptions = {}, initialize = true) {
    Object.requiresProperties(tileOptions, [
      { key: 'size', type: 'number' },
      { key: 'rows', type: 'number' },
      { key: 'cols', type: 'number' }
    ])
    this.tileOptions = tileOptions
    this.boardOptions = boardOptions
    if (initialize !== false) {
      this.initTiles()
    }
  }

  initTiles () {
    // Initialize rows
    this.rows = new Array(this.tileOptions.rows).fill(undefined)
    this.rows.forEach((row, rowIndex) => {
      // Initialize row with tiles
      this.rows[rowIndex] = new Array(this.tileOptions.cols).fill(undefined)
      this.rows[rowIndex].forEach((tile, colIndex) => {
        // Calculate position vector
        let pos = createVector(this.tileOptions.size * colIndex, this.tileOptions.size * rowIndex)
        // Collect meta of surrounding tiles
        let neighbourMeta = this.getNeighbourMeta(colIndex, rowIndex)
        // Calculate chance of water based on neighbours
        let chanceForWater = map(neighbourMeta.water, 0, neighbourMeta.neighbourCount, this.boardOptions.waterAmount || 0.05, this.boardOptions.waterSize || 0.9)
        let meta = {
          // Calculate food based on neighbours and some randomness
          food: floor((random(101) * (this.boardOptions.foodRandomness || 10) + (neighbourMeta.food || 50) * 5) / ((this.boardOptions.foodRandomness || 10) + 5)),
          water: random() < chanceForWater
        }
        // Add tile to board
        this.rows[rowIndex][colIndex] = new Tile(pos, this.tileOptions.size, meta)
      })
    })
  }

  getTileAtPos(x, y) {
    if (!this.rows) return null
    let row = this.rows[Math.floor(y / this.tileOptions.size)]
    if (!row) return null
    return row[Math.floor(x / this.tileOptions.size)] || null
  }

  getNeighbourMeta (xIndex, yIndex) {
    let neighbourMeta = {
      water: 0,
      food: undefined,
      neighbourCount: 0
    }
    let addMeta = tile => {
      if (tile) {
        neighbourMeta.neighbourCount++
        if (tile.meta.water) {
          neighbourMeta.water++
        } else {
          neighbourMeta.food += tile.meta.food
        }
      }
    }
    if (yIndex > 0 && this.rows[yIndex - 1]) {
      addMeta(this.rows[yIndex - 1][xIndex - 1])
      addMeta(this.rows[yIndex - 1][xIndex])
      addMeta(this.rows[yIndex - 1][xIndex + 1])
    }
    if (this.rows[yIndex]) {
      addMeta(this.rows[yIndex][xIndex - 1])
      addMeta(this.rows[yIndex][xIndex + 1])
    }
    if (yIndex < this.tileOptions.rows && this.rows[yIndex + 1]) {
      addMeta(this.rows[yIndex + 1][xIndex - 1])
      addMeta(this.rows[yIndex + 1][xIndex])
      addMeta(this.rows[yIndex + 1][xIndex + 1])
    }
    neighbourMeta.food = neighbourMeta.food > 0 && neighbourMeta.neighbourCount > 0 ? neighbourMeta.food / neighbourMeta.neighbourCount : 0
    return neighbourMeta
  }

  draw () {
    this.rows.forEach(row => {
      row.forEach(tile => {
        tile.draw()
      })
    })
  }

  // Generate JS-object with all information to replicate
  createJsObject () {
    let o = {
      tileOptions: this.tileOptions,
      boardOptions: this.boardOptions
    }
    o.rows = this.rows.map(tiles => {
      return tiles.map(tile => tile.createJsObject())
    })
    return o
  }

  // Replicate from JS-object
  static fromJsObject (o) {
    Object.requiresProperties(o, [
      { key: 'tileOptions', type: 'object' },
      { key: 'boardOptions', type: 'object' },
      { key: 'rows', type: 'array' }
    ])
    let newBoard = new this(o.tileOptions, o.boardOptions, false)
    newBoard.rows = o.rows.map(tiles => {
      return tiles.map(tile => Tile.fromJsObject(tile))
    })
    return newBoard
  }
}