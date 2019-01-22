// We want to customize how our text nodes look as an object
const TEXT_ELEMENT = "TEXT_ELEMENT";

/**
 *
 * @param {string} type type of the tag
 * @param {object} config attributes of the tag
 * @param  {...any} args Rest of the arguments which includes the children of the given tag
 *
 * This is accroding to the JSX object spec which can be found here
 * http://facebook.github.io/jsx/
 *
 * Object returned by this function is passed to the render function
 * the render function then renders it to the dom.
 */
export function createElement(type, config, ...args) {
  // We want to create an object which can be understood by our custom render function.
  const props = Object.assign({}, config);
  // Check if the current element has any children
  const hasChildren = args.length > 0;
  // If it has any children then save them in one variable
  const allChildren = hasChildren ? [].concat(...args) : [];

  // Now first filter all the children which are null or are false,
  // since we dont need to pass them to render function
  // Then, check if the child is an Object, if it is add it to the prop.children property,
  // else create a custom object for textElements which can be understood by our render function
  props.children = allChildren
    .filter(child => {
      return child !== null && child !== false;
    })
    .map(child => {
      return child instanceof Object ? child : createTextElement(child);
    });
  // This object will be passed to the render function.
  return { type, props };
}

// Creates a custom text element which can be understood by the render function
function createTextElement(value) {
  return {
    type: TEXT_ELEMENT,
    props: {
      nodeValue: value
    }
  };
}
