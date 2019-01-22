import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {sendGet, sendPut} from './postoffice'
import {makeSplitMap} from '../utils/import-utils'

// registerEvent('scenarios-rep', 'scenarios-request', (stateSetter)=>{
//   sendGet('/scenario/all', function(data){
//     stateSetter('scenarios', makeSplitMap(data, 'id', 'projectid'))
//     fireEvent('scenarios-rep', 'scenarios-received')
//   })
// })
//
// registerEvent('scenarios-rep', 'scenarios-received', (stateSetter)=>{})
// 
// registerEvent('scenarios-rep', 'create-scenario', (stateSetter, newScenario)=>{
//   sendPut('/scenario/create', newScenario, (data)=>{
//     if(viewStateVal('scenarios-rep', 'scenarios')[data.projectid]==null){
//       viewStateVal('scenarios-rep', 'scenarios')[data.projectid] = []
//     }
//     viewStateVal('scenarios-rep', 'scenarios')[data.projectid][data.id] = data
//     fireEvent('scenarios-rep', 'created-scenario', [data])
//   })
// })
//
// registerEvent('scenarios-rep', 'created-scenario', (stateSetter)=>{})
