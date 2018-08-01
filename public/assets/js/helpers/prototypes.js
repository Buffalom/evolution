// Checks if required properties of object are provided
Object.prototype.requiresProperties = function (requiredProperties) {
  requiredProperties.forEach(prop => {
    if (typeof prop === 'string') {
      // Check existance
      if (!(prop in this)) throw new Error(`Property ${prop} is required`)
    } else if (typeof prop === 'object') {
      if (!('key' in prop)) throw new Error('A property key must be provided in required properties')
      // Check existance
      if (!(prop.key in this)) throw new Error(`Property ${prop.key} is required`)
      if ('type' in prop) {
        // Check type
        if (typeof this[prop.key] !== prop.type) throw new Error(`Property ${prop.key} must be of type ${prop.type}`)
        // Checks for numbers
        if (prop.type === 'number') {
          // Check minimum
          if ('min' in prop) {
            if (this[prop.key] < prop.min) throw new Error(`Property ${prop.key} must be more than ${prop.min}`)
          }
          // Check maximum
          if ('max' in prop) {
            if (this[prop.key] > prop.max) throw new Error(`Property ${prop.key} must be less than ${prop.max}`)
          }
        }
      }
    } else {
      throw new Error ('Required properties must be of type string or object')
    }
  })
}

// Checks if object is actually an object and then checks if required properties of object are provided
Object.requiresProperties = function (object, requiredProperties, optional = false) {
  if (!optional && typeof object !== 'object') throw new Error('Parameter is required and needs to be an object')
  object.requiresProperties(requiredProperties)
}