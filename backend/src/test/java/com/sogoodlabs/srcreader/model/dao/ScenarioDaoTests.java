package com.sogoodlabs.srcreader.model.dao;


import com.sogoodlabs.srcreader.configs.SpringTestConfig;
import com.sogoodlabs.srcreader.model.entities.Project;
import com.sogoodlabs.srcreader.model.entities.Scenario;
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
