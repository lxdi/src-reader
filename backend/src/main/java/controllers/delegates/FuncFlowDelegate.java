package controllers.delegates;

import model.dao.IFuncFlowDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.FuncFlow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FuncFlowDelegate {

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    CommonMapper commonMapper;

    public List<Map<String, Object>> getAll(){
        List<Map<String, Object>> result = new ArrayList<>();
        for(FuncFlow funcflow : funcFlowDao.findAll()){
            result.add(commonMapper.mapToDto(funcflow, new HashMap<>()));
        }
        return result;
    }

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

}
