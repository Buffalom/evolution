class Board {
  constructor (rows, cols, tileSize, options) {
    // Possible options: waterAmount, waterSize, foodRandomness
    this.options = options || {}
    this.tileSize = tileSize
    this.cols = cols
    this.rows = rows

    // Initializing all tiles
    this.tiles = []
    for (let y = 0; y < this.rows; y++) {
      this.tiles[y] = []
      for (let x = 0; x < this.cols; x++) {
        let pos = createVector(this.tileSize * x, this.tileSize * y)
        // Reading neighbour meta
        let neighbourMeta = this.getNeighbourMeta(x, y)
        // Generating meta based on meta of neighbours
        let waterChance = map(neighbourMeta.water, 0, neighbourMeta.neighbourCount, this.options.waterAmount || 0.05, this.options.waterSize || 0.9)
        let meta = {
          water: random() < waterChance,
          food: Math.floor((random(101) * (this.options.foodRandomness || 4) + (neighbourMeta.food)) / ((this.options.foodRandomness || 4) + 1))
        }
        let tile = new Tile(this.tileSize, pos.x, pos.y, meta)
        this.tiles[y][x] = tile
      }
    }
  }

  draw () {
    this.tiles.forEach((row, rowIndex) => {
      row.forEach((tile, tileIndex) => {
        tile.draw()
      })
    })
  }

  getNeighbourMeta (xIndex, yIndex) {
    let neighbourMeta = {
      water: 0,
      food: 0,
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
    if (yIndex > 0 && this.tiles[yIndex - 1]) {
      addMeta(this.tiles[yIndex - 1][xIndex - 1])
      addMeta(this.tiles[yIndex - 1][xIndex])
      addMeta(this.tiles[yIndex - 1][xIndex + 1])
    }
    if (this.tiles[yIndex]) {
      addMeta(this.tiles[yIndex][xIndex - 1])
      addMeta(this.tiles[yIndex][xIndex + 1])
    }
    if (yIndex < this.rows && this.tiles[yIndex + 1]) {
      addMeta(this.tiles[yIndex + 1][xIndex - 1])
      addMeta(this.tiles[yIndex + 1][xIndex])
      addMeta(this.tiles[yIndex + 1][xIndex + 1])
    }
    neighbourMeta.food = neighbourMeta.food > 0 && neighbourMeta.neighbourCount > 0 ? neighbourMeta.food / neighbourMeta.neighbourCount : 0
    return neighbourMeta
  }

  getTileAtPos (pos) {
    if (!this.tiles) return null
    let row = this.tiles[Math.floor(pos.y / this.tileSize)]
    if (!row) return null
    return row[Math.floor(pos.x / this.tileSize)] || null
  }
}