import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'

import {CommonModal} from '../common-modal'
import {DeleteButton} from '../common/components/delete-button'
import {TextFields} from '../common/components/text-fields'

import {loadScript} from '../../data/postoffice'

import {registerEvent, fireEvent, registerReaction, viewStateVal} from '../../utils/eventor'

export class CodeSnippetModal extends React.Component{
  constructor(props){
    super(props)
    const defaultState = ()=>{return {isOpen:false, isEdit:false, snippet:null, func:null}}
    this.state = defaultState()

    registerEvent('code-snippet-modal', 'open', (stateSetter, func)=>{
      const codeSnippets = viewStateVal('code-snippets-rep', 'snippets')
      var snippet = null
      if(codeSnippets!=null){
        snippet = codeSnippets[func.id]
        if(snippet==null){
            fireEvent('code-snippets-rep', 'get-snippet', [func])
        }
      } else {
        fireEvent('code-snippets-rep', 'get-snippet', [func])
      }
      this.setState({isOpen:true, snippet:snippet, func:func})
    })

    registerEvent('code-snippet-modal', 'close', (stateSetter)=>this.setState(defaultState()))
    registerReaction('code-snippet-modal', 'code-snippets-rep', ['received-snippet'], (stateSetter, snippet)=>this.setState({snippet:snippet}))
    registerReaction('code-snippet-modal', 'code-snippets-rep', ['created-snippet', 'updated-snippet'], (stateSetter, snippet)=>{
      this.setState(defaultState())
    })

  }

  componentDidUpdate(prevProps) {
    if(!this.state.isEdit){
      if(typeof hljs == 'undefined'){
        loadScript('codesnippets/highlight.pack.js', ()=>this.setState({}))
        return
      }
      if(ReactDOM.findDOMNode(this)==null){
        this.setState({})
      }
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }

  render(){
    return <CommonModal title="Code snippet" isOpen={this.state.isOpen} styleClass="code-snippet-modal-dialog"
              okHandler={this.state.isEdit && this.state.snippet!=null?()=>okHandler(this):null}
              cancelHandler={()=>fireEvent('code-snippet-modal', 'close')}>
            <div>
              <div style={{display:'inline-block'}}>
                {this.state.snippet!=null && this.state.snippet.id>0?
                    <DeleteButton onClick={()=>fireEvent('code-snippets-rep', 'delete-snippet', [this.state.snippet])}/>
                    :null}
              </div>
              <div style={{display:'inline-block'}}>
                <Button onClick={()=>this.setState({isEdit:!this.state.isEdit})}>{this.state.isEdit?'View':'Edit'}</Button>
              </div>
            </div>
            {content(this)}
          </CommonModal>
  }
}

const okHandler = function(reactcomp){
  if(reactcomp.state.snippet.id>0){
    fireEvent('code-snippets-rep', 'update-snippet', [reactcomp.state.snippet])
  } else {
    fireEvent('code-snippets-rep', 'create-snippet', [reactcomp.state.snippet])
  }
}

const content = function(reactcomp){
  if(reactcomp.state.snippet!=null){
    if(typeof reactcomp.state.snippet == 'string'){
      reactcomp.state.snippet = {id:0, functionid:reactcomp.state.func.id}
    }
    if(reactcomp.state.isEdit){
      return <TextFields content={[codeTextField(reactcomp)]}/>
    } else {
      return <div>
              <pre>
                <code class="java">
                  {reactcomp.state.snippet.code}
                </code>
              </pre>
            </div>
    }
  } else {
    return 'Loading'
  }
}

const codeTextField = function(reactcomp){
  return {
    key: 'codeTextField',
    label: <ControlLabel>Code:</ControlLabel>,
    field: <FormGroup controlId="formBasicText">
                    <FormControl
                                componentClass="textarea"
                                type="input"
                                value={reactcomp.state.snippet.code}
                                placeholder="Code snippet"
                                onChange={(e)=>{reactcomp.state.snippet.code = e.target.value; reactcomp.setState({})}}/>
                </FormGroup>
  }
}
