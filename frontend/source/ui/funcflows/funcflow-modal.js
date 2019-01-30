import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, ButtonToolbar, DropdownButton, MenuItem, Button} from 'react-bootstrap'

import {CommonModal} from '../common-modal'
import {TextFields} from '../common/components/text-fields'

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

    registerReaction('funcflow-modal', 'funcflows-rep', ['created-funcflow', 'updated-funcflow', 'deleted-funcflow'], (stateSetter)=>fireEvent('funcflow-modal', 'close'))
    registerReaction('funcflow-modal', 'components-rep', 'created-component', (stateSetter, newcomp)=>{this.state.comptemp = newcomp; this.setState({})})
    registerReaction('funcflow-modal', 'components-rep', 'updated-component', (stateSetter)=>this.setState({}))
    registerReaction('funcflow-modal', 'functions-rep', 'created-function', (stateSetter, newfunc)=>{this.state.funcflow.functionid=newfunc.id; this.setState({})})
    registerReaction('funcflow-modal', 'functions-rep', 'updated-function', (stateSetter)=>this.setState({}))
    registerReaction('funcflow-modal', 'funcflows-rep', ['full-received-funcflow'], (stateSetter)=>this.setState({}))
  }

  render(){
    return <CommonModal title="Function flow" isOpen={this.state.isOpen}
              styleClass="funcflow-modal"
              okHandler={this.state.funcflow!=null && this.state.funcflow.functionid!=null?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('funcflow-modal', 'close')}>
              {this.state.funcflow!=null && this.state.funcflow.id>0?
                <Button onClick={()=>fireEvent('funcflows-rep', 'delete-funcflow', [this.state.funcflow])} bsStyle="danger">Delete</Button>
                :null}
            {content(this)}
          </CommonModal>
  }
}

const okHandler = function(reactcomp){
  if(reactcomp.state.funcflow.id!=0 && reactcomp.state.funcflow.id>0){
    fireEvent('funcflows-rep', 'update-funcflow', [reactcomp.state.funcflow])
  } else {
    fireEvent('funcflows-rep', 'create-funcflow', [reactcomp.state.funcflow])
  }
}

const content = function(reactcomp){
  if(reactcomp.state.funcflow!=null){
    if(reactcomp.state.funcflow.id==null || reactcomp.state.funcflow.id<1 || reactcomp.state.funcflow.isFull==true){
      return <div>
              <div>
                {componentUI(reactcomp)}
              </div>
              <div>
                {functionUI(reactcomp)}
              </div>
              {textFieldsUI(reactcomp)}
            </div>
    } else {
      fireEvent('funcflows-rep', 'get-funcflow', [reactcomp.state.funcflow])
      return 'Loading ...'
    }
  }
}

//Component selecting ------------------------------------------------------

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
            <div style={style}>
              {viewCompButton(reactcomp)}
            </div>
          </div>
}

const viewCompButton = function(reactcomp){
  var comp = null
  if(reactcomp.state.comptemp!=null){
    comp = reactcomp.state.comptemp
  }
  if(reactcomp.state.funcflow.functionid!=null){
    comp = getComponentByFunctionid(reactcomp.state.funcflow.functionid)
  }
  if(comp!=null){
    return <Button onClick={()=>fireEvent('component-modal', 'open', [comp])}> View/Edit </Button>
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

//Function selecting -------------------------------------------------------

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
                <div style={style}>
                  {viewFuncButton(func)}
                </div>
              </div>
  }
}

const viewFuncButton = function(func){
  if(func!=null){
    return <Button onClick={()=>fireEvent('function-modal', 'open', [func])}> View/Edit </Button>
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

//Util functions-----------------------------------------

const getProjectByScenarioId = function(scenarioid){
  var scenario = getFromMappedRepByid(viewStateVal('scenarios-rep', 'scenarios'), scenarioid)
  return viewStateVal('projects-rep', 'projects')[scenario.projectid]
}

const getComponentByFunctionid = function(functionid){
  const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), functionid)
  return getFromMappedRepByid(viewStateVal('components-rep', 'components'), func.componentid)
}

//Text fields ---------------------------------------------

const textFieldsUI = function(reactcomp){
  return <TextFields content={[descTextField(reactcomp), tagsTextField(reactcomp), relevanceField(reactcomp)]} />
}

const descTextField = function(reactcomp){
  return {
    key: 'descTextField',
    label: <ControlLabel>Description:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                componentClass="textarea"
                                type="input"
                                value={reactcomp.state.funcflow.desc}
                                placeholder="Enter description"
                                onChange={(e)=>{reactcomp.state.funcflow.desc = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}

const tagsTextField = function(reactcomp){
  return {
    key: 'tagsTextField',
    label: <ControlLabel>Tags:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                type="text"
                                value={reactcomp.state.funcflow.tags}
                                placeholder="tags"
                                onChange={(e)=>{reactcomp.state.funcflow.tags = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}

const relevanceField = function(reactcomp){
  const funcflow = reactcomp.state.funcflow
  if(funcflow.relevance==null){
    funcflow.relevance = 'Normal'
  }
  return {
    key: 'relevanceField',
    label: <ControlLabel>Relevance:</ControlLabel>,
    field: <ButtonToolbar>
                  <DropdownButton title={funcflow.relevance} id="dropdown-size-small" onSelect={(relVal)=>{funcflow.relevance = relVal; reactcomp.setState({})}}>
                    {relevanceValuesMenuItems()}
                  </DropdownButton>
                </ButtonToolbar>
  }
}

const relevanceValues = ['High', 'Normal', 'Low', 'Transitional']

const relevanceValuesMenuItems = function(){
  const result = []
  for(var i in relevanceValues){
    result.push(<MenuItem eventKey={relevanceValues[i]}>{relevanceValues[i]}</MenuItem>)
  }
  return result
}
