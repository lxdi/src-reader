import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {sendGet} from './postoffice'
import {makeSplitMap} from '../utils/import-utils'

registerEvent('funcflows-rep', 'funcflows-request', (stateSetter)=>{
  sendGet('/funcflow/all', function(data){
    stateSetter('funcflows', makeSplitMap(data, 'id', 'scenarioid'))
    fireEvent('funcflows-rep', 'funcflows-received')
  })
})

registerEvent('funcflows-rep', 'funcflows-received', (stateSetter)=>{})
