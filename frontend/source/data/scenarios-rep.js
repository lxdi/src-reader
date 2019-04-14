import {registerObject, registerEvent, chkSt, fireEvent} from 'absevents'
import {sendGet, sendPut, sendPost, sendDelete} from './postoffice'

registerEvent('scenarios-rep', 'switch-sizing', (stateSetter, scenario)=>{
  sendPost('/scenario/sizing/switch/'+scenario.id, null, ()=>{
    scenario.sizing = !scenario.sizing
    fireEvent('scenarios-rep', 'sizing-switched')
  })
})

registerEvent('scenarios-rep', 'sizing-switched', (stateSetter)=>{})

// registerEvent('scenarios-rep', 'request-by-projectid', (stateSetter, projid)=>{
//   sendGet('/scenario/all/lazy/by/project/'+projid, (data)=>{
//       var scenariosMap = chkSt('scenarios-rep', 'scenarios')
//       if(scenariosMap==null){
//         scenariosMap = []
//         stateSetter('scenarios', scenariosMap)
//       }
//       scenariosMap[projid] = []
//       for(var i in data){
//         scenariosMap[projid][data[i].id] = data[i]
//       }
//       fireEvent('scenarios-rep', 'received-by-projectid')
//   })
// })
//
// registerEvent('scenarios-rep', 'received-by-projectid', (stateSetter)=>{})
