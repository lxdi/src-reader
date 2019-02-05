import React from 'react';
import ReactDOM from 'react-dom';
import {iterateLLfull} from '../../../utils/linked-list'
import {mergeArrays, resolveNodes, replaceDraggableUtil, addAsChildDraggableUtil} from '../../../utils/draggable-tree-utils'

const offsetVal = 20

// - - isEdit false by default
// 31012019 - removed style:'inline-block' in draggableWrapper
// 5022019 - passing cache to viewCallback

// props: nodes, viewCallback(node, level, children)
// props (not required): isEdit(default: false), onDragStartCallback(draggableNode) onDropCallback(alteredList)
// props(styles): rootStyle, groupStyle, childrenStyle, shiftpx
// nodes - map, access by id;  node - {id, parentid, nextid}
export class TreeComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
    this.onDragOver = this.onDragOver.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  onDragOver(e, node, type){
    var altered = null
    if(node!=e.draggableNode && this.props.isEdit==true){
      if(type=='replace'){
        altered = replaceDraggableUtil(this.props.nodes, null, node, e.draggableNode, this.state.cache)
      }
      if(type=='addchild'){
        altered = addAsChildDraggableUtil(this.props.nodes, node, e.draggableNode, this.state.cache)
      }
      if(this.state.altered==null){
        this.setState({altered: altered})
      } else {
        mergeArrays(this.state.altered, altered)
        this.setState({})
      }
    }
  }

  onDrop(e){
    if(this.props.isEdit==true){
      if(this.state.altered!=null && this.state.altered.length>0 && this.props.onDropCallback!=null){
        this.props.onDropCallback(this.state.altered)
      }
      this.setState({altered:null})
    }
  }

  render(){
    if(this.props.isEdit==null){
      this.props.isEdit = false
    }
    return(
      <div>
          <div onDrop={(e)=>this.onDrop(e)} onDragOver={(e)=>e.preventDefault()}>
            {nodesView(this)}
            {this.props.isEdit==true? addChildDiv(this, null) :null}
          </div>
      </div>
    )
  }
}

const nodesView = function(component){
        const result = []
        component.state.cache = resolveNodes(component.props.nodes)
        iterateLLfull(component.state.cache.root, (node)=>{
          result.push(<div style={component.props.rootStyle}>
              {nodeUI(component, node, 0)}
            </div>)
        })
        return result
}

const nodeUI = function(component, node, level){
  const nextLevel = level + 1
  const shiftPx = component.props.shiftpx!=null? component.props.shiftpx: offsetVal
  const childrenStyle = component.props.childrenStyle!=null?component.props.childrenStyle:{}
  Object.assign(childrenStyle, {paddingLeft:shiftPx})
  return <div key={'node_'+node.id} style={component.props.groupStyle}>
          {draggableWrapper(component, node, component.props.viewCallback(node, level, component.state.cache))}
          <div style={childrenStyle}>
            {node.hideChildren==null || (node.hideChildren!=null && node.hideChildren==false)? childrenNodeUI(component, node, nextLevel):null}
          </div>
        </div>
}

const draggableWrapper = function(component, node, content){
    return <div
                    draggable='true'
                    onDragStart={(e)=>{e.draggableNode = node; if(component.props.onDragStartCallback!=null) component.props.onDragStartCallback(node)}}
                    onDragOver={(e)=>{e.preventDefault(); component.onDragOver(e, node, 'replace')}}>
                {content}
              </div>
}

const childrenNodeUI = function(component, node, level){
  const children = component.state.cache.children[node.id]
  const childrenUI = []
  if(children!=null){
    iterateLLfull(children, (childNode)=>{childrenUI.push(nodeUI(component, childNode, level))})
  } else {
    if(component.props.isEdit==true){
      childrenUI.push(addChildDiv(component, node))
    }
  }
  return childrenUI
}

const styleForAddAsChild = {width:'80px', color:'lightgrey', fontSize: '10px', border: '1px dotted lightgrey', borderRadius: '5px', padding: '3px'}

const addChildDiv = function(component, node){
  return <div style={styleForAddAsChild} onDragOver={(e)=>{e.preventDefault(); component.onDragOver(e, node, 'addchild')}}>
                + Add as a child
              </div>
}
