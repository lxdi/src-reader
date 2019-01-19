import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

import {CommonModal} from '../common-modal'

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

    registerReaction('scenario-modal', 'scenarios-rep', 'created-scenario', (stateSetter)=>fireEvent('scenario-modal', 'close'))
  }

  render(){
    return <CommonModal title="Scenario" isOpen={this.state.isOpen}
              okHandler={()=>fireEvent('scenarios-rep', 'create-scenario', [this.state.scenario])}
              cancelHandler={()=>fireEvent('scenario-modal', 'close')}>
            {content(this)}
          </CommonModal>
  }
}

const content = function(component){
  if(component.state.scenario!=null){
    return  <FormGroup controlId="formBasicText">
                  <div style={{display:'inline-block', paddingRight:'3px'}}>
                    <ControlLabel>Title:</ControlLabel>
                  </div>
                  <div style={{display:'inline-block'}}>
                    <FormControl
                                type="text"
                                value={component.state.scenario.title}
                                placeholder="Enter title"
                                onChange={(e)=>{component.state.scenario.title = e.target.value; component.setState({})}}/>
                  </div>
                </FormGroup>
  }
}
