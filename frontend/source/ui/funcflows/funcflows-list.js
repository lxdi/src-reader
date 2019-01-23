import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'
import {TreeComponent} from '../common/components/tree-component'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'

//props: scenarioid
export class FuncFlows extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		const listName = 'funcflows-list-ui-'+this.props.scenarioid
		registerReaction(listName, 'funcflows-rep', ['funcflows-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'funcflow-modal', ['close'], (stateSetter)=>this.setState({}))
	}

	render() {
		return (
			<div style={{margin:'5px'}}>
				<div style={{padding:'5px'}}>
					<Button onClick={()=>fireEvent('funcflow-modal', 'open', [{title:'', scenarioid: this.props.scenarioid}])} bsSize="xs"> + Add FuncFlow </Button>
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
			return <TreeComponent nodes={viewStateVal('funcflows-rep', 'funcflows')[reactcomp.props.scenarioid]} viewCallback={(node)=>nodeView(node, reactcomp.props.scenarioid)} />
	} else {
		return 'Loading...'
	}
}

const nodeView = function(node, scenarioid){
	return <div>
	 					<a href="#" onClick={()=>fireEvent('funcflow-modal', 'open', [node])}>{node.title} </a>
						<a href='#' onClick={()=>fireEvent('funcflow-modal', 'open', [{title:'', parentid: node.id, scenarioid:scenarioid}])}>+</a>
	 			</div>
}
