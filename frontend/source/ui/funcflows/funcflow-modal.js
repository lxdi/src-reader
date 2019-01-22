import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, ButtonToolbar, DropdownButton} from 'react-bootstrap'

import {CommonModal} from '../common-modal'

import {registerEvent, fireEvent, registerReaction} from '../../utils/eventor'

export class FuncflowModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false}
    registerEvent('funcflow-modal', 'open', (stateSetter, funcflow)=>{
      this.setState({isOpen:true, funcflow: funcflow})
    })

    registerEvent('funcflow-modal', 'close', (stateSetter)=>{
      this.setState({isOpen:false, funcflow: null})
    })

    registerReaction('funcflow-modal', 'funcflows-rep', 'created-funcflow', (stateSetter)=>fireEvent('funcflow-modal', 'close'))
  }

  render(){
    return <CommonModal title="Function flow" isOpen={this.state.isOpen}
              okHandler={()=>fireEvent('funcflows-rep', 'create-funcflow', [this.state.funcflow])}
              cancelHandler={()=>fireEvent('funcflow-modal', 'close')}>
            {content(this)}
          </CommonModal>
  }
}

const content = function(component){
  if(component.state.funcflow!=null){
    return <div>
            <div>

            </div>
            {textFieldsUI(component)}
          </div>
  }
}

// const componentSelecting = function(reactcomp){
//   return <div>
//             <ButtonToolbar>
//               <DropdownButton bsSize="small" title={targetsDropDownTitle} id="dropdown-size-small" onSelect={component.selectTargetHandler}>
//                 {availableTargetsUI()}
//               </DropdownButton>
//             </ButtonToolbar>
//           </div>
// }

// const availableTargetsUI = function(){
//   const result = []
//   iterateTree(viewStateVal('components-dao', 'targets')[viewStateVal('realms-dao', 'currentRealm').id], (target, level)=>{
//     const style = {marginLeft: (level*10)+'px'}
//     result.push(<MenuItem style={style} eventKey={target}>{target.toString()}</MenuItem>)
//   })
//   return result
// }

const textFieldsUI = function(reactcomp){
  return <FormGroup controlId="formBasicText">
                <div style={{display:'inline-block', paddingRight:'3px'}}>
                  <ControlLabel>Title:</ControlLabel>
                </div>
                <div style={{display:'inline-block'}}>
                  <FormControl
                              type="text"
                              value={reactcomp.state.funcflow.title}
                              placeholder="Enter title"
                              onChange={(e)=>{reactcomp.state.funcflow.title = e.target.value; reactcomp.setState({})}}/>
                </div>
              </FormGroup>
}
