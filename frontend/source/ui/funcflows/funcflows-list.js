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
		this.state = {isEdit:false}
		const listName = 'funcflows-list-ui-'+this.props.scenarioid
		registerReaction(listName, 'funcflows-rep', ['funcflows-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'components-rep', ['components-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'functions-rep', ['functions-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'funcflow-modal', ['close'], (stateSetter)=>this.setState({}))
	}

	render() {
		const buttonStyle = {padding:'5px', display:'inline-block'}
		return (
			<div style={{margin:'5px'}}>
				<div>
					<div style={buttonStyle}>
						<Button onClick={()=>fireEvent('funcflow-modal', 'open', [{desc:'', scenarioid: this.props.scenarioid}])} bsSize="xs"> + Add FuncFlow </Button>
					</div>
					<div style={buttonStyle}>
						<Button onClick={()=>this.setState({isEdit: !this.state.isEdit})} bsSize="xs"> Edit/view </Button>
					</div>
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
			return <TreeComponent isEdit={reactcomp.state.isEdit}
														nodes={viewStateVal('funcflows-rep', 'funcflows')[reactcomp.props.scenarioid]}
														viewCallback={(node)=>nodeView(reactcomp, node, reactcomp.props.scenarioid)}
														onDropCallback = {(alteredList)=>{fireEvent('funcflows-rep', 'update-list-funcflow', [alteredList])}} />
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

const nodeView = function(reactcomp, node, scenarioid){
	var funcflowname = null
	if(node.functionid!=null){
		const component = getComponentByFunctionid(node.functionid)
		const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), node.functionid)
		funcflowname = component.title+'.'+func.title
	} else {
		funcflowname = node.title
	}
	return <div style={{borderLeft:'1px solid lightgrey', paddingLeft:'3px'}}>
						<a href="#" onClick={()=>{node.hideChildren = !node.hideChildren; reactcomp.setState({})}}>{node.hideChildren?'+':'-'} </a>
	 					<a href="#" onClick={()=>fireEvent('funcflow-modal', 'open', [node])}>{funcflowname} </a>
						<a href='#' onClick={()=>fireEvent('funcflow-modal', 'open', [{desc:'', parentid: node.id, scenarioid:scenarioid}])}>+</a>
						<span style={{color:'green', paddingLeft:'3px'}}>{node.tags}</span>
	 			</div>
}

const getComponentByFunctionid = function(functionid){
  const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), functionid)
  return getFromMappedRepByid(viewStateVal('components-rep', 'components'), func.componentid)
}
