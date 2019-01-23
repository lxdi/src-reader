import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'
import {TreeComponent} from '../common/components/tree-component'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'
import {getFromMappedRepByid} from '../../utils/import-utils'

//props: scenarioid
export class FuncFlows extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		const listName = 'funcflows-list-ui-'+this.props.scenarioid
		registerReaction(listName, 'funcflows-rep', ['funcflows-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'components-rep', ['components-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'functions-rep', ['functions-received'], (stateSetter)=>{this.setState({})})
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
	if(checkForRepositoriesLoaded()){
			return <TreeComponent nodes={viewStateVal('funcflows-rep', 'funcflows')[reactcomp.props.scenarioid]} viewCallback={(node)=>nodeView(node, reactcomp.props.scenarioid)} />
	} else {
		return 'Loading...'
	}
}

const checkForRepositoriesLoaded = function(){
	if(viewStateVal('funcflows-rep', 'funcflows')!=null && viewStateVal('components-rep', 'components')!=null && viewStateVal('functions-rep', 'functions')!=null){
		return true
	} else {
		return false
	}
}

const nodeView = function(node, scenarioid){
	var funcflowname = null
	if(node.functionid!=null){
		const component = getComponentByFunctionid(node.functionid)
		const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), component.id)
		funcflowname = component.title+'.'+func.title
	} else {
		funcflowname = node.title
	}
	return <div>
	 					<a href="#" onClick={()=>fireEvent('funcflow-modal', 'open', [node])}>{funcflowname} </a>
						<a href='#' onClick={()=>fireEvent('funcflow-modal', 'open', [{title:'', parentid: node.id, scenarioid:scenarioid}])}>+</a>
	 			</div>
}

const getComponentByFunctionid = function(functionid){
  const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), functionid)
  return getFromMappedRepByid(viewStateVal('components-rep', 'components'), func.componentid)
}
