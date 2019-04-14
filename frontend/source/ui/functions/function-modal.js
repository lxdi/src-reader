import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

import {CommonModal} from '../common-modal'
import {TextFields} from '../common/components/text-fields'
import {ColorChooser} from '../common/components/color-chooser'
import {DeleteButton} from '../common/components/delete-button'

import {registerEvent, fireEvent, registerReaction, chkSt} from 'absevents'

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
    registerReaction('function-modal', 'functions-rep', ['full-received-function'], (stateSetter)=>this.setState({}))
  }

  render(){
    return <CommonModal title="Function" isOpen={this.state.isOpen}
              okHandler={isShowOkButton(this)?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('function-modal', 'close')}>
              {this.state.node!=null && this.state.node.id>0?
                <DeleteButton onClick={()=>fireEvent('functions-rep', 'delete-function', [this.state.node])}/>
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
  const component = chkSt('components-rep', 'components')[chkSt('projects-rep', 'current-project').id][reactcomp.state.node.componentid]
  const functions = chkSt('functions-rep', 'functions')[component.id]
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

const content = function(reactcomp){
  if(reactcomp.state.node!=null){
    if(reactcomp.state.node.id==null || reactcomp.state.node.id<1 || reactcomp.state.node.isFull==true){
      return <div>
        <TextFields content={[titleFieldUI(reactcomp), startLineFieldUI(reactcomp), linesFieldUI(reactcomp), descTextField(reactcomp), colorField(reactcomp)]}/>
        {codeSnippetButton(reactcomp)}
      </div>
    } else {
      fireEvent('functions-rep', 'get-function', [reactcomp.state.node])
      return 'Loading...'
    }
  }
}

const codeSnippetButton = function(reactcomp){
  var result = null
  if(reactcomp.state.node.id>0){
    result = <Button onClick={()=>fireEvent('code-snippet-modal', 'open', [reactcomp.state.node])}> Code Snippet </Button>
  } else {
    result = <Button disabled={true}> Code Snippet </Button>
  }
  return <div style={{paddingTop:'5px'}}>{result}</div>
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

const colorField = function(reactcomp){
  return {
    key: 'colorField',
    label: <ControlLabel>Color:</ControlLabel>,
    field: <ColorChooser title={reactcomp.state.node.color} callback={(newval)=>{reactcomp.state.node.color = newval; reactcomp.setState({})}}
              colors={['BlueViolet', 'Navy', 'Blue', 'Aqua', 'Teal', 'Purple', 'Magenta']}  />
  }
}
