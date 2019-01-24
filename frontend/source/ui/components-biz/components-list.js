import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

import {FunctionsList} from '../functions/functions-list'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'

//props: projectid
export class ComponentsList extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		const listName = 'components-list-ui-'+this.props.projectid
		registerReaction(listName, 'components-rep', ['components-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'component-modal', ['close'], (stateSetter)=>this.setState({}))
		registerReaction(listName, 'function-modal', ['close'], (stateSetter)=>this.setState({}))
	}

	render() {
		return (
			<div style={{margin:'5px'}}>
				<div style={{padding:'5px'}}>
					<Button onClick={()=>fireEvent('component-modal', 'open', [{title:'', projectid: this.props.projectid}])}> + Add Component </Button>
				</div>
				<div style={{padding:'5px'}}>
					{getComponentsListUI(this)}
				</div>
			</div>
		)
	}
}

const getComponentsListUI = function(reactcomp){
	const result = []
	const components = viewStateVal('components-rep', 'components')
	if(components!=null){
		for(var i in components[reactcomp.props.projectid]){
			const curcomp = components[reactcomp.props.projectid][i]
			result.push(<div key={curcomp.id} style = {{marginTop:'3px', padding:'3px', border:'1px solid lightgrey'}}>
											<div>
												<div style={{display:'inline-block'}}>
													<a href='#' onClick={()=>fireEvent('component-modal', 'open', [curcomp])}>{curcomp.title}</a>
												</div>
												<div style={{display:'inline-block', paddingLeft: '3px'}}>
													<Button onClick={()=>fireEvent('function-modal', 'open', [{title:'', componentid: curcomp.id}])} bsSize="xs"> + Add function </Button>
												</div>
											</div>
											<div style={{marginLeft:'20px'}}>
												<FunctionsList componentid={curcomp.id} />
											</div>
										</div>)
		}
	} else {
		return 'Loading...'
	}
	return result
}
