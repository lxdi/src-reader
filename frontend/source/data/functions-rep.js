import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {resolveNodes} from '../utils/draggable-tree-utils'
import {findLast} from '../utils/linked-list'

registerObject('functions-rep', {nodes:[]})

var indexCount = 0;

registerEvent('functions-rep', 'add-func', (stateSetter, func)=>{
  func.id = indexCount++;
  const resolvedNode = resolveNodes(viewStateVal('functions-rep', 'nodes'))
  const lastFromRoot = findLast(resolveNodes.root)
  if(lastFromRoot!=null){
    lastFromRoot.nextid = func.id
  }
  viewStateVal('functions-rep', 'nodes')[func.id] = func
  fireEvent('functions-rep', 'func-added')
})

registerEvent('functions-rep', 'func-added', (stateSetter)=>{})
