import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {sendGet, sendPut, sendPost} from './postoffice'

// registerEvent('projects-rep', 'change-current', (stateSetter, project)=>{
//   sendPost('/project/setcurrent/'+project.id, null, (data)=>{
//     for(var i in viewStateVal('projects-rep', 'projects')){
//       viewStateVal('projects-rep', 'projects')[i].iscurrent = false
//     }
//     viewStateVal('projects-rep', 'projects')[project.id].iscurrent = true
//     stateSetter('current-project', project)
//     fireEvent('projects-rep', 'changed-current')
//   })
// })
//
// registerEvent('projects-rep', 'changed-current', (stateSetter)=>{})
