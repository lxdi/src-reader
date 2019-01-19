import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {sendGet, sendPut} from './postoffice'
import {makeMap} from '../utils/import-utils'

//registerObject('projects-rep', {projects:[]})

const registerCommonEvents = function(){
  const repos = ['project', 'component', 'function']
  for(var i in repos){
    receiving(repos[i])
    creating(repos[i])
  }
}

const receiving = function(repName){
  registerEvent(repName+'s-rep', repName+'s-request', (stateSetter)=>{
    sendGet('/'+repName+'/all', function(data){
      stateSetter(repName+'s', makeMap(data, 'id'))
      fireEvent(repName+'s-rep', repName+'s-received')
    })
  })
  registerEvent(repName+'s-rep', repName+'s-received', (stateSetter)=>{})
}

const creating = function(repName){
  registerEvent(repName+'s-rep', 'create-'+repName, (stateSetter, newObj)=>{
    sendPut('/'+repName+'/create', newObj, (data)=>{
      viewStateVal(repName+'s-rep', repName+'s')[data.id] = data
      fireEvent(repName+'s-rep', 'created-'+repName, [data])
    })
  })
  registerEvent(repName+'s-rep', 'created-'+repName, (stateSetter)=>{})
}

registerCommonEvents()
