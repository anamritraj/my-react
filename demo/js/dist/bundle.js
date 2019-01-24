"use strict";

/** @jsx MyReact.createElement */
var MyReact = getMyReact();
var TEXT_ELEMENT = "TEXT_ELEMENT";
var myElement = MyReact.createElement("div", null, MyReact.createElement("ul", null, MyReact.createElement("li", null, "Implement React render"), MyReact.createElement("li", null, "Implement React component"), MyReact.createElement("li", null, "Implement React fiber"), MyReact.createElement("li", null, "Replace original React"), MyReact.createElement("li", null, "Conquer the world!")));
MyReact.render(myElement, document.getElementById("my-react-app")); // Probably need to build everything into a single file.
// For now just adding the source code of MyReact here since require() is not supported ny browsers

function getMyReact() {
  function render(element, parent) {
    // Get the props and type from element object
    var type = element.type,
        props = element.props; // Check if it is a text element

    var isTextElement = type === "TEXT_ELEMENT"; // Create a new dom element

    var dom = !isTextElement ? document.createElement(type) : document.createTextNode(props.nodeValue); // Filter for eventListeners in the props

    var isListener = function isListener(name) {
      return name.startsWith("on");
    }; // Add eventListeners to the dom element


    Object.keys(props).filter(isListener).forEach(function (name) {
      var eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

    var isAttribute = function isAttribute(name) {
      return !isAttribute && name !== "children";
    };

    Object.keys(props).filter(isAttribute).forEach(function (name) {
      dom[name] = props[name];
    }); // Check if there are any childrens of the given element

    var childElements = props.children || []; // render those childrens recursively first

    childElements.forEach(function (el) {
      return render(el, dom);
    }); // finally append the element to the parent element

    parent.appendChild(dom);
  }

  function createElement(type, config) {
    var _ref;

    var props = Object.assign({}, config);

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var hasChildren = args.length > 0;
    var allChildren = hasChildren ? (_ref = []).concat.apply(_ref, args) : [];
    props.children = allChildren.filter(function (child) {
      return child !== null && child !== false;
    }).map(function (child) {
      return child instanceof Object ? child : createTextElement(child);
    });
    return {
      type: type,
      props: props
    };
  }

  function createTextElement(value) {
    return {
      type: TEXT_ELEMENT,
      props: {
        nodeValue: value
      }
    };
  }

  return {
    render: render,
    createElement: createElement
  };
}
