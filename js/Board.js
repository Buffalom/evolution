class Board {
  constructor (gridSizeHor, options) {
    this.options = options || {}
    let tileSize = width / gridSizeHor
    this.gridSizeHor = gridSizeHor
    this.gridSizeVer = Math.floor(height / tileSize)

    // Initializing all tiles
    this.tiles = []
    for (let y = 0; y < this.gridSizeVer; y++) {
      this.tiles[y] = []
      for (let x = 0; x < this.gridSizeHor; x++) {
        let pos = createVector(tileSize * x, tileSize * y)
        // Reading neighbour meta
        let neighbourMeta = this.getNeighbourMeta(x, y)
        // Generating meta based on meta of neighbours
        let waterChance = map(neighbourMeta.water, 0, neighbourMeta.neighbourCount, this.options.waterAmount || 0.05, this.options.waterSize || 0.9)
        let meta = {
          water: Math.random() < waterChance,
          food: Math.floor((Math.random() * 101 * (this.options.foodRandomness || 4) + (neighbourMeta.food)) / ((this.options.foodRandomness || 4) + 1))
        }
        let tile = new Tile(tileSize, pos.x, pos.y, meta)
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
    if (yIndex < this.gridSizeVer && this.tiles[yIndex + 1]) {
      addMeta(this.tiles[yIndex + 1][xIndex - 1])
      addMeta(this.tiles[yIndex + 1][xIndex])
      addMeta(this.tiles[yIndex + 1][xIndex + 1])
    }
    neighbourMeta.food = neighbourMeta.food > 0 && neighbourMeta.neighbourCount > 0 ? neighbourMeta.food / neighbourMeta.neighbourCount : 0
    return neighbourMeta
  }
}