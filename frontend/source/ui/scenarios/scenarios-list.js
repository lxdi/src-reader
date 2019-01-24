import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

import {FuncFlows} from '../funcflows/funcflows-list'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'

//props: projectid
export class ScenariosList extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		const listName = 'scenarios-list-ui-'+this.props.projectid
		registerReaction(listName, 'scenarios-rep', ['scenarios-received'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'scenario-modal', ['close'], (stateSetter)=>this.setState({}))
	}

	render() {
		return (
			<div style={{margin:'5px'}}>
				<div style={{padding:'5px'}}>
					<Button onClick={()=>fireEvent('scenario-modal', 'open', [{title:'', projectid: this.props.projectid}])}> + Add Scenario </Button>
				</div>
				<div style={{padding:'5px'}}>
					{getScenariosListUI(this)}
				</div>
			</div>
		)
	}
}

const getScenariosListUI = function(reactcomp){
	const result = []
	const scenarios = viewStateVal('scenarios-rep', 'scenarios')
	if(scenarios!=null){
		for(var i in scenarios[reactcomp.props.projectid]){
			const curscen = scenarios[reactcomp.props.projectid][i]
			result.push(<div key={curscen.id} style = {{marginTop:'3px', padding:'3px', border:'1px solid lightgrey'}}>
											<a href='#' onClick={()=>fireEvent('scenario-modal', 'open', [curscen])}>{curscen.title}</a>
											<FuncFlows scenarioid = {curscen.id} />
										</div>)
		}
	} else {
		return 'Loading...'
	}
	return result
}
