import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {resolveNodes} from '../utils/draggable-tree-utils'
import {findLast} from '../utils/linked-list'

registerObject('functions-rep', {funcs:[]})

var indexCount = 0;

registerEvent('functions-rep', 'add-func', (stateSetter, func)=>{
  func.id = indexCount++;
  const resolvedNode = resolveNodes(viewStateVal('functions-rep', 'funcs'))
  const lastNode = func.parentid==null? findLast(resolvedNode.root): findLast(resolvedNode.children[func.parentid])
  if(lastNode!=null){
    lastNode.nextid = func.id
  }
  viewStateVal('functions-rep', 'funcs')[func.id] = func
  fireEvent('functions-rep', 'func-added')
})

registerEvent('functions-rep', 'func-added', (stateSetter)=>{})
