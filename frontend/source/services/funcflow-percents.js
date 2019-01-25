import {getFromMappedRepByid} from '../utils/import-utils'
import {viewStateVal} from '../utils/eventor'

export const fillLinesForFuncflows = function(scenarioid){
	const leafsAndRoots = findLeafsAndInvalidatePastVals(viewStateVal('funcflows-rep', 'funcflows')[scenarioid])
	for(var idx in leafsAndRoots.leafs){
		var curff = leafsAndRoots.leafs[idx]
		while(curff!=null){
      if(curff.nativelines==null){
        const func = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), curff.functionid)
        curff.nativelines = func.lines
      }
      curff.allLines = curff.nativelines + curff.sublines
			//const childrenLines = curff.sublines
			if(curff.parentid!=null){
				const parentff = viewStateVal('funcflows-rep', 'funcflows')[scenarioid][curff.parentid]
				parentff.sublines = parentff.sublines + curff.allLines
        curff = parentff
			} else {
				curff = null
			}
		}
	}
	var onehundredInLines = 0;
	for(var idx in leafsAndRoots.roots){
		onehundredInLines = onehundredInLines + leafsAndRoots.roots[idx].allLines
	}
	return onehundredInLines
}

const findLeafsAndInvalidatePastVals = function(rep){
	const funcFlowLinksMap = new Map()
	const roots = []
	for(var id in rep){
    if(rep[id].parentid!=null){
      funcFlowLinksMap.set(rep[rep[id].parentid], true)
    } else {
      roots.push(rep[id])
    }
		if(funcFlowLinksMap.get(rep[id])==null){
			funcFlowLinksMap.set(rep[id], false)
		}
		rep[id].sublines = null
	}

	const leafs = []
	funcFlowLinksMap.forEach((key, entry)=>{
		if(key==false){
			leafs.push(entry)
		}
	})
	return {leafs:leafs, roots:roots}
}
