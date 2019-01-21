import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {sendGet, sendPut} from './postoffice'
import {makeSplitMap} from '../utils/import-utils'

registerEvent('funcflows-rep', 'funcflows-request', (stateSetter)=>{
  sendGet('/funcflow/all', function(data){
    stateSetter('funcflows', makeSplitMap(data, 'id', 'scenarioid'))
    fireEvent('funcflows-rep', 'funcflows-received')
  })
})

registerEvent('funcflows-rep', 'funcflows-received', (stateSetter)=>{})


registerEvent('funcflows-rep', 'create-funcflow', (stateSetter, newfuncflow)=>{
  sendPut('/funcflow/create', newfuncflow, (data)=>{
    if(viewStateVal('funcflows-rep', 'funcflows')[data.scenarioid]==null){
      viewStateVal('funcflows-rep', 'funcflows')[data.scenarioid] = []
    }
    if(data.previd!=null){
      viewStateVal('funcflows-rep', 'funcflows')[data.scenarioid][data.previd].nextid = data.id
    }
    viewStateVal('funcflows-rep', 'funcflows')[data.scenarioid][data.id] = data
    fireEvent('funcflows-rep', 'created-funcflow', [data])
  })
})

registerEvent('funcflows-rep', 'created-funcflow', (stateSetter)=>{})
