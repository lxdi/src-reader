import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {CommonModal} from '../common-modal'
import {ComponentsList} from '../components-biz/components-list'

import {registerEvent, fireEvent, registerReaction} from '../../utils/eventor'

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

    registerReaction('project-modal', 'projects-rep', ['created-project', 'updated-project'], (stateSetter)=>fireEvent('project-modal', 'close'))
  }

  render(){
    return <CommonModal title="Project" isOpen={this.state.isOpen}
              okHandler={this.state.project!=null && this.state.project.title!=null && this.state.project.title!=''?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('project-modal', 'close')}>
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

const content = function(component){
  if(component.state.project!=null){
    return  <FormGroup controlId="formBasicText">
                  <div style={{display:'inline-block', paddingRight:'3px'}}>
                    <ControlLabel>Title:</ControlLabel>
                  </div>
                  <div style={{display:'inline-block'}}>
                    <FormControl
                                type="text"
                                value={component.state.project.title}
                                placeholder="Enter title"
                                onChange={(e)=>{component.state.project.title = e.target.value; component.setState({})}}/>
                  </div>
                </FormGroup>
  }
}
