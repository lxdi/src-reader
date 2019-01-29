import {registerObject, registerEvent, viewStateVal, fireEvent} from '../utils/eventor'
import {sendGet, sendPut, sendPost, sendDelete} from './postoffice'

registerEvent('scenarios-rep', 'switch-sizing', (stateSetter, scenario)=>{
  sendPost('/scenario/sizing/switch/'+scenario.id, null, ()=>{
    scenario.sizing = !scenario.sizing
    fireEvent('scenarios-rep', 'sizing-switched')
  })
})

registerEvent('scenarios-rep', 'sizing-switched', (stateSetter)=>{})
