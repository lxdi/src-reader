import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {CommonModal} from '../common-modal'

import {registerEvent, fireEvent, registerReaction} from '../../utils/eventor'

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
              okHandler={this.state.node!=null && this.state.node.title!=null && this.state.node.title!=''?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('function-modal', 'close')}>
            {content(this)}
          </CommonModal>
  }
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
