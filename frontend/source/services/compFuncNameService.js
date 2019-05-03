
const splitter = '.'
const javaSplitter = '#'

export const normalizeCompFuncName = function(name){
  const nameNorm = name.replace(javaSplitter, splitter)
  const nameSplitted = nameNorm.split(splitter)
  return nameSplitted[nameSplitted.length-2]+splitter+nameSplitted[nameSplitted.length-1]
}
