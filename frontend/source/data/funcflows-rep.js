import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'
import {sendGet, sendPut, sendPost, sendDelete} from './postoffice'

registerEvent('funcflows-rep', 'hide-show-children', (stateSetter, ff)=>{
  sendPost('/funcflow/hidechildren/'+ff.id, null, ()=>{
    ff.hideChildren = !ff.hideChildren
    fireEvent('funcflows-rep', 'children-hidden-shown', [ff])
  })
})

registerEvent('funcflows-rep', 'children-hidden-shown', (stateSetter, ff)=>ff)

registerEvent('funcflows-rep', 'reposition-list', (stateSetter, ffs)=>{
  sendPost('funcflow/reposition/list', ffs, (data)=>{
    fireEvent('funcflows-rep', 'repositioned-list')
  })
})

registerEvent('funcflows-rep', 'repositioned-list', (stateSetter)=>{})
