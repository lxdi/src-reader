import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'
import {sendGet, sendPut, sendPost, sendDelete} from './postoffice'
import {makeMap, makeSplitMap, deleteNode} from 'js-utils'
import {iterateLLfull} from 'js-utils'

//registerObject('projects-rep', {projects:[]})

const repAllUrlPat = '/{repName}/all'
const repAllLazyUrlPat = repAllUrlPat + '/lazy'
const setCurUrlPat = '/{repName}/setcurrent/{id}'
const createSimpleUrlPat = '/{repName}/create'
const deleteSimpleUrlPat = '/{repName}/delete/{id}'

const registerCommonEvents = function(){


  receivingSimple('project', true)
  creatingSimple('project')
  updatingSimple('project')
  changingCurrent('project')
  deletingSimple('project')

  //receivingMakingMap('component', 'projectid', true)
  //receivingMakingMap('scenario', 'projectid', true)
  //receivingMakingMap('function', 'componentid', true)
  //receivingMakingMap('funcflow', 'scenarioid', true)

  receivingInMap('scenario', 'project')
  receivingInMap('component', 'project')

  receivingInMapWithTransit('function', 'component', 'project')
  receivingInMapWithTransit('funcflow', 'scenario', 'project')

  creatingInMap('component', 'projectid', false)
  creatingInMap('scenario', 'projectid', false)
  creatingInMap('function', 'componentid', false)
  creatingInMap('funcflow', 'scenarioid', true)

  updatingInMap('funcflow', 'scenarioid')
  updatingInMap('scenario', 'projectid')
  updatingInMap('component', 'projectid')
  updatingInMap('function', 'componentid')

  //updatingList('funcflow')

  deletingInMap('component', 'projectid')
  deletingInMap('function', 'componentid')
  deletingInMap('scenario', 'projectid')
  deletingInMapLL('funcflow', 'scenarioid')

  getFullInMap('component', 'projectid')
  getFullInMap('funcflow', 'scenarioid')
  getFullInMap('function', 'componentid')
  getFullInMap('scenario', 'projectid')

  registerReaction('common-rep', 'projects-rep', 'changed-current', (stateSetter, proj)=>{
    fireEvent('components-rep', 'request-by-projectid', [proj.id])
    fireEvent('functions-rep', 'request-by-projectid', [proj.id])
    fireEvent('scenarios-rep', 'request-by-projectid', [proj.id])
    fireEvent('funcflows-rep', 'request-by-projectid', [proj.id])
  })

}

const receivingSimple = function(repName, withCurrent){
  registerEvent(repName+'s-rep', repName+'s-request', (stateSetter)=>{
    sendGet(repAllUrlPat.replace('{repName}', repName), function(data){
      stateSetter(repName+'s', makeMap(data, 'id'))
      if(withCurrent!=null && withCurrent===true){
        defineCurrent(stateSetter, repName)
      }
      fireEvent(repName+'s-rep', repName+'s-received')
    })
  })
  registerEvent(repName+'s-rep', repName+'s-received', (stateSetter)=>{})
}

const defineCurrent = function(stateSetter, repName){
  const nodes = chkSt(repName+'s-rep', repName+'s')
  for(var id in nodes){
    if(nodes[id].iscurrent){
      stateSetter('current-'+repName, nodes[id])
      fireEvent(repName+'s-rep', 'changed-current', [nodes[id]])
      break;
    }
  }
}

const changingCurrent = function(repName){
  registerEvent(repName+'s-rep', 'change-current', (stateSetter, curobj)=>{
    sendPost(setCurUrlPat.replace('{repName}', repName).replace('{id}', curobj.id), null, (data)=>{
      chkSt(repName+'s-rep', repName+'s').forEach(repObj => repObj.iscurrent = false)
      chkSt(repName+'s-rep', repName+'s')[curobj.id].iscurrent = true
      stateSetter('current-'+repName, curobj)
      fireEvent(repName+'s-rep', 'changed-current', [curobj])
    })
  })
  registerEvent(repName+'s-rep', 'changed-current', (stateSetter, curobj)=>curobj)
}

const creatingSimple = function(repName){
  registerEvent(repName+'s-rep', 'create-'+repName, (stateSetter, newObj)=>{
    sendPut(createSimpleUrlPat.replace('{repName}', repName), newObj, (data)=>{
      chkSt(repName+'s-rep', repName+'s')[data.id] = data
      fireEvent(repName+'s-rep', 'created-'+repName, [data])
    })
  })
  registerEvent(repName+'s-rep', 'created-'+repName, (stateSetter)=>{})
}

const deletingSimple = function(repName){
  registerEvent(repName+'s-rep', 'delete-'+repName, (stateSetter, objToDelete)=>{
    sendDelete(deleteSimpleUrlPat.replace('{repName}', repName).replace('{id}', objToDelete.id), (data)=>{
      delete chkSt(repName+'s-rep', repName+'s')[objToDelete.id]
      fireEvent(repName+'s-rep', 'created-'+repName, [objToDelete])
    })
  })
  registerEvent(repName+'s-rep', 'deleted-'+repName, (stateSetter, obj)=>obj)
}

const receivingMakingMap = function(repName, mapByField, isLazy){
  const url = isLazy!=null && isLazy==true? repAllLazyUrlPat.replace('{repName}', repName): repAllUrlPat.replace('{repName}', repName)
  registerEvent(repName+'s-rep', repName+'s-request', (stateSetter)=>{
    sendGet(url, function(data){
      stateSetter(repName+'s', makeSplitMap(data, 'id', mapByField))
      fireEvent(repName+'s-rep', repName+'s-received')
    })
  })
  registerEvent(repName+'s-rep', repName+'s-received', (stateSetter)=>{})
}

const receivingInMap = function(repName, mapByObj){
  registerEvent(repName+'s-rep', 'request-by-'+mapByObj+'id', (stateSetter, objid)=>{
    sendGet('/'+repName+'/all/lazy/by/'+mapByObj+'/'+objid, (repObjs)=>{
        var importMap = chkSt(repName+'s-rep', repName+'s')
        if(importMap==null){
          importMap = []
          stateSetter(repName+'s', importMap)
        }
        importMap[objid] = []
        repObjs.forEach(repObj => importMap[objid][repObj.id] = repObj)
        fireEvent(repName + 's-rep', 'received-by-'+mapByObj+'id')
    })
  })
  registerEvent(repName + 's-rep', 'received-by-'+mapByObj+'id', (stateSetter)=>{})
}

const receivingInMapWithTransit = function(repName, transitName, mapByObj){
  registerEvent(repName+'s-rep', 'request-by-'+mapByObj+'id', (stateSetter, objid)=>{
    sendGet('/'+repName+'/all/lazy/by/'+mapByObj+'/'+objid, (data)=>{
        var importMap = chkSt(repName+'s-rep', repName+'s')
        if(importMap==null){
          importMap = []
          stateSetter(repName+'s', importMap)
        }
        Object.assign(importMap, makeSplitMap(data, 'id', transitName+'id'))
        fireEvent(repName + 's-rep', 'received-by-'+mapByObj+'id')
    })
  })
  registerEvent(repName + 's-rep', 'received-by-'+mapByObj+'id', (stateSetter)=>{})
}

const getFullInMap = function(repName, mapByField){
  registerEvent(repName+'s-rep', 'get-'+repName, (stateSetter, lazyObj)=>{
    sendGet('/'+repName+'/'+lazyObj.id, (data)=>{
      data.isFull = true
      Object.assign(chkSt(repName+'s-rep', repName+'s')[data[mapByField]][data.id], data)
      fireEvent(repName+'s-rep', 'full-received-'+repName, [chkSt(repName+'s-rep', repName+'s')[data[mapByField]][data.id]])
    })
  })
  registerEvent(repName+'s-rep', 'full-received-'+repName, (stateSetter, fullObj)=>fullObj)
}

const creatingInMap = function(repName, mapByField, isTree){
  registerEvent(repName+'s-rep', 'create-'+repName, (stateSetter, newObj)=>{
    sendPut('/'+repName+'/create', newObj, (data)=>{
      if(chkSt(repName+'s-rep', repName+'s')[data[mapByField]]==null){
        chkSt(repName+'s-rep', repName+'s')[data[mapByField]] = []
      }
      if(isTree!=null && isTree && data.previd!=null){
        chkSt(repName+'s-rep', repName+'s')[data[mapByField]][data.previd].nextid = data.id
      }
      chkSt(repName+'s-rep', repName+'s')[data[mapByField]][data.id] = data

      fireEvent(repName+'s-rep', 'created-'+repName, [data])
    })
  })
  registerEvent(repName+'s-rep', 'created-'+repName, (stateSetter, obj)=>obj)
}

const updatingSimple = function(repName){
  registerEvent(repName+'s-rep', 'update-'+repName, (stateSetter, objToUpdate)=>{
    sendPost('/'+repName+'/update', objToUpdate, (data)=>{
      Object.assign(chkSt(repName+'s-rep', repName+'s')[data.id], data)
      fireEvent(repName+'s-rep', 'updated-'+repName, [chkSt(repName+'s-rep', repName+'s')[data.id]])
    })
  })
  registerEvent(repName+'s-rep', 'updated-'+repName, (stateSetter)=>{})
}

const updatingInMap = function(repName, mapByField){
  registerEvent(repName+'s-rep', 'update-'+repName, (stateSetter, objToUpdate)=>{
    sendPost('/'+repName+'/update', objToUpdate, (data)=>{
      if(chkSt(repName+'s-rep', repName+'s')[data[mapByField]]==null){
        chkSt(repName+'s-rep', repName+'s')[data[mapByField]] = []
      }
      Object.assign(chkSt(repName+'s-rep', repName+'s')[data[mapByField]][data.id], data)
      fireEvent(repName+'s-rep', 'updated-'+repName, [chkSt(repName+'s-rep', repName+'s')[data[mapByField]][data.id]])
    })
  })
  registerEvent(repName+'s-rep', 'updated-'+repName, (stateSetter)=>{})
}

// const updatingList = function(repName){
//   registerEvent(repName+'s-rep', 'update-list-'+repName, (stateSetter, objsToUpdate)=>{
//     sendPost('/'+repName+'/update/list', objsToUpdate, (data)=>{
//       fireEvent(repName+'s-rep', 'updated-list-'+repName)
//     })
//   })
//   registerEvent(repName+'s-rep', 'updated-list-'+repName, (stateSetter)=>{})
// }

const deletingInMap = function(repName, mapByField){
  registerEvent(repName+'s-rep', 'delete-'+repName, (stateSetter, obj)=>{
    sendDelete('/'+repName+'/delete/'+obj.id, ()=>{
      //TODO delete depended objects
      const rep = chkSt(repName+'s-rep', repName+'s')[obj[mapByField]]
      delete rep[obj.id]
      fireEvent(repName+'s-rep', 'deleted-'+repName, [obj])
    })
  })
  registerEvent(repName+'s-rep', 'deleted-'+repName, (stateSetter, obj)=>obj)
}

const deletingInMapLL = function(repName, mapByField){
  registerEvent(repName+'s-rep', 'delete-'+repName, (stateSetter, obj)=>{
    sendDelete('/'+repName+'/delete/'+obj.id, ()=>{
      const rep = chkSt(repName+'s-rep', repName+'s')[obj[mapByField]]
      deleteNode(rep, obj)
      for(var id in rep){
        if(rep[id].parentid==obj.id){
          delete rep[id]
        }
      }
      fireEvent(repName+'s-rep', 'deleted-'+repName, [obj])
    })
  })
  registerEvent(repName+'s-rep', 'deleted-'+repName, (stateSetter, obj)=>obj)
}

registerCommonEvents()
