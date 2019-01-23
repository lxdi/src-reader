import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, ButtonToolbar, DropdownButton, MenuItem, Button} from 'react-bootstrap'

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
              {componentUI(component)}
            </div>
            <div>
              {functionUI(component)}
            </div>
            {textFieldsUI(component)}
          </div>
  }
}

//------------------------------------------------------

const componentUI = function(reactcomp){
  var currentCompName = null
  var componentSelecting = null
  if(reactcomp.state.comptemp!=null){
    currentCompName = reactcomp.state.comptemp.title
  }
  if(reactcomp.state.funcflow.functionid!=null){
    currentCompName = getComponentByFunctionid(reactcomp.state.funcflow.functionid).title
  }
  const availableComponents = availableComponentsUI(reactcomp)
  if(availableComponents.length>0){
    componentSelecting = <ButtonToolbar>
                  <DropdownButton disabled={reactcomp.state.funcflow.functionid!=null} title={currentCompName==null?'<Select Component>': currentCompName} id="dropdown-size-small" onSelect={(e, comp)=>selectCompHandler(e, comp, reactcomp)}>
                    {availableComponents}
                  </DropdownButton>
                </ButtonToolbar>
  }
  const style = {display:'inline-block', paddingRight:'3px', verticalAlign:'top'}
  return <div style={{padding:'3px'}}>
            <div style={style}>
            {componentSelecting}
            </div>
            <div style={style}>
              <Button onClick={()=>fireEvent('component-modal', 'open', [{title:'', projectid: getProjectByScenarioId(reactcomp.state.funcflow.scenarioid).id}])}>Create New</Button>
            </div>
          </div>
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

const functionUI = function(reactcomp){
  if(reactcomp.state.funcflow.functionid!=null || reactcomp.state.comptemp!=null){
      const func = reactcomp.state.funcflow.functionid!=null? getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), reactcomp.state.funcflow.functionid): null
      const componentid = func!=null? func.componentid: reactcomp.state.comptemp.id

      var functionSelecting = null
      const availableFunctions = availableFunctionsUI(reactcomp, componentid)
      if(availableFunctions.length>0){
        functionSelecting = <ButtonToolbar>
                      <DropdownButton title={func==null?'<Select Function>': func.title} id="dropdown-size-small" onSelect={(e, func)=>selectFuncHandler(e, func, reactcomp)}>
                        {availableFunctions}
                      </DropdownButton>
                    </ButtonToolbar>
      }

      const style = {display:'inline-block', paddingRight:'3px', verticalAlign:'top'}
      return <div style={{padding:'3px'}}>
                <div style={style}>
                  {functionSelecting}
                </div>
                <div style={style}>
                  <Button onClick={()=>fireEvent('function-modal', 'open', [{title:'', componentid: componentid}])}>Create New</Button>
                </div>
                <div style={style}>
                  <Button onClick={()=>{reactcomp.state.funcflow.functionid=null; reactcomp.setState({})}}>Remove</Button>
                </div>
              </div>
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
