import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

import {FuncFlows} from '../funcflows/funcflows-list'

import {fireEvent, chkSt, registerEvent, registerReaction} from 'absevents'

//props: projectid
export class ScenariosList extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		const listName = 'scenarios-list-ui-'+this.props.projectid
		registerReaction(listName, 'scenarios-rep', ['scenarios-received', 'updated-scenario', 'received-by-projectid', 'deleted-scenario'], (stateSetter)=>{this.setState({})})
		registerReaction(listName, 'scenario-modal', ['close'], (stateSetter)=>this.setState({}))
	}

	render() {
		return (
			<div style={{margin:'5px'}}>
				<div style={{padding:'5px'}}>
					<Button onClick={()=>fireEvent('scenario-modal', 'open', [{title:'', projectid: this.props.projectid}])} bsStyle='warning' bsSize='small'> + Add Scenario </Button>
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
	const scenarios = chkSt('scenarios-rep', 'scenarios')
	if(scenarios!=null && scenarios[reactcomp.props.projectid]!=null){
		for(var i in scenarios[reactcomp.props.projectid]){
			const curscen = scenarios[reactcomp.props.projectid][i]
			result.push(<div key={curscen.id} style = {{marginTop:'3px', padding:'3px', border:'1px solid orange', borderRadius:'10px'}}>
											<span style={{fontSize:'14pt', marginRight:'5px'}}><a href='#' onClick={()=>hideShowHandler(reactcomp, curscen)}>{curscen.hidden?'+':'-'}</a></span>
											<a href='#' onClick={()=>fireEvent('scenario-modal', 'open', [curscen])}>{curscen.title}</a>
											{!curscen.hidden?<FuncFlows scenario = {curscen} />:null}
										</div>)
		}
	} else {
		fireEvent('scenarios-rep', 'request-by-projectid', [reactcomp.props.projectid])
		return 'Loading...'
	}
	return result
}

const hideShowHandler = function(reactcomp, scenario){
	 scenario.hidden = !scenario.hidden
	 fireEvent('scenarios-rep', 'update-scenario', [scenario])
}
