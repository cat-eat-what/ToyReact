class ElementWrapper extends wrapper {
	constructor(type) {
		super(type);
		this.root = document.createElement(type);
	}
	setAttribute(name, value) {
		this.root.setAttribute(name, value)
	}
	appendChild(vchild) {
        vchild.mountTo(this.root);
	}
	mountTo(parent) {
		parent.appendChild(this.root);
	}
}

class TextWrapper extends wrapper {
	constructor(content) {
		super(content);
		this.root = document.createTextNode(content);
	}
	mountTo(parent) {
		parent.appendChild(this.root);
	}
}

class Component {
	constructor() {
		this.children = [];
	}
	setAttribute(name, value) {
		this[name] = value;
	}
	appendChild(vchild) {
		this.children.push(vchild);
	}
	mountTo(parent) {
		let vdom = this.render();
		vdom.mountTo(parent);
	}
}

const ToyReact = {
	createElement(type, attributes, ...children) {
		let element;
		if (typeof type === 'string') {
			element = new ElementWrapper(type);
		} else {
			element = new type; //新的组件  new MyComponent
		}
		for (let name in attributes) {
			element.setAttribute(name, attributes[name]);
		}
		const insertChildren = function(children) {
			for (let child of children) {
				if (typeof child === 'object' && child instanceof Array) {
					insertChildren(child);
				} else {
					if (!(child instanceof Component) &&
						!(child instanceof ElementWrapper) &&
						!(child instanceof TextWrapper)) {
						child = String(child);
					}
					if (typeof child === 'string') {
						child = new TextWrapper(child);
					}
					element.appendChild(child);
				}
			}
		}
		insertChildren(children);
		return element;
	},
	render(vdom, element) {
		vdom.mountTo(element);
	}
}

export {
	ToyReact,
	Component
}