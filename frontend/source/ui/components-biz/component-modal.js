import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

import {CommonModal} from '../common-modal'
import {TextFields} from '../common/components/text-fields'
import {ColorChooser} from '../common/components/color-chooser'
import {DeleteButton} from '../common/components/delete-button'

import {registerEvent, fireEvent, registerReaction, chkSt} from 'absevents'

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

    registerReaction('component-modal', 'components-rep', ['created-component', 'updated-component', 'deleted-component'], (stateSetter)=>fireEvent('component-modal', 'close'))
    registerReaction('component-modal', 'components-rep', ['full-received-component'], (stateSetter)=>this.setState({}))
  }

  render(){
    return <CommonModal title="component" isOpen={this.state.isOpen}
              okHandler={isShowOkButton(this)?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('component-modal', 'close')}>
              {this.state.component!=null && this.state.component.id>0?
                <DeleteButton onClick={()=>fireEvent('components-rep', 'delete-component', [this.state.component])}/>
                :null}
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
  const currentProject = chkSt('projects-rep', 'current-project')
  const components = chkSt('components-rep', 'components')[currentProject.id]
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

const content = function(reactcomp){
  if(reactcomp.state.component!=null){
    if(reactcomp.state.component.id==null || reactcomp.state.component.id<1 || reactcomp.state.component.isFull==true){
      return <TextFields content={[titleFieldUI(reactcomp), descTextField(reactcomp), colorField(reactcomp)]}/>
    } else {
      fireEvent('components-rep', 'get-component', [reactcomp.state.component])
      return 'Loading ...'
    }
  }
}

const titleFieldUI = function(reactcomp){
  return {
    key: 'titleFieldUI',
    label: <ControlLabel>Title:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                type="text"
                                value={reactcomp.state.component.title}
                                placeholder="Enter title"
                                onChange={(e)=>{reactcomp.state.component.title = e.target.value; reactcomp.setState({})}}/>
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
                                value={reactcomp.state.component.description}
                                placeholder="Enter description"
                                onChange={(e)=>{reactcomp.state.component.description = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}

const colorField = function(reactcomp){
  return {
    key: 'colorField',
    label: <ControlLabel>Color:</ControlLabel>,
    field: <ColorChooser title={reactcomp.state.component.color} callback={(newval)=>{reactcomp.state.component.color = newval; reactcomp.setState({})}}
              colors={['Green', 'Orange', 'Red', 'Maroon', 'Pink', 'Brown', 'Olive', 'Lime', 'Green']} />
  }
}
