/**
 * @param {string}   attribute      Attribute value. Dots allowed.
 * @returns {function(Object): *}
 */
function getPropertyKey(obj, property) {
  const parts = getPropertyParts(property);
  let item = obj;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (Object.hasOwn(item, part)) {
      item = item[part];
    } else {
      return undefined;
    }
  }

  return item;
}

exports.getPropertyKey = getPropertyKey;

/**
 * @param {string|number} attr
 * @returns {(string|number)[]}
 * @private
 */
function getPropertyParts(attr) {
  if (!attr) {
    return [];
  }

  if (typeof attr === "string") {
    return attr.split(".");
  }

  return [attr];
}

function toArray(val) {
  if (val === null) {
    return [];
  }

  if (Array.isArray(val)) {
    return val;
  }

  return [val];
}

exports.toArray = toArray;
