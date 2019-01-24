import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'

//props: componentid
export class FunctionsList extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		const listName = 'functions-list-ui-'+this.props.componentid
		registerReaction(listName, 'functions-rep', ['functions-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'functions-modal', ['close'], (stateSetter)=>this.setState({}))
	}

	render() {
		return (
			<div style={{margin:'5px'}}>
				<div style={{padding:'5px'}}>
					{getfunctionsListUI(this)}
				</div>
			</div>
		)
	}
}

const getfunctionsListUI = function(reactcomp){
	const result = []
	const functions = viewStateVal('functions-rep', 'functions')
	if(functions!=null){
		for(var i in functions[reactcomp.props.componentid]){
			const curfunc = functions[reactcomp.props.componentid][i]
			result.push(<div key={curfunc.id}>
											<a href='#' onClick={()=>fireEvent('function-modal', 'open', [curfunc])}>{curfunc.title}</a>
										</div>)
		}
	} else {
		return 'Loading...'
	}
	return result
}
