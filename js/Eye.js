class Eye {
  constructor (x, y) {
    this.relPos = createVector(x, y)
  }

  hueSeen (animalPos) {
    let absoluteEyePos = this.relPos.add(animalPos)
    let rgba = get(absoluteEyePos.x, absoluteEyePos.y)
    let seenColor = color(rgba[0], rgba[1], rgba[2], rgba[3])
    return hue(seenColor)
  }
}