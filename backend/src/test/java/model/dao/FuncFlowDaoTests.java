package model.dao;

import configs.SpringTestConfig;
import model.entities.FuncFlow;
import model.entities.Scenario;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static junit.framework.TestCase.assertTrue;

public class FuncFlowDaoTests extends SpringTestConfig {

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    IScenarioDao scenarioDao;

    @Test
    public void findLastWhenOneChildTest(){

        Scenario scenario = new Scenario();
        scenario.setTitle("test scenario");
        scenarioDao.save(scenario);

        FuncFlow parent = new FuncFlow();
        parent.setTitle("parent test");
        parent.setScenario(scenario);
        funcFlowDao.save(parent);

        FuncFlow child = new FuncFlow();
        child.setParent(parent);
        child.setTitle("child test");
        child.setScenario(scenario);
        funcFlowDao.save(child);

        FuncFlow last = funcFlowDao.findLast(parent, scenario);

        assertTrue(last.getId() == child.getId());

    }

    @Test
    public void findLastWhenParentIsNullTest(){

        Scenario scenario = new Scenario();
        scenario.setTitle("test scenario");
        scenarioDao.save(scenario);

        FuncFlow child = new FuncFlow();
        child.setTitle("root test");
        child.setScenario(scenario);
        funcFlowDao.save(child);

        FuncFlow last = funcFlowDao.findLastAmongRoots(scenario);

        assertTrue(last.getId() == child.getId());

    }

}
