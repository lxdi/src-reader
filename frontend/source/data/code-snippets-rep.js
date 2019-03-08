import {registerObject, registerEvent, viewStateVal, fireEvent, registerReaction} from '../utils/eventor'
import {sendGet, sendPut, sendPost, sendDelete} from './postoffice'

const codeSnippetRep = 'code-snippets-rep'

registerEvent(codeSnippetRep, 'create-snippet', (stateSetter, snippet)=>{
  sendPut('/codesnippet/create', snippet, (data)=>{
    var snippets = getOrCreateRep(stateSetter)
    snippets[data.funcid] = data
    fireEvent(codeSnippetRep, 'created-snippet', [data])
  })
})

//registerEvent(codeSnippetRep, 'created-snippet', (stateSetter, snippet)=>snippet)

registerEvent(codeSnippetRep, 'get-snippet', (stateSetter, func)=>{
  sendGet('/codesnippet/by/func/'+func.id, (data)=>{
    var snippets = getOrCreateRep(stateSetter)
    snippets[func.id] = data
    fireEvent(codeSnippetRep, 'received-snippet', [data])
  })
})

//registerEvent(codeSnippetRep, 'received-snippet', (stateSetter, snippet)=>snippet)

registerEvent(codeSnippetRep, 'update-snippet', (stateSetter, snippet)=>{
  sendPost('/codesnippet/update', snippet, (data)=>{
    getOrCreateRep(stateSetter)[snippet.functionid.id] = data
    fireEvent(codeSnippetRep, 'updated-snippet', [data])
  })
})

//registerEvent(codeSnippetRep, 'updated-snippet', (stateSetter, snippet)=>snippet)
const ops = ['created', 'received', 'updated']
ops.forEach((op)=>{registerEvent(codeSnippetRep, op+'-snippet', (stateSetter, snippet)=>snippet)})

const getOrCreateRep = function(stateSetter){
  var snippets = viewStateVal(codeSnippetRep, 'snippets')
  if(snippets==null){
    snippets = []
    stateSetter(codeSnippetRep, snippets)
  }
  return snippets
}
