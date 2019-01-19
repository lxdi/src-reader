package controllers.delegates;


import model.dao.IScenarioDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.Project;
import model.entities.Scenario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ScenarioDelegate {

    @Autowired
    IScenarioDao scenarioDao;

    @Autowired
    CommonMapper commonMapper;

    public List<Map<String, Object>> getAll(){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Scenario scen : scenarioDao.findAll()){
            result.add(commonMapper.mapToDto(scen, new HashMap<>()));
        }
        return result;
    }

    public Map<String, Object> createNew(Map<String, Object> scenarioDto){
        Scenario scenario = (Scenario) commonMapper.mapToEntity(scenarioDto, new Scenario());
        scenarioDao.save(scenario);
        return commonMapper.mapToDto(scenario, new HashMap<>());
    }

}
