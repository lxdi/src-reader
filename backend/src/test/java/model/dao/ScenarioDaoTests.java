package model.dao;


import configs.SpringTestConfig;
import model.dao.IProjectDao;
import model.dao.IScenarioDao;
import model.entities.Project;
import model.entities.Scenario;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static junit.framework.TestCase.assertTrue;

public class ScenarioDaoTests extends SpringTestConfig {

    @Autowired
    IProjectDao projectDao;

    @Autowired
    IScenarioDao scenarioDao;


    @Test
    public void getByProjectTest(){
        Project project = new Project();
        projectDao.save(project);

        Scenario scenario = new Scenario();
        scenario.setProject(project);
        scenarioDao.save(scenario);

        Scenario scenario2 = new Scenario();
        scenarioDao.save(scenario2);

        List<Scenario> scenarios = scenarioDao.findByProjectid(project.getId());

        assertTrue(scenarios.size()==1);
        assertTrue(scenarios.get(0).getId()==scenario.getId());
    }

}
