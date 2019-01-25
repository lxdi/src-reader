import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {CommonModal} from '../common-modal'

import {registerEvent, fireEvent, registerReaction, viewStateVal} from '../../utils/eventor'

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

    registerReaction('component-modal', 'components-rep', ['created-component', 'updated-component'], (stateSetter)=>fireEvent('component-modal', 'close'))
  }

  render(){
    return <CommonModal title="component" isOpen={this.state.isOpen}
              okHandler={isShowOkButton(this)?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('component-modal', 'close')}>
            {content(this)}
          </CommonModal>
  }
}

const isShowOkButton = function(reactcomp){
  if(reactcomp.state.component==null || reactcomp.state.component.title==null || reactcomp.state.component.title==''){
    return false
  }
  if(isTitleAlreadyExist(reactcomp)){
    return false
  }
  return true
}

const isTitleAlreadyExist = function(reactcomp){
  const currentProject = viewStateVal('projects-rep', 'current-project')
  const components = viewStateVal('components-rep', 'components')[currentProject.id]
  for(var id in components){
    if(components[id].title == reactcomp.state.component.title && components[id].id!=reactcomp.state.component.id){
      return true
    }
  }
  return false
}

const okHandler = function(reactcomp){
  if(reactcomp.state.component.id!=0 && reactcomp.state.component.id>0){
    fireEvent('components-rep', 'update-component', [reactcomp.state.component])
  } else {
    fireEvent('components-rep', 'create-component', [reactcomp.state.component])
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
