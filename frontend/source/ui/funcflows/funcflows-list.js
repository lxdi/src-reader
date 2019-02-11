import React from 'react';
import ReactDOM from 'react-dom';
import {Button, OverlayTrigger, Tooltip, DropdownButton, MenuItem, ButtonGroup} from 'react-bootstrap'
import {TreeComponent} from '../common/components/tree-component'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'
import {getFromMappedRepByid} from '../../utils/import-utils'
import {fillLinesForFuncflows} from '../../services/funcflow-percents'

const fontSizeDefaultPt = 11
const pivotLines = 20
const percentsLength = 700

//props: scenario
export class FuncFlows extends React.Component {
	constructor(props){
		super(props);
		this.state = {isEdit:false, transitional:false, relevanceFilter:'Low'}
		this.compref = React.createRef();
		const listName = 'funcflows-list-ui-'+this.props.scenario.id
		registerReaction(listName, 'funcflows-rep', ['funcflows-received', 'children-hidden-shown'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'components-rep', ['components-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'functions-rep', ['functions-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'funcflow-modal', ['close'], (stateSetter)=>this.setState({}))
		registerReaction(listName, 'scenarios-rep', 'sizing-switched', (stateSetter)=>this.setState({}))
	}

	render() {
		const buttonStyle = {padding:'5px', display:'inline-block', verticalAlign:'top'}
		return (
			<div style={{margin:'5px'}}>
				<div>
					<div style={buttonStyle}>
						<Button onClick={()=>fireEvent('funcflow-modal', 'open', [{scenarioid: this.props.scenario.id}])} bsSize="xs"> + Add FuncFlow </Button>
					</div>
					<div style={buttonStyle}>
						<Button onClick={()=>this.setState({isEdit: !this.state.isEdit})} bsSize="xs"> Edit/view </Button>
					</div>
					<div style={buttonStyle}>
						<Button onClick={()=>fireEvent('scenarios-rep', 'switch-sizing', [this.props.scenario])} bsSize="xs"> Sizing: {this.props.scenario.sizing?'on': 'off'} </Button>
					</div>
					<div style={buttonStyle}>
						<ButtonGroup>
				                  <DropdownButton title={this.state.relevanceFilter} bsSize="xs" onSelect={(newval, e)=>this.setState({relevanceFilter:newval})}>
														<MenuItem eventKey={"High"}>High</MenuItem>
				                    <MenuItem eventKey={"Normal"}>High|Normal</MenuItem>
														<MenuItem eventKey={"Low"}>High|Normal|Low</MenuItem>
														<MenuItem eventKey={"Transitional"}>High|Normal|Low|Transitional</MenuItem>
				                  </DropdownButton>
				      </ButtonGroup>
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
			var percents100 =  fillLinesForFuncflows(reactcomp.props.scenario.id)
			return <TreeComponent isEdit={reactcomp.state.isEdit}
														nodes={viewStateVal('funcflows-rep', 'funcflows')[reactcomp.props.scenario.id]}
														viewCallback={(node, level, cache)=>nodeView(reactcomp, node, reactcomp.props.scenario.id, percents100, cache)}
														onDropCallback = {(alteredList)=>{fireEvent('funcflows-rep', 'reposition-list', [alteredList])}}
														childrenStyle={{borderLeft:'1px dotted grey'}}
														shiftpx={10} />
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

const nodeView = function(reactcomp, node, scenarioid, percents100, cache){
	if(node.todoMark==true){
		return <div style={{borderLeft: '1px dotted grey'}}>
							<div style={{fontSize:'13pt', color:'red', display:'inline-block'}}>TODO</div>
							<div style={{display:'inline-block'}}><a href="#" onClick={()=>fireEvent('funcflow-modal', 'open', [node])}> (edit) </a></div>
						</div>
	}
	var fontSize = fontSizeDefaultPt
	var component = null
	var func = null
	if(node.functionid!=null){
		component = getComponentByFunctionid(node.functionid)
		func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), node.functionid)
		if(func.lines!=null && func.lines>0){
			if(reactcomp.props.scenario.sizing){
				fontSize = calculateFontSize(func.lines)
			}
		}
	} else {
		//funcflowname = node.title
	}
	const fontSizeTags = fontSize>11?(fontSize-3):fontSize
	if(filterByRelevance(reactcomp, node)){
		return <div style={{borderLeft: '2px solid '+getLeftBorderColor(node.relevance), paddingLeft:'3px', fontSize:fontSize+'pt', paddingTop:'3px'}}>
							{hideShowChildrenHandlerUI(node, cache)}
							<div style={{display:'inline-block'}}>{funcNameUI(component, func)}</div>
							<a href="#" onClick={()=>fireEvent('funcflow-modal', 'open', [node])}> (edit) </a>
							<a href='#' onClick={()=>fireEvent('funcflow-modal', 'open', [{parentid: node.id, scenarioid:scenarioid}])}>+</a>
							{node.tags!=null && node.tags!=''? <span style={{color:'LightSeaGreen', paddingLeft:'3px', fontSize:(fontSizeTags+'pt')}}>{node.tags}</span>:null}
							{getPercentsLineUI(node, percents100)}
					</div>
	} else {
			return <div style={{borderLeft: '2px solid ' +getLeftBorderColor(node.relevance), paddingLeft:'3px', paddingTop:'3px'}}>
								{getPercentsLineUI(node, percents100)}
						</div>
	}
}

const filterByRelevance = function(reactcomp, node){
	const filterNum = relevanceToNumber(reactcomp.state.relevanceFilter)
	const nodenum = relevanceToNumber(node.relevance)
	if(nodenum>=filterNum){
		return true
	} else {
		false
	}
}

const relevanceToNumber = function(relevance){
	if(relevance=='Transitional') return 0
	if(relevance=='Low') return 1
	if(relevance=='Normal') return 2
	if(relevance=='High') return 3
}

const hideShowChildrenHandlerUI = function(node, cache){
		return 	<a href="#" onClick={()=>{fireEvent('funcflows-rep', 'hide-show-children', [node])}}
										onMouseEnter={()=>fireEvent('overlay-info', 'show', [overlayContent(node, cache)])}
										onMouseOver={(e)=>fireEvent('overlay-info', 'update-pos', [e.nativeEvent.clientX+15, e.nativeEvent.clientY-10])}
										onMouseLeave={()=>fireEvent('overlay-info', 'hide')}>{node.hideChildren?'+':'-'} </a>
}

const overlayContent = function(node, cache){
		const result = []
		gatherTags(result, node, cache)
		const resultUI = []
		for(var i in result){
			resultUI.push(<div style={{color:'LightSeaGreen'}}>{result[i]}</div>)
		}
		return <div>{resultUI}</div>
}

const gatherTags = function(result, node, cache){
	if(node.tags!=null){
		result.push(node.tags)
	}
	if(cache.children[node.id]!=null){
		for(var i in cache.children[node.id]){
			gatherTags(result, cache.children[node.id][i], cache)
		}
	}
}

const calculateFontSize = function(lines){
	if(lines<10){
		return fontSizeDefaultPt - 3
	}
	const dif = lines-pivotLines
	const ratio = dif/10
	return fontSizeDefaultPt + ratio
}

const getLeftBorderColor = function(relevance){
	if(relevance=='High')
		return 'red'
	if(relevance=='Normal')
		return 'orange'
	if(relevance=='Low')
		return 'green'
	return 'lightgrey'
}

const funcNameUI = function(component, func){
	return <div style={{display:'inline-block'}}>
						<OverlayTrigger placement="left" overlay={tooltip('Copy component name to buffer')}>
							<span class='funcflow-cfl' style={{color:component.color}} onClick={(e)=>copyToClipboard(component.title, e)}>{component.title}.</span>
						</OverlayTrigger>
						<OverlayTrigger placement="bottom" overlay={tooltip('Copy function name to buffer')}>
							<span class='funcflow-cfl' style={{color:func.color}} onClick={(e)=>copyToClipboard(func.title, e)}>{func.title}</span>
						</OverlayTrigger>
						<OverlayTrigger placement="top" overlay={tooltip('Copy start line to buffer')}>
							<span class='funcflow-startline funcflow-cfl' onClick={(e)=>copyToClipboard(func.startLine, e)}>:{func.startLine}</span>
						</OverlayTrigger>
						{func.lines!=null?
							<OverlayTrigger placement="bottom" overlay={tooltip('Copy function length to buffer')}>
								<span class='funcflow-lines funcflow-cfl' onClick={(e)=>copyToClipboard(func.lines, e)}>|{func.lines}</span>
							</OverlayTrigger>
							:null}
					</div>
}

const tooltip = function(text){
  return <Tooltip id="tooltip">
    {text}
  </Tooltip>
}

const copyToClipboard = (text) => {
	var textField = document.createElement('textarea')
	textField.innerText = text
	document.body.appendChild(textField)
	textField.select()
	document.execCommand('copy')
	textField.remove()
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
