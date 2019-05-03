import {normalizeCompFuncName} from '../../source/services/compFuncNameService'

describe('compFuncNameService tests', ()=>{
  test('basic test with dots', ()=>{
    expect(normalizeCompFuncName('somePackage.compName.funcName')).toBe('compName.funcName')
    expect(normalizeCompFuncName('compName.funcName')).toBe('compName.funcName')
    expect(normalizeCompFuncName('org.spring.framework.AbstractConetxt.refresh')).toBe('AbstractConetxt.refresh')

  })

  test('basic test java', ()=>{
    expect(normalizeCompFuncName('somePackage.someComponent#someFunction')).toBe('someComponent.someFunction')
    expect(normalizeCompFuncName('someComponent#someFunction')).toBe('someComponent.someFunction')
  })
})
