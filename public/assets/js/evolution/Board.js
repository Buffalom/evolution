class Board {
  constructor (tileOptions, worldOptions = {}) {
    Object.requiresProperties(tileOptions, [
      { key: 'size', type: 'number' },
      { key: 'rows', type: 'number' },
      { key: 'cols', type: 'number' }
    ])
    this.tileOptions = tileOptions
    this.worldOptions = worldOptions
    this.initTiles()
  }

  initTiles () {
    // Initialize rows
    this.rows = new Array(this.tileOptions.rows).fill(undefined)
    this.rows.forEach((row, rowIndex) => {
      // Initialize row with tiles
      this.rows[rowIndex] = new Array(this.tileOptions.cols).fill(undefined)
      this.rows[rowIndex].forEach((col, colIndex) => {
        // Calculate position vector
        let pos = createVector(this.tileOptions.size * colIndex, this.tileOptions.size * rowIndex)
        // Collect meta of surrounding tiles
        let neighbourMeta = this.getNeighbourMeta(colIndex, rowIndex)
        // Calculate chance of water based on neighbours
        let chanceForWater = map(neighbourMeta.water, 0, neighbourMeta.neighbourCount, this.worldOptions.waterAmount || 0.05, this.worldOptions.waterSize || 0.9)
        let meta = {
          // Calculate food based on neighbours and some randomness
          food: floor((random(101) * (this.worldOptions.foodRandomness || 4) + (neighbourMeta.food || 50)) / ((this.worldOptions.foodRandomness || 4) + 1)),
          water: random() < chanceForWater
        }
        // Add tile to board
        this.rows[rowIndex][colIndex] = new Tile(pos, this.tileOptions.size, meta)
      })
    })
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
    this.rows.forEach(tiles => {
      tiles.forEach(tile => {
        tile.draw()
      })
    })
  }

  // Generate JS-object with all information to replicate
  createJsObject () {
    // TODO: Generate JS-object with all information to replicate
  }

  // Replicate from JS-object
  static fromJsObject (object) {
    Object.requiresProperties(object)
    // TODO: Replicate from JS-object
  }
}