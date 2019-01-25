import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {CommonModal} from '../common-modal'

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
    registerReaction('function-modal', 'functions-rep', ['created-function', 'updated-function'], (stateSetter)=>fireEvent('function-modal', 'close'))
  }

  render(){
    return <CommonModal title="Function" isOpen={this.state.isOpen}
              okHandler={isShowOkButton(this)?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('function-modal', 'close')}>
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
    if(functions[id].title == reactcomp.state.node.title){
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
    return  <FormGroup controlId="formBasicText">
                  <div style={{display:'inline-block', paddingRight:'3px'}}>
                    <ControlLabel>Title:</ControlLabel>
                  </div>
                  <div style={{display:'inline-block'}}>
                    <FormControl
                                type="text"
                                value={component.state.node.title}
                                placeholder="Enter title"
                                onChange={(e)=>{component.state.node.title = e.target.value; component.setState({})}}/>
                  </div>
                </FormGroup>
  }
}
