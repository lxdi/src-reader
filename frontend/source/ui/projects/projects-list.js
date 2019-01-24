import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

import {ScenariosList} from '../scenarios/scenarios-list'

import {fireEvent, viewStateVal, registerEvent, registerReaction} from '../../utils/eventor'

export class ProjectsList extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
		registerReaction('projects-list-ui', 'projects-rep', ['projects-received', 'changed-current'], (stateSetter)=>this.setState({}))
		registerReaction('projects-list-ui', 'project-modal', ['close'], (stateSetter)=>this.setState({}))
	}

	render() {
		return <div style={{padding:'5px'}}>
							<table style={{width:'100%', border:'1px solid grey'}}>
								<tr>
									<td style={{width:'200px', verticalAlign:'top', borderRight:'1px solid lightgrey', borderRight:'2px solid DeepSkyBlue'}}>
										{getProjectsListUI(this)}
										<div style={{padding:'5px'}}>
											<a href='#' onClick={()=>fireEvent('project-modal', 'open', [{title:''}])} bsSize='small' bsStyle='primary'> + Add Project </a>
										</div>
									</td>
									<td style={{verticalAlign:'top'}}>
										{scenariosByCurrentProject(this)}
									</td>
								</tr>
							</table>
						</div>
	}
}

// <div style={{display:'inline-block', padding:'3px'}}>
// 	<input type="radio" autocomplete="off" checked={curproj.iscurrent?"checked":null} style={{marginRight:'5px', marginLeft:'5px'}}
// 				onClick={()=>fireEvent('projects-rep', 'change-current', [curproj])} />
// </div>


const getProjectsListUI = function(reactcomp){
	const result = []
	result.push(<div key={'title'} style={{borderBottom:'1px solid grey', textAlign:'center', color:'DeepSkyBlue'}}>
								<h4>Projects</h4>
						</div>)
	const projects = viewStateVal('projects-rep', 'projects')
	if(projects!=null){
		for(var i in projects){
			const curproj = projects[i]
			result.push(<div key={''+curproj.id+'_'+curproj.iscurrent}
												style={{borderBottom: (curproj.iscurrent?'2px solid DeepSkyBlue':'1px solid lightgrey'), padding:'5px', backgroundColor: curproj.iscurrent?'AliceBlue': 'none'}}
												class='project-select'
												onClick={()=>fireEvent('projects-rep', 'change-current', [curproj])}>
										{curproj.iscurrent? <span style={{fontWeight:'bold', color:'DeepSkyBlue'}}>{curproj.title}</span>:curproj.title}
								</div>)
		}
	} else {
		return 'Loading...'
		//fireEvent('projects-rep', 'projects-request')
	}
	return result
}

const scenariosByCurrentProject = function(reactcomp){
	const curproj = viewStateVal('projects-rep', 'current-project')
	if(curproj!=null){
		return <div key={curproj.id} style = {{marginTop:'3px', padding:'3px'}}>
									<div style={{marginLeft:'10px'}}>
										<h4><a href='#' onClick={()=>fireEvent('project-modal', 'open', [curproj])}>{curproj.title}</a></h4>
									</div>
									<ScenariosList projectid = {curproj.id} />
									</div>
	}
}
