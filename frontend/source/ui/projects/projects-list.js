import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

import {ScenariosList} from '../scenarios/scenarios-list'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'

export class ProjectsList extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		registerReaction('projects-list-ui', 'projects-rep', ['projects-received'], (stateSetter)=>this.setState({}))
		registerReaction('projects-list-ui', 'project-modal', ['close'], (stateSetter)=>this.setState({}))
	}

	render() {
		return (
			<div style={{margin:'5px', border:'1px solid lightgrey'}}>
				<div style={{padding:'5px'}}>
					<Button onClick={()=>fireEvent('project-modal', 'open', [{title:''}])}> + Add Project </Button>
				</div>
				<div style={{padding:'5px'}}>
					{getProjectsListUI(this)}
				</div>
			</div>
		)
	}
}

const getProjectsListUI = function(reactcomp){
	const result = []
	const projects = viewStateVal('projects-rep', 'projects')
	if(projects!=null){
		for(var i in projects){
			const curproj = projects[i]
			result.push(<div key={curproj.id} style = {{marginTop:'3px', padding:'3px', border:'1px solid grey'}}>
										<h4>{curproj.title}</h4>
										<ScenariosList projectid = {curproj.id} />
										</div>)
		}
	} else {
		return 'Loading...'
		//fireEvent('projects-rep', 'projects-request')
	}
	return result
}
