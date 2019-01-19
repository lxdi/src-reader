import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

import {TreeComponent} from './ui/components/tree-component'
import {FunctionModal} from './ui/function-modal'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from './utils/eventor'

import './data/common-rep'
import './data/funcflows-rep'
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
		return (
			<div style={{margin:'5px', border:'1px solid lightgrey'}}>
				<FunctionModal/>
				<div style={{padding:'5px'}}>
					<Button onClick={()=>fireEvent('function-modal', 'open', [{title:''}])}> + Add function </Button>
				</div>
				<div style={{padding:'5px'}}>
					<TreeComponent nodes={viewStateVal('functions-rep', 'funcs')} viewCallback={(node)=>nodeView(node)} />
				</div>
			</div>
		)
	}
}

const nodeView = function(node){
	return <div>
	 					<a href="#" >{node.title} </a>
						<a href='#' onClick={()=>fireEvent('function-modal', 'open', [{title:'', parentid: node.id}])}>+</a>
	 			</div>
}

ReactDOM.render(<Main />, app);
