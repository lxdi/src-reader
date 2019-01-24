import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {CommonModal} from '../common-modal'
import {TextFields} from '../common/components/text-fields'

import {registerEvent, fireEvent, registerReaction} from '../../utils/eventor'

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

    registerReaction('scenario-modal', 'scenarios-rep', ['created-scenario', 'updated-scenario'], (stateSetter)=>fireEvent('scenario-modal', 'close'))
  }

  render(){
    return <CommonModal title="Scenario" isOpen={this.state.isOpen}
              okHandler={this.state.scenario!=null && this.state.scenario.title!=null && this.state.scenario.title!=''?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('scenario-modal', 'close')}>
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

const content = function(component){
  if(component.state.scenario!=null){
    return <TextFields content={[titleFieldUI(component), descFieldUI(component)]}/>
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
