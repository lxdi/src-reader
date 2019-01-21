import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'
import {TreeComponent} from '../components/tree-component'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'

//props: scenarioid
export class FuncFlows extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		// registerEvent('funcflows-ui_'+this.props.scenarioid, 'update', (stateSetter)=>this.setState({}))
		// registerReaction('funcflows-ui_'+this.props.scenarioid, 'funcflows-rep', 'created-funcflow', (stateSetter)=>this.setState({}))
		const listName = 'funcflows-list-ui-'+this.props.scenarioid
		registerReaction(listName, 'funcflows-rep', ['funcflows-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'funcflow-modal', ['close'], (stateSetter)=>this.setState({}))
	}

	render() {
		return (
			<div style={{margin:'5px', border:'1px solid lightgrey'}}>
				<div style={{padding:'5px'}}>
					<Button onClick={()=>fireEvent('funcflow-modal', 'open', [{title:'', scenarioid: this.props.scenarioid}])}> + Add FuncFlow </Button>
				</div>
				<div style={{padding:'5px'}}>
					{getFuncflowsTree(this)}
				</div>
			</div>
		)
	}
}

const getFuncflowsTree = function(reactcomp){
	if(viewStateVal('funcflows-rep', 'funcflows')!=null){
			return <TreeComponent nodes={viewStateVal('funcflows-rep', 'funcflows')[reactcomp.props.scenarioid]} viewCallback={(node)=>nodeView(node)} />
	} else {
		return 'Loading...'
	}
}

const nodeView = function(node){
	return <div>
	 					<a href="#" >{node.title} </a>
						<a href='#' onClick={()=>fireEvent('function-modal', 'open', [{title:'', parentid: node.id}])}>+</a>
	 			</div>
}
