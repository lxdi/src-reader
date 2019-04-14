import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

import {CommonModal} from '../common-modal'
import {TextFields} from '../common/components/text-fields'
import {DeleteButton} from '../common/components/delete-button'

import {registerEvent, fireEvent, registerReaction} from 'absevents'

export class ScenarioModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false}
    registerEvent('scenario-modal', 'open', (stateSetter, scenario)=>{
      this.setState({isOpen:true, scenario: scenario})
    })

    registerEvent('scenario-modal', 'close', (stateSetter)=>{
      this.setState({isOpen:false, scenario: null})
    })

    registerReaction('scenario-modal', 'scenarios-rep', ['created-scenario', 'updated-scenario', 'deleted-scenario'], (stateSetter)=>fireEvent('scenario-modal', 'close'))
    registerReaction('scenario-modal', 'scenarios-rep', ['full-received-scenario'], (stateSetter)=>this.setState({}))
  }

  render(){
    return <CommonModal title="Scenario" isOpen={this.state.isOpen}
              okHandler={this.state.scenario!=null && this.state.scenario.title!=null && this.state.scenario.title!=''?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('scenario-modal', 'close')}>
              {this.state.scenario!=null && this.state.scenario.id>0?
                <DeleteButton onClick={()=>fireEvent('scenarios-rep', 'delete-scenario', [this.state.scenario])}/>
                :null}
            {content(this)}
          </CommonModal>
  }
}

const okHandler = function(reactcomp){
  if(reactcomp.state.scenario.id!=0 && reactcomp.state.scenario.id>0){
    fireEvent('scenarios-rep', 'update-scenario', [reactcomp.state.scenario])
  } else {
    fireEvent('scenarios-rep', 'create-scenario', [reactcomp.state.scenario])
  }
}

const content = function(reactcomp){
  if(reactcomp.state.scenario!=null){
      if(reactcomp.state.scenario.id==null || reactcomp.state.scenario.id<1 || reactcomp.state.scenario.isFull==true){
        return <TextFields content={[titleFieldUI(reactcomp), descFieldUI(reactcomp)]}/>
      } else {
        fireEvent('scenarios-rep', 'get-scenario', [reactcomp.state.scenario])
        return 'Loading...'
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
                                value={reactcomp.state.scenario.title}
                                placeholder="Enter title"
                                onChange={(e)=>{reactcomp.state.scenario.title = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}

const descFieldUI = function(reactcomp){
  return {
    key: 'descFieldUI',
    label: <ControlLabel>Description:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                type="text"
                                value={reactcomp.state.scenario.desc}
                                placeholder="Enter title"
                                onChange={(e)=>{reactcomp.state.scenario.desc = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}
