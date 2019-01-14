import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'



ReactDOM.render(<div id="app" />, document.body);
const app = document.getElementById("app");

function rerender(){
	ReactDOM.render(<Main />, app);
}

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
				INIT
			</div>
		)
	}
}
rerender();
