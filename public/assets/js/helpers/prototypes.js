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
        // Check array specifically
        if (prop.type === 'array' && !Array.isArray(this[prop.key])) throw new Error(`Property ${prop.key} must be of type ${prop.type}`)
        // Check other types
        if (typeof this[prop.key] !== prop.type && prop.type !== 'array') throw new Error(`Property ${prop.key} must be of type ${prop.type}`)
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

// LZW-compress a string
String.prototype.lzw_encode = function () {
  var dict = {};
  var data = (this + '').split('');
  var out = [];
  var currChar;
  var phrase = data[0];
  var code = 256;
  for (var i=1; i<data.length; i++) {
      currChar=data[i];
      if (dict[phrase + currChar] != null) {
          phrase += currChar;
      }
      else {
          out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
          dict[phrase + currChar] = code;
          code++;
          phrase=currChar;
      }
  }
  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  for (var i=0; i<out.length; i++) {
      out[i] = String.fromCharCode(out[i]);
  }
  return out.join('');
}

// Decompress an LZW-encoded string
String.prototype.lzw_decode = function () {
  var dict = {};
  var data = (this + '').split('');
  var currChar = data[0];
  var oldPhrase = currChar;
  var out = [currChar];
  var code = 256;
  var phrase;
  for (var i=1; i<data.length; i++) {
      var currCode = data[i].charCodeAt(0);
      if (currCode < 256) {
          phrase = data[i];
      }
      else {
         phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
      }
      out.push(phrase);
      currChar = phrase.charAt(0);
      dict[code] = oldPhrase + currChar;
      code++;
      oldPhrase = phrase;
  }
  return out.join('');
}
