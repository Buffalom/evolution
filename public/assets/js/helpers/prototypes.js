// Checks if required properties of object are provided
Object.prototype.requiresProperties = function (requiredProperties) {
  if (!requiredProperties) throw new Error('Please provide an array of required properties')
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
  if (requiredProperties) object.requiresProperties(requiredProperties)
}

// Encode string to hex
String.prototype.hexEncode = function(){
  var hex, i;
  var result = "";
  for (i=0; i<this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ("000"+hex).slice(-4);
  }
  return result
}

// Decode hex to string
String.prototype.hexDecode = function(){
  var j;
  var hexes = this.match(/.{1,4}/g) || [];
  var back = "";
  for(j = 0; j<hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }
  return back;
}
