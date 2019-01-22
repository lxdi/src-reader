import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {sendGet, sendPut} from './postoffice'
import {makeMap, makeSplitMap} from '../utils/import-utils'

//registerObject('projects-rep', {projects:[]})

const registerCommonEvents = function(){
  const repos = ['project']
  for(var i in repos){
    receivingSimple(repos[i])
    creatingSimple(repos[i])
  }

  receivingMakingMap('component', 'projectid')
  receivingMakingMap('scenario', 'projectid')
  receivingMakingMap('function', 'componentid')
  receivingMakingMap('funcflow', 'scenarioid')

  creatingInMap('component', 'projectid', false)
  creatingInMap('scenario', 'projectid', false)
  creatingInMap('function', 'componentid', false)
  creatingInMap('funcflow', 'scenarioid', true)

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

registerCommonEvents()
