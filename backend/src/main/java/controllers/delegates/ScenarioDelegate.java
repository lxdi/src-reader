package controllers.delegates;


import model.entities.Scenario;
import org.springframework.stereotype.Service;

@Service
public class ScenarioDelegate extends CommonDelegate {

    @Override
    protected Class getClassDao() {
        return Scenario.class;
    }

    @Override
    protected void validateCreateNew(Object obj){
        Scenario scenario = (Scenario) obj;
        if(scenario.getProject()==null){
            throw new RuntimeException("A Scenario must have a Project");
        }
    }

    @Override
    protected void validateUpdate(Object obj){
        Scenario scenario = (Scenario) obj;
        if(scenario.getProject()==null){
            throw new RuntimeException("A Scenario must have a Project");
        }
        if(scenario.getId()<=0){
            throw new RuntimeException("Only persisted Scenario can be updated");
        }
    }

}
