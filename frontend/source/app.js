import React from 'react';
import ReactDOM from 'react-dom';

import './data/common-rep'
import './data/functions-rep'
import './data/scenarios-rep'
import './data/funcflows-rep'

import {ProjectsList} from './ui/projects/projects-list'
import {ProjectModal} from './ui/projects/project-modal'
import {ScenarioModal} from './ui/scenarios/scenario-modal'
import {FuncflowModal} from './ui/funcflows/funcflow-modal'
import {ComponentModal} from './ui/components-biz/component-modal'

import {fireEvent} from './utils/eventor'

ReactDOM.render(<div id="app" />, document.body);
const app = document.getElementById("app");

class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {}

		fireEvent('projects-rep', 'projects-request')
		fireEvent('components-rep', 'components-request')
		fireEvent('functions-rep', 'functions-request')
		fireEvent('scenarios-rep', 'scenarios-request')
		fireEvent('funcflows-rep', 'funcflows-request')
	}

	render() {
		return (
			<div>
				<div>
					<ProjectModal/>
					<ScenarioModal/>
					<FuncflowModal/>
					<ComponentModal/>
				</div>
				<div>
					<ProjectsList/>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<Main />, app);
