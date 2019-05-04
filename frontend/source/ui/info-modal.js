import React from 'react';
import ReactDOM from 'react-dom';
import {registerEvent, fireEvent, registerReaction} from 'absevents'

import {CommonModal} from './common-modal'


export class InfoModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {info:''}

    registerEvent('info-modal', 'show', (stStr, infoString)=>{
      this.setState({info:infoString})
    })
    registerEvent('info-modal', 'hide', (stStr)=>{
      this.setState({info:''})
    })

    registerReaction('info-modal', 'scenarios-rep', 'parsed', (stStter, scenario)=>fireEvent('info-modal', 'show', ['Scenario "'+scenario.title+'" has been parsed successfully']))
  }

  render(){
    return <CommonModal title="Info" isOpen={this.state.info!=null && this.state.info!=''}
            okHandler={()=>fireEvent('info-modal', 'hide')}>
            {this.state.info}
          </CommonModal>
  }
}
