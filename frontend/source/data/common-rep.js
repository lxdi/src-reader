import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {sendGet, sendPut, sendPost} from './postoffice'
import {makeMap, makeSplitMap} from '../utils/import-utils'

//registerObject('projects-rep', {projects:[]})

const registerCommonEvents = function(){

  receivingSimple('project')
  creatingSimple('project')
  updatingSimple('project')

  receivingMakingMap('component', 'projectid')
  receivingMakingMap('scenario', 'projectid')
  receivingMakingMap('function', 'componentid')
  receivingMakingMap('funcflow', 'scenarioid')

  creatingInMap('component', 'projectid', false)
  creatingInMap('scenario', 'projectid', false)
  creatingInMap('function', 'componentid', false)
  creatingInMap('funcflow', 'scenarioid', true)

  updatingInMap('funcflow', 'scenarioid')
  updatingInMap('scenario', 'projectid')
  updatingInMap('component', 'projectid')
  updatingInMap('function', 'componentid')

  updatingList('funcflow')

}

const receivingSimple = function(repName){
  registerEvent(repName+'s-rep', repName+'s-request', (stateSetter)=>{
    sendGet('/'+repName+'/all', function(data){
      stateSetter(repName+'s', makeMap(data, 'id'))
      fireEvent(repName+'s-rep', repName+'s-received')
    })
  })
  registerEvent(repName+'s-rep', repName+'s-received', (stateSetter)=>{})
}

const creatingSimple = function(repName){
  registerEvent(repName+'s-rep', 'create-'+repName, (stateSetter, newObj)=>{
    sendPut('/'+repName+'/create', newObj, (data)=>{
      viewStateVal(repName+'s-rep', repName+'s')[data.id] = data
      fireEvent(repName+'s-rep', 'created-'+repName, [data])
    })
  })
  registerEvent(repName+'s-rep', 'created-'+repName, (stateSetter)=>{})
}

const receivingMakingMap = function(repName, mapByField){
  registerEvent(repName+'s-rep', repName+'s-request', (stateSetter)=>{
    sendGet('/'+repName+'/all', function(data){
      stateSetter(repName+'s', makeSplitMap(data, 'id', mapByField))
      fireEvent(repName+'s-rep', repName+'s-received')
    })
  })
  registerEvent(repName+'s-rep', repName+'s-received', (stateSetter)=>{})
}

const creatingInMap = function(repName, mapByField, isTree){
  registerEvent(repName+'s-rep', 'create-'+repName, (stateSetter, newObj)=>{
    sendPut('/'+repName+'/create', newObj, (data)=>{
      if(viewStateVal(repName+'s-rep', repName+'s')[data[mapByField]]==null){
        viewStateVal(repName+'s-rep', repName+'s')[data[mapByField]] = []
      }
      if(isTree!=null && isTree && data.previd!=null){
        viewStateVal(repName+'s-rep', repName+'s')[data[mapByField]][data.previd].nextid = data.id
      }
      viewStateVal(repName+'s-rep', repName+'s')[data[mapByField]][data.id] = data

      fireEvent(repName+'s-rep', 'created-'+repName, [data])
    })
  })
  registerEvent(repName+'s-rep', 'created-'+repName, (stateSetter)=>{})
}

const updatingSimple = function(repName){
  registerEvent(repName+'s-rep', 'update-'+repName, (stateSetter, objToUpdate)=>{
    sendPost('/'+repName+'/update', objToUpdate, (data)=>{
      Object.assign(viewStateVal(repName+'s-rep', repName+'s')[data.id], data)
      fireEvent(repName+'s-rep', 'updated-'+repName, [viewStateVal(repName+'s-rep', repName+'s')[data.id]])
    })
  })
  registerEvent(repName+'s-rep', 'updated-'+repName, (stateSetter)=>{})
}

const updatingInMap = function(repName, mapByField){
  registerEvent(repName+'s-rep', 'update-'+repName, (stateSetter, objToUpdate)=>{
    sendPost('/'+repName+'/update', objToUpdate, (data)=>{
      if(viewStateVal(repName+'s-rep', repName+'s')[data[mapByField]]==null){
        viewStateVal(repName+'s-rep', repName+'s')[data[mapByField]] = []
      }
      Object.assign(viewStateVal(repName+'s-rep', repName+'s')[data[mapByField]][data.id], data)
      fireEvent(repName+'s-rep', 'updated-'+repName, [viewStateVal(repName+'s-rep', repName+'s')[data[mapByField]][data.id]])
    })
  })
  registerEvent(repName+'s-rep', 'updated-'+repName, (stateSetter)=>{})
}

const updatingList = function(repName){
  registerEvent(repName+'s-rep', 'update-list-'+repName, (stateSetter, objsToUpdate)=>{
    sendPost('/'+repName+'/update/list', objsToUpdate, (data)=>{
      fireEvent(repName+'s-rep', 'updated-list-'+repName)
    })
  })
  registerEvent(repName+'s-rep', 'updated-list-'+repName, (stateSetter)=>{})
}

registerCommonEvents()
