package controllers.delegates;


import model.dao.IScenarioDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.Scenario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScenarioDelegate extends CommonDelegate {

    @Autowired
    IScenarioDao scenarioDao;

    @Autowired
    CommonMapper commonMapper;

    @Override
    protected Class getClassDao() {
        return Scenario.class;
    }

    public void switchSizing(long id){
        Scenario scenario = scenarioDao.findOne(id);
        scenario.setSizing(!scenario.getSizing());
        scenarioDao.save(scenario);
    }

    public List<Map<String, Object>> getByProjectLazy(long projectid){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Scenario scenario : scenarioDao.findByProjectid(projectid)){
            result.add(commonMapper.mapToDtoLazy(scenario, new HashMap<>()));
        }
        return result;
    }

    @Override
    protected void validateCreateNew(Object obj){
        commonValidation(obj);
    }

    @Override
    protected void validateUpdate(Object obj){
        commonValidation(obj);
        Scenario scenario = (Scenario) obj;
        if(scenario.getId()<=0){
            throw new RuntimeException("Only persisted Scenario can be updated");
        }
    }

    private void commonValidation(Object obj){
        Scenario scenario = (Scenario) obj;
        if(scenario.getProject()==null){
            throw new RuntimeException("A Scenario must have a Project");
        }
        if(scenario.getTitle()==null || scenario.getTitle().isEmpty()){
            throw new RuntimeException("A Scenario must have a title");
        }
    }

}
