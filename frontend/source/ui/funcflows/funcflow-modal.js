import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap'

import {CommonModal} from '../common-modal'

import {registerEvent, fireEvent, registerReaction, viewStateVal} from '../../utils/eventor'

import {getFromMappedRepByid} from '../../utils/import-utils'

export class FuncflowModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false}
    registerEvent('funcflow-modal', 'open', (stateSetter, funcflow)=>{
      this.setState({isOpen:true, funcflow: funcflow})
    })

    registerEvent('funcflow-modal', 'close', (stateSetter)=>{
      this.setState({isOpen:false, funcflow: null, comptemp:null})
    })

    registerReaction('funcflow-modal', 'funcflows-rep', 'created-funcflow', (stateSetter)=>fireEvent('funcflow-modal', 'close'))
    registerReaction('funcflow-modal', 'components-rep', 'created-component', (stateSetter)=>this.setState({}))
    registerReaction('funcflow-modal', 'functions-rep', 'created-function', (stateSetter)=>this.setState({}))
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
              {componentSelecting(component)}
            </div>
            <div>
              {functionSelecting(component)}
            </div>
            {textFieldsUI(component)}
          </div>
  }
}

const componentSelecting = function(reactcomp){
  if(reactcomp.state.funcflow.functionid==null){ //|| (reactcomp.state.funcflow.functionid!=null && reactcomp.state.comptemp==null)){
    return <div>
              <div>
                <a href='#' onClick={()=>fireEvent('component-modal', 'open', [{title:'', projectid: getProjectByScenarioId(reactcomp.state.funcflow.scenarioid).id}])}>+ Create New </a>
              </div>
              <ButtonToolbar>
                <DropdownButton bsSize="small" title={'Components'} id="dropdown-size-small" onSelect={(e, comp)=>selectCompHandler(e, comp, reactcomp)}>
                  {availableComponentsUI(reactcomp)}
                </DropdownButton>
              </ButtonToolbar>
            </div>
  } else {
    return reactcomp.state.funcflow.functionid==null? viewStateVal('components-rep', 'components')[reactcomp.state.comptemp.id].title: getComponentByFunctionid(reactcomp.state.funcflow.functionid).title
  }
}

const availableComponentsUI = function(reactcomp){
  const project = getProjectByScenarioId(reactcomp.state.funcflow.scenarioid)
  const result = []
  for(var compid in viewStateVal('components-rep', 'components')[project.id]){
    const comp = viewStateVal('components-rep', 'components')[project.id][compid]
    result.push(<MenuItem eventKey={comp}>{comp.title}</MenuItem>)
  }
  return result
}

const selectCompHandler = function(comp, e, reactcomp){
  reactcomp.state.comptemp = comp
  reactcomp.setState({})
}

//-------------------------------------------------------

const functionSelecting = function(reactcomp){
  if(reactcomp.state.funcflow.functionid==null && reactcomp.state.comptemp!=null){
    const componentid = reactcomp.state.comptemp.id
    return <div>
              <div>
                <a href='#' onClick={()=>fireEvent('function-modal', 'open', [{title:'', componentid: componentid}])}>+ Create New Function</a>
              </div>
              <ButtonToolbar>
                <DropdownButton bsSize="small" title={'Functions'} id="dropdown-size-small" onSelect={(e, comp)=>selectFuncHandler(e, comp, reactcomp)}>
                  {availableFunctionsUI(reactcomp, componentid)}
                </DropdownButton>
              </ButtonToolbar>
            </div>
  } else {
    if(reactcomp.state.funcflow.functionid!=null){
      return getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), reactcomp.state.funcflow.functionid).title
    } else {
      return null
    }
  }
}

const availableFunctionsUI = function(reactcomp, componentid){
  const result = []
  for(var funcid in viewStateVal('functions-rep', 'functions')[componentid]){
    const func = viewStateVal('functions-rep', 'functions')[componentid][funcid]
    result.push(<MenuItem eventKey={func}>{func.title}</MenuItem>)
  }
  return result
}

const selectFuncHandler = function(func, e, reactcomp){
  reactcomp.state.funcflow.functionid = func.id
  reactcomp.setState({})
}

//-----------------------------------------

const getProjectByScenarioId = function(scenarioid){
  var scenario = getFromMappedRepByid(viewStateVal('scenarios-rep', 'scenarios'), scenarioid)
  // for(var projid in viewStateVal('scenarios-rep', 'scenarios')){
  //   for(var scenid in viewStateVal('scenarios-rep', 'scenarios')[projid]){
  //     if(viewStateVal('scenarios-rep', 'scenarios')[projid][scenid].id == scenarioid){
  //         scenario = viewStateVal('scenarios-rep', 'scenarios')[projid][scenid]
  //         break;
  //     }
  //   }
  // }
  return viewStateVal('projects-rep', 'projects')[scenario.projectid]
}

const getComponentByFunctionid = function(functionid){
  const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), functionid)
  return getFromMappedRepByid(viewStateVal('components-rep', 'components'), func.componentid)
}

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
