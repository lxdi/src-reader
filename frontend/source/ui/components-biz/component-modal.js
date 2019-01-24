import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {CommonModal} from '../common-modal'

import {registerEvent, fireEvent, registerReaction} from '../../utils/eventor'

export class ComponentModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false}
    registerEvent('component-modal', 'open', (stateSetter, component)=>{
      this.setState({isOpen:true, component: component})
    })

    registerEvent('component-modal', 'close', (stateSetter)=>{
      this.setState({isOpen:false, component: null})
    })

    registerReaction('component-modal', 'components-rep', 'created-component', (stateSetter)=>fireEvent('component-modal', 'close'))
  }

  render(){
    return <CommonModal title="component" isOpen={this.state.isOpen}
              okHandler={this.state.component!=null && this.state.component.title!=null && this.state.component.title!=''?()=>fireEvent('components-rep', 'create-component', [this.state.component]):null}
              cancelHandler={()=>fireEvent('component-modal', 'close')}>
            {content(this)}
          </CommonModal>
  }
}

const content = function(component){
  if(component.state.component!=null){
    return  <FormGroup controlId="formBasicText">
                  <div style={{display:'inline-block', paddingRight:'3px'}}>
                    <ControlLabel>Title:</ControlLabel>
                  </div>
                  <div style={{display:'inline-block'}}>
                    <FormControl
                                type="text"
                                value={component.state.component.title}
                                placeholder="Enter title"
                                onChange={(e)=>{component.state.component.title = e.target.value; component.setState({})}}/>
                  </div>
                </FormGroup>
  }
}
