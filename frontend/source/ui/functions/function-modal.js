import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

import {CommonModal} from '../common-modal'
import {TextFields} from '../common/components/text-fields'

import {registerEvent, fireEvent, registerReaction, viewStateVal} from '../../utils/eventor'

export class FunctionModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false}
    registerEvent('function-modal', 'open', (stateSetter, node)=>{
      this.setState({isOpen:true, node: node})
    })

    registerEvent('function-modal', 'close', (stateSetter)=>{
      this.setState({isOpen:false, node: null})
    })

    //registerReaction('function-modal', 'functions-rep', 'func-added', (stateSetter)=>fireEvent('function-modal', 'close'))
    registerReaction('function-modal', 'functions-rep', ['created-function', 'updated-function', 'deleted-function'], (stateSetter)=>fireEvent('function-modal', 'close'))
  }

  render(){
    return <CommonModal title="Function" isOpen={this.state.isOpen}
              okHandler={isShowOkButton(this)?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('function-modal', 'close')}>
              {this.state.node!=null && this.state.node.id>0?
                <Button onClick={()=>fireEvent('functions-rep', 'delete-function', [this.state.node])} bsStyle="danger">Delete</Button>
                :null}
            {content(this)}
          </CommonModal>
  }
}

const isShowOkButton = function(reactcomp){
  if(reactcomp.state.node==null || reactcomp.state.node.title==null || reactcomp.state.node.title==''){
    return false
  }
  if(isTitleAlreadyExist(reactcomp)){
    return false
  }
  return true
}

const isTitleAlreadyExist = function(reactcomp){
  const component = viewStateVal('components-rep', 'components')[viewStateVal('projects-rep', 'current-project').id][reactcomp.state.node.componentid]
  const functions = viewStateVal('functions-rep', 'functions')[component.id]
  for(var id in functions){
    if(functions[id].title == reactcomp.state.node.title && functions[id].id!=reactcomp.state.node.id){
      return true
    }
  }
  return false
}

const okHandler = function(reactcomp){
  if(reactcomp.state.node.id!=0 && reactcomp.state.node.id>0){
    fireEvent('functions-rep', 'update-function', [reactcomp.state.node])
  } else {
    fireEvent('functions-rep', 'create-function', [reactcomp.state.node])
  }
}

const content = function(component){
  if(component.state.node!=null){
    return <TextFields content={[titleFieldUI(component), startLineFieldUI(component), linesFieldUI(component), descTextField(component)]}/>
  }
}

const titleFieldUI = function(reactcomp){
  return {
    key: 'titleFieldUI',
    label: <ControlLabel>Title:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                type="text"
                                value={reactcomp.state.node.title}
                                placeholder="Enter title"
                                onChange={(e)=>{reactcomp.state.node.title = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}

const linesFieldUI = function(reactcomp){
  return {
    key: 'linesFieldUI',
    label: <ControlLabel>Lines:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                type="text"
                                value={reactcomp.state.node.lines}
                                placeholder="Enter title"
                                onChange={(e)=>{reactcomp.state.node.lines = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}

const startLineFieldUI = function(reactcomp){
  return {
    key: 'startLineFieldUI',
    label: <ControlLabel>Start line:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                type="text"
                                value={reactcomp.state.node.startLine}
                                placeholder="Enter title"
                                onChange={(e)=>{reactcomp.state.node.startLine = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}

const descTextField = function(reactcomp){
  return {
    key: 'descTextField',
    label: <ControlLabel>Description:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                componentClass="textarea"
                                type="input"
                                value={reactcomp.state.node.description}
                                placeholder="Enter description"
                                onChange={(e)=>{reactcomp.state.node.description = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}
