package com.sogoodlabs.srcreader.controllers.delegates;

import com.sogoodlabs.srcreader.configs.SpringTestConfig;
import com.sogoodlabs.srcreader.model.dao.ICompDao;
import com.sogoodlabs.srcreader.model.dao.IFuncDao;
import com.sogoodlabs.srcreader.model.dao.IFuncFlowDao;
import com.sogoodlabs.srcreader.model.dao.IScenarioDao;
import com.sogoodlabs.srcreader.model.entities.Component;
import com.sogoodlabs.srcreader.model.entities.Func;
import com.sogoodlabs.srcreader.model.entities.FuncFlow;
import com.sogoodlabs.srcreader.model.entities.Scenario;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static junit.framework.TestCase.assertFalse;
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
        function2.setComponent(component);
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

        assertFalse(funcFlowDao.findById(ffRoot1.getId()).isPresent());
        assertFalse(funcFlowDao.findById(ffChild11.getId()).isPresent());
        assertFalse(funcFlowDao.findById(ffChild111.getId()).isPresent());
        assertFalse(funcFlowDao.findById(ffChild12.getId()).isPresent());
        assertFalse(funcFlowDao.findById(ffRoot12.getId()).isPresent());

        assertTrue(funcFlowDao.findById(ffRoot2.getId()).isPresent());

        assertTrue(compDao.findById(component.getId()).isPresent());
        assertTrue(funcDao.findById(function.getId()).isPresent());
        assertTrue(funcDao.findById(function2.getId()).isPresent());
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
