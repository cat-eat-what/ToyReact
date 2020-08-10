import {ToyReact, Component} from './ToyReact.js';


class MyComponent extends Component {
	render() {
		return <div>
			<span>hello</span>
			<span>world</span>
			<div>
				{{a:1,b:2}}
				{this.children}
			</div>
		</div>;
	}
	/* setAttribute(name, value) {
		this[name] = value;
	}
	mountTo(parent) {
		let vdom = this.render();
		vdom.mountTo(parent);
	} */
}

let a = <MyComponent name="a">
	<div>xxxx</div>
</MyComponent>;
/* let a = <div name="a" id="main">
	<span>Hello<a>xxxx</a></span>
	<span></span>
	<span></span>
</div> */

ToyReact.render(
	a,
	document.body
)
//document.body.appendChild(a);