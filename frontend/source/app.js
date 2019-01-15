import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

import {TreeComponent} from './ui/components/tree-component'
import {FunctionModal} from './ui/function-modal'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from './utils/eventor'

import './data/functions-rep'

ReactDOM.render(<div id="app" />, document.body);
const app = document.getElementById("app");

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		registerEvent('functions-ui', 'update', (stateSetter)=>this.setState({}))
		registerReaction('functions-ui', 'functions-rep', 'func-added', (stateSetter)=>this.setState({}))
	}

	render() {

		// const nodes = []
		// nodes[1] = {id:1, nextid:2, title:'node1'}
		// nodes[2] = {id:2, nextid:3, title:'node2'}
		// nodes[3] = {id:3, title:'node3'}
		//
		// nodes[4] = {id:4, nextid:5, parentid:1, title: 'node4'}
		// nodes[5] = {id:5, parentid:1, title: 'node5'}
		console.log(viewStateVal('functions-rep', 'nodes'))
		return (
			<div style={{margin:'5px', border:'1px solid lightgrey'}}>
				<FunctionModal/>
				<div style={{padding:'5px'}}>
					<Button onClick={()=>fireEvent('function-modal', 'open', [{title:''}])}> + Add function </Button>
				</div>
				<div style={{padding:'5px'}}>
					<TreeComponent nodes={viewStateVal('functions-rep', 'nodes')} viewCallback={(node)=>nodeView(node)} />
				</div>
			</div>
		)
	}
}

const nodeView = function(node){
	return <div>
	 					<a href="#" >{node.title} </a>
	 			</div>
}

ReactDOM.render(<Main />, app);
