package controllers.delegates;

import model.dao.IFuncFlowDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.FuncFlow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FuncFlowDelegate extends CommonDelegate {

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    CommonMapper commonMapper;

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
        funcFlowDao.delete(ff);
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
