import React from 'react';
import ReactDOM from 'react-dom';

import {Modal, Button} from 'react-bootstrap'


export class CommonModal extends React.Component{
  render(){
    return (
      <Modal show={this.props.isOpen} dialogClassName={this.props.styleClass}>
            <Modal.Header>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <div style={{margin:'5px'}}>
              {this.props.children}
            </div>
            <Modal.Footer>
              {this.props.cancelHandler!=null?<Button onClick={this.props.cancelHandler}>Cancel</Button>:null}
              {this.props.okHandler!=null?<Button bsStyle="primary" onClick={this.props.okHandler} >Ok</Button>:null}
            </Modal.Footer>
      </Modal>
    )
  }
}
