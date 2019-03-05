import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'

//props: onClick
export class DeleteButton extends React.Component{
  constructor(props){
    super(props)
    this.state = {showDelete:false}
  }

  render(){
    return <div>
          {this.state.showDelete?
                <Button onClick={this.props.onClick} bsStyle="danger">Delete</Button>
                :<Button onClick={()=>this.setState({showDelete:true})}>Delete</Button>}
          </div>
  }
}
