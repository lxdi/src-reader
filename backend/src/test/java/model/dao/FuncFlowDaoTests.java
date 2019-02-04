package model.dao;

import configs.SpringTestConfig;
import model.entities.FuncFlow;
import model.entities.Scenario;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
        parent.setDesc("parent test");
        parent.setScenario(scenario);
        funcFlowDao.save(parent);

        FuncFlow child = new FuncFlow();
        child.setParent(parent);
        child.setDesc("child test");
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
        child.setDesc("root test");
        child.setScenario(scenario);
        funcFlowDao.save(child);

        FuncFlow last = funcFlowDao.findLastAmongRoots(scenario);

        assertTrue(last.getId() == child.getId());

    }

    @Test
    public void saveListTest(){
        Scenario scenario = new Scenario();
        scenario.setTitle("test scenario");
        scenarioDao.save(scenario);

        FuncFlow parent = new FuncFlow();
        parent.setDesc("parent test");
        parent.setScenario(scenario);
        funcFlowDao.save(parent);

        FuncFlow child = new FuncFlow();
        child.setParent(parent);
        child.setDesc("child test");
        child.setScenario(scenario);
        funcFlowDao.save(child);

        List<FuncFlow> list = new ArrayList<>(Arrays.asList(parent, child));

        funcFlowDao.save(list);
    }

    @Test
    public void hideChildrenTest(){
        FuncFlow funcFlow = new FuncFlow();
        funcFlow.setHideChildren(false);
        funcFlowDao.save(funcFlow);

        funcFlowDao.changeHideChildren(funcFlow.getId());
        funcFlow = funcFlowDao.findOne(funcFlow.getId());
        assertTrue(funcFlow.getHideChildren());

        funcFlowDao.changeHideChildren(funcFlow.getId());
        funcFlow = funcFlowDao.findOne(funcFlow.getId());
        assertTrue(!funcFlow.getHideChildren());
    }

}
