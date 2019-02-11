import {getFromMappedRepByid} from '../utils/import-utils'
import {viewStateVal} from '../utils/eventor'
import {resolveNodes} from '../utils/draggable-tree-utils'
import {iterateLLfull} from '../utils/linked-list'

export const fillLinesForFuncflows = function(scenarioid){
	const resolved = resolveNodes(viewStateVal('funcflows-rep', 'funcflows')[scenarioid])
	const result = calculateLines(resolved, resolved.root)
	calculateOffsets(viewStateVal('funcflows-rep', 'funcflows')[scenarioid])
	return result
}

const calculateLines = function(resolved, arr){
	var result = 0
	iterateLLfull(arr, (funcflow)=>{
		if(funcflow.functionid!=null){
			funcflow.nativelines = getFromMappedRepByid(viewStateVal('functions-rep', 'functions'), funcflow.functionid).lines
		} else {
			funcflow.nativelines = 0
		}
		if(resolved.children[funcflow.id]!=null){
			funcflow.sublines = calculateLines(resolved, resolved.children[funcflow.id])
		} else {
			funcflow.sublines = 0
		}
		funcflow.allLines = funcflow.nativelines + funcflow.sublines
		result = result + funcflow.allLines
	})
	return result
}

const calculateOffsets = function(rep){
	const resolved = resolveNodes(rep)
	calculateOffsetsInArrs(resolved, resolved.root, 0)
}

const calculateOffsetsInArrs = function(resolved, arr, initialOffset){
	var offset = initialOffset
	iterateLLfull(arr, (funcflow)=>{
		funcflow.offset = offset
		offset = offset + getNumber(funcflow.allLines)
		if(resolved.children[funcflow.id]!=null){
				calculateOffsetsInArrs(resolved, resolved.children[funcflow.id], (getNumber(funcflow.offset)+getNumber(funcflow.nativelines)))
		}
	})
}

const getNumber = function(val){
	if(val!=null){
		return Number.parseInt(val)
	} else {
		return 0
	}
}
