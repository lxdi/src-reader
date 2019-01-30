package controllers.delegates;

import model.dao.IFuncFlowDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.FuncFlow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class FuncFlowDelegate extends CommonDelegate {

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    CommonMapper commonMapper;

    public List<Map<String, Object>> getByScenid(long scenid){
        List<Map<String, Object>> result = new ArrayList<>();
        for(FuncFlow funcFlow : funcFlowDao.findByScenarioid(scenid)){
            result.add(commonMapper.mapToDtoLazy(funcFlow, new HashMap<>()));
        }
        return result;
    }

    @Override
    public Map<String, Object> createNew(Map<String, Object> funcflowDto){
        FuncFlow funcflow = (FuncFlow) commonMapper.mapToEntity(funcflowDto, new FuncFlow());
        if(funcflow.getScenario()==null){
            throw new RuntimeException("A FuncFlow must have a Scenario");
        }
        FuncFlow lastFF = funcflow.getParent()==null?
                funcFlowDao.findLastAmongRoots(funcflow.getScenario())
                :funcFlowDao.findLast(funcflow.getParent(), funcflow.getScenario());
        funcFlowDao.save(funcflow);
        Map<String, Object> funcflowDtoRs = commonMapper.mapToDto(funcflow, new HashMap<>());
        if(lastFF!=null){
            lastFF.setNext(funcflow);
            funcFlowDao.save(lastFF);
            funcflowDtoRs.put("previd", lastFF.getId());
        }
        return funcflowDtoRs;
    }

    @Override
    public void delete(long id){
        FuncFlow funcFlow = funcFlowDao.findOne(id);
        delete(funcFlow);
    }

    private void delete(FuncFlow ff){
        List<FuncFlow> childen = funcFlowDao.findChildren(ff);
        if(childen.size()>0){
            childen.forEach(this::delete);
        }
        FuncFlow prev = funcFlowDao.findPrev(ff);
        if(prev!=null){
            prev.setNext(ff.getNext());
            funcFlowDao.save(prev);
        }
        ff.setNext(null);
        ff.setParent(null);
        funcFlowDao.delete(ff);
    }

    public List<Map<String, Object>> reposition(List<Map<String, Object>> dtoListLazies){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Map<String, Object> dtoLazy : dtoListLazies){
            FuncFlow lazyFF = (FuncFlow) commonMapper.mapToEntity(dtoLazy, new FuncFlow());
            FuncFlow fullFF = funcFlowDao.findOne(lazyFF.getId());
            fullFF.setNext(lazyFF.getNext());
            fullFF.setParent(lazyFF.getParent());
            funcFlowDao.save(fullFF);
            result.add(commonMapper.mapToDtoLazy(fullFF, new HashMap<>()));
        }
        return result;
    }

    @Override
    protected Class getClassDao() {
        return FuncFlow.class;
    }

    @Override
    protected void validateCreateNew(Object obj){
        commonValidation(obj);
    }

    @Override
    protected void validateUpdate(Object obj){
        commonValidation(obj);
    }

    private void commonValidation(Object obj){
        FuncFlow funcFlow = (FuncFlow) obj;
        if(funcFlow.getFunction()==null){
            throw new RuntimeException("A FuncFlow must have a Function");
        }
    }

}
