package controllers.delegates;


import model.dao.IScenarioDao;
import model.entities.Scenario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScenarioDelegate extends CommonDelegate {

    @Autowired
    IScenarioDao scenarioDao;

    @Override
    protected Class getClassDao() {
        return Scenario.class;
    }

    public void switchSizing(long id){
        Scenario scenario = scenarioDao.findOne(id);
        scenario.setSizing(!scenario.getSizing());
        scenarioDao.save(scenario);
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
