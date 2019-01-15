import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {CommonModal} from './common-modal'

import {registerEvent, fireEvent, registerReaction} from '../utils/eventor'

export class FunctionModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false}
    registerEvent('function-modal', 'open', (stateSetter, node)=>{
      this.setState({isOpen:true, node: node})
    })

    registerEvent('function-modal', 'close', (stateSetter, node)=>{
      this.setState({isOpen:false, node: null})
    })

    registerReaction('function-modal', 'functions-rep', 'func-added', (stateSetter)=>fireEvent('function-modal', 'close'))
  }

  render(){
    return <CommonModal isOpen={this.state.isOpen} okHandler={()=>fireEvent('functions-rep', 'add-func', [this.state.node])} >
            {content(this)}
          </CommonModal>
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
                                onChange={(e)=>{component.state.node.title = e.target.value; component.setState({})}}/>}
                  </div>
                </FormGroup>
  }
}
