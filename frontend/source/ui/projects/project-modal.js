import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {CommonModal} from '../common-modal'
import {ComponentsList} from '../components-biz/components-list'
import {TextFields} from '../common/components/text-fields'
import {DeleteButton} from '../common/components/delete-button'

import {registerEvent, fireEvent, registerReaction} from 'absevents'

export class ProjectModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false}
    registerEvent('project-modal', 'open', (stateSetter, project)=>{
      this.setState({isOpen:true, project: project})
    })

    registerEvent('project-modal', 'close', (stateSetter)=>{
      this.setState({isOpen:false, project: null})
    })

    registerReaction('project-modal', 'projects-rep', ['created-project', 'updated-project', 'deleted-project'], (stateSetter)=>fireEvent('project-modal', 'close'))
  }

  render(){
    return <CommonModal title="Project" isOpen={this.state.isOpen} styleClass="project-modal-dialog"
              okHandler={this.state.project!=null && this.state.project.title!=null && this.state.project.title!=''?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('project-modal', 'close')}>
            {this.state.project!=null && this.state.project.id>0?
                <DeleteButton onClick={()=>fireEvent('projects-rep', 'delete-project', [this.state.project])}/>
                :null}
            {content(this)}
            {this.state.project!=null && this.state.project.id>0? <ComponentsList projectid={this.state.project.id} />:null}
          </CommonModal>
  }
}

const okHandler = function(reactcomp){
  if(reactcomp.state.project.id!=0 && reactcomp.state.project.id>0){
    fireEvent('projects-rep', 'update-project', [reactcomp.state.project])
  } else {
    fireEvent('projects-rep', 'create-project', [reactcomp.state.project])
  }
}

const content = function(reactcomp){
  if(reactcomp.state.project!=null){
    return <div>
          <TextFields content={[titleFieldUI(reactcomp), descTextField(reactcomp)]}/>
      </div>
  }
}

const titleFieldUI = function(reactcomp){
  return {
    key: 'titleFieldUI',
    label: <ControlLabel>Title:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                type="text"
                                value={reactcomp.state.project.title}
                                placeholder="Enter title"
                                onChange={(e)=>{reactcomp.state.project.title = e.target.value; reactcomp.setState({})}}/>
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
                                value={reactcomp.state.project.description}
                                placeholder="Enter description"
                                onChange={(e)=>{reactcomp.state.project.description = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}
