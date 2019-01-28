import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'
import {TreeComponent} from '../common/components/tree-component'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'
import {getFromMappedRepByid} from '../../utils/import-utils'
import {fillLinesForFuncflows} from '../../services/funcflow-percents'

const fontSizeDefaultPt = 11
const pivotLines = 20
const percentsLength = 400

//props: scenarioid
export class FuncFlows extends React.Component {
	constructor(props){
		super(props);
		this.state = {isEdit:false, sizing:true}
		this.compref = React.createRef();
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
	var fontSize = fontSizeDefaultPt
	var funcflownameSplitted = null
	if(node.functionid!=null){
		const component = getComponentByFunctionid(node.functionid)
		const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), node.functionid)
		funcflownameSplitted = [component.title, func.title, func.startLine]
		if(func.lines!=null && func.lines>0){
			funcflownameSplitted.push(func.lines)
			if(reactcomp.state.sizing){
				fontSize = calculateFontSize(func.lines)
			}
		}
	} else {
		//funcflowname = node.title
	}
	const fontSizeTags = fontSize>11?(fontSize-3):fontSize
	return <div style={{borderLeft: '1px solid lightgrey', paddingLeft:'3px', fontSize:fontSize+'pt'}}>
						<a href="#" onClick={()=>{node.hideChildren = !node.hideChildren; reactcomp.setState({})}}>{node.hideChildren?'+':'-'} </a>
	 					<div style={{display:'inline-block'}}>{funcNameUI(funcflownameSplitted)}</div>
						<a href="#" onClick={()=>fireEvent('funcflow-modal', 'open', [node])}> (edit) </a>
						<a href='#' onClick={()=>fireEvent('funcflow-modal', 'open', [{desc:'', parentid: node.id, scenarioid:scenarioid}])}>+</a>
						<span style={{color:'LightSeaGreen', paddingLeft:'3px', fontSize:(fontSizeTags+'pt')}}>{node.tags}</span>
						{getPercentsLineUI(node, percents100)}
	 			</div>
}

//<a href="#" onClick={()=>fireEvent('funcflow-modal', 'open', [node])}>{funcNameUI(funcflownameSplitted)}</a>

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
						<span class='funcflow-comp funcflow-cfl' onClick={(e)=>copyToClipboard(funcflownameSplitted[0], e)}>{funcflownameSplitted[0]}.</span>
						<span class='funcflow-func funcflow-cfl' onClick={(e)=>copyToClipboard(funcflownameSplitted[1], e)}>{funcflownameSplitted[1]}</span>
						<span class='funcflow-startline funcflow-cfl' onClick={(e)=>copyToClipboard(funcflownameSplitted[2], e)}>:{funcflownameSplitted[2]}</span>
						{funcflownameSplitted[3]!=null?<span class='funcflow-lines funcflow-cfl' onClick={(e)=>copyToClipboard(funcflownameSplitted[3], e)}>|{funcflownameSplitted[3]}</span>:null}
					</div>
}

const copyToClipboard = (text) => {
	var textField = document.createElement('textarea')
	textField.innerText = text
	document.body.appendChild(textField)
	textField.select()
	document.execCommand('copy')
	textField.remove()
	// var range = document.createRange();
	// range.selectNodeContents(e.target);
	// console.log(range)
	// var sel = window.getSelection();
	// sel.removeAllRanges();
	// sel.addRange(range);
};

const getPercentsLineUI = function(node, percents100){
	const allLinesLength = percentsLength * (node.allLines/percents100)
	const nativeLinesLength = percentsLength * (node.nativelines/percents100)
	const sublinesLength = percentsLength * (node.sublines/percents100)
	const offsetPx = node.offset>0? percentsLength * (node.offset/percents100):0

	return  <div style={{width:(percentsLength+2)+'px', height:'4px', border:'1px solid lightgrey' }}>
								<div style={{backgroundColor: 'BlueViolet', width:nativeLinesLength+'px', marginLeft:offsetPx+'px', float:'left', height:'100%'}}></div>
								<div style={{backgroundColor: 'Fuchsia', width:sublinesLength+'px', float:'left', height:'100%'}}></div>
							</div>
}

const getComponentByFunctionid = function(functionid){
  const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), functionid)
  return getFromMappedRepByid(viewStateVal('components-rep', 'components'), func.componentid)
}
