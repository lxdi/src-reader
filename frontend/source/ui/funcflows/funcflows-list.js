import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'
import {TreeComponent} from '../common/components/tree-component'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'
import {getFromMappedRepByid} from '../../utils/import-utils'
import {fillLinesForFuncflows} from '../../services/funcflow-percents'

const fontSizeDefaultPt = 11
const pivotLines = 20
const percentsLength = 300

//props: scenarioid
export class FuncFlows extends React.Component {
	constructor(props){
		super(props);
		this.state = {isEdit:false, sizing:true}
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
					<div style={buttonStyle}>
						<Button onClick={()=>this.setState({sizing: !this.state.sizing})} bsSize="xs"> Sizing: {this.state.sizing?'on': 'off'} </Button>
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
			var percents100 =  fillLinesForFuncflows(reactcomp.props.scenarioid)
			return <TreeComponent isEdit={reactcomp.state.isEdit}
														nodes={viewStateVal('funcflows-rep', 'funcflows')[reactcomp.props.scenarioid]}
														viewCallback={(node)=>nodeView(reactcomp, node, reactcomp.props.scenarioid, percents100)}
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

const nodeView = function(reactcomp, node, scenarioid, percents100){
	console.log(percents100, node, node.sublines)
	var fontSize = fontSizeDefaultPt
	var funcflownameSplitted = null
	if(node.functionid!=null){
		const component = getComponentByFunctionid(node.functionid)
		const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), node.functionid)
		funcflownameSplitted = [component.title, func.title]
		if(func.lines!=null && func.lines>0){
			funcflownameSplitted.push(func.lines)
			if(reactcomp.state.sizing){
				fontSize = calculateFontSize(func.lines)
			}
		}
	} else {
		//funcflowname = node.title
	}
	const percentsPartialLength = percentsLength * (node.sublines/percents100)
	const fontSizeTags = fontSize>11?(fontSize-3):fontSize
	return <div style={{borderLeft: '1px solid lightgrey', paddingLeft:'3px', fontSize:fontSize+'pt'}}>
						<a href="#" onClick={()=>{node.hideChildren = !node.hideChildren; reactcomp.setState({})}}>{node.hideChildren?'+':'-'} </a>
	 					<a href="#" onClick={()=>fireEvent('funcflow-modal', 'open', [node])}>{funcNameUI(funcflownameSplitted)}</a>
						<a href='#' onClick={()=>fireEvent('funcflow-modal', 'open', [{desc:'', parentid: node.id, scenarioid:scenarioid}])}>+</a>
						<span style={{color:'LightSeaGreen', paddingLeft:'3px', fontSize:(fontSizeTags+'pt')}}>{node.tags}</span>

						<div style={{borderBottom:'1px solid lightgrey', width:percentsLength+'px'}}></div>
						<div style={{borderBottom:'1px solid coral', width:percentsPartialLength+'px'}}></div>
						<div style={{borderBottom:'1px solid lightgrey', width:percentsLength+'px'}}></div>
	 			</div>
}

const calculateFontSize = function(lines){
	if(lines<10){
		return fontSizeDefaultPt - 3
	}
	const dif = lines-pivotLines
	const ratio = dif/10
	return fontSizeDefaultPt + ratio
}

const funcNameUI = function(funcflownameSplitted){
	return <div style={{display:'inline-block'}}>
						<span style={{color:'green '}}>{funcflownameSplitted[0]}.</span>
						<span style={{color:'BlueViolet '}}>{funcflownameSplitted[1]}</span>
						{funcflownameSplitted[2]!=null?<span style={{color:'LightCoral '}}>:{funcflownameSplitted[2]}</span>:null}
					</div>
}

const getComponentByFunctionid = function(functionid){
  const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), functionid)
  return getFromMappedRepByid(viewStateVal('components-rep', 'components'), func.componentid)
}
