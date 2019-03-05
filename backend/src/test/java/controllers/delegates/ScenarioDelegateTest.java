package controllers.delegates;

import configs.SpringTestConfig;
import model.dao.ICompDao;
import model.dao.IFuncDao;
import model.dao.IFuncFlowDao;
import model.dao.IScenarioDao;
import model.entities.Component;
import model.entities.Func;
import model.entities.FuncFlow;
import model.entities.Scenario;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static junit.framework.TestCase.assertTrue;

public class ScenarioDelegateTest extends SpringTestConfig {

    @Autowired
    IScenarioDao scenarioDao;

    @Autowired
    ICompDao compDao;

    @Autowired
    IFuncDao funcDao;

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    ScenarioDelegate scenarioDelegate;

    @Test
    public void deletingTest(){

        Component component = new Component();
        compDao.save(component);

        Func function = new Func();
        function.setComponent(component);
        funcDao.save(function);

        Func function2 = new Func();
        function.setComponent(component);
        funcDao.save(function2);

        Scenario scenario = new Scenario();
        scenarioDao.save(scenario);

        Scenario scenario2 = new Scenario();
        scenarioDao.save(scenario2);

        FuncFlow ffRoot1 = createFF(scenario, function, null);
        FuncFlow ffChild11 = createFF(scenario, function2, ffRoot1);
        FuncFlow ffChild111 = createFF(scenario, function2, ffChild11);
        FuncFlow ffChild12 = createFF(scenario, function2, ffRoot1);

        FuncFlow ffRoot12 = createFF(scenario, function2, null);

        FuncFlow ffRoot2 = createFF(scenario2, function, null);

        scenarioDelegate.delete(scenario.getId());

        assertTrue(funcFlowDao.findOne(ffRoot1.getId())==null);
        assertTrue(funcFlowDao.findOne(ffChild11.getId())==null);
        assertTrue(funcFlowDao.findOne(ffChild111.getId())==null);
        assertTrue(funcFlowDao.findOne(ffChild12.getId())==null);
        assertTrue(funcFlowDao.findOne(ffRoot12.getId())==null);

        assertTrue(funcFlowDao.findOne(ffRoot2.getId())!=null);

        assertTrue(compDao.findOne(component.getId())!=null);
        assertTrue(funcDao.findOne(function.getId())!=null);
        assertTrue(funcDao.findOne(function2.getId())!=null);
    }

    private FuncFlow createFF(Scenario scenario, Func func, FuncFlow parent){
        FuncFlow ff = new FuncFlow();
        ff.setScenario(scenario);
        ff.setFunction(func);
        ff.setParent(parent);
        funcFlowDao.save(ff);
        return ff;
    }

}
