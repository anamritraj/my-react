/**
 *
 * @param {element} element The new element to be created
 * @param {*} parent parent DOM element to which the element will be appended
 *
 * If an element has only text then its type will be TEXT_ELEMENT and it will call
 * a separate function createTextNode which will simply set the node value.
 */

export function render(element, parent) {
  // Get the props and type from element object
  const { type, props } = element;

  // Check if it is a text element
  const isTextElement = type === "TEXT_ELEMENT";

  // Create a new dom element
  const dom = !isTextElement
    ? document.createElement(type)
    : document.createTextNode(props.nodeValue);

  // Filter for eventListeners in the props
  const isListener = name => name.startsWith("on");

  // Add eventListeners to the dom element
  Object.keys(props)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  const isAttribute = name => !isAttribute && name !== "children";

  Object.keys(props)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = props[name];
    });

  // Check if there are any childrens of the given element
  const childElements = props.children || [];

  // render those childrens recursively first
  childElements.forEach(el => render(el, dom));

  // finally append the element to the parent element
  parent.appendChild(dom);
}
