import React from 'react';
import ReactDOM from 'react-dom';
import {ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap'

//props: title, colors(array of strings), callback(newval)
export class ColorChooser extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return <ButtonGroup>
              <DropdownButton title={this.props.title} bsSize="small" onSelect={(newval, e)=>this.props.callback(newval)}>
                {getMenuItems(this.props.colors)}
              </DropdownButton>
          </ButtonGroup>
  }
}

const getMenuItems = function(colors){
  const result = []
  for(var i in colors){
    result.push( <MenuItem eventKey={colors[i]} key={colors[i]}>
                                      <div>
                                        <div style={{display:'inline-block', width:'20px', height:'15px', backgroundColor:colors[i]}}></div>
                                        <div style={{marginLeft:'5px', display:'inline-block'}}>{colors[i]}</div>
                                      </div>
                                    </MenuItem>)
  }
  return result
}
