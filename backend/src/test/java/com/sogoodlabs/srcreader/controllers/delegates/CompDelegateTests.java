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

public class CompDelegateTests extends SpringTestConfig {

    @Autowired
    IFuncDao funcDao;

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    IScenarioDao scenarioDao;

    @Autowired
    ComponentDelegate componentDelegate;

    @Autowired
    ICompDao compDao;

    @Test
    public void deletingTest(){

        Component comp = new Component();
        compDao.save(comp);

        Func fun1 = new Func();
        fun1.setComponent(comp);
        funcDao.save(fun1);

        Func fun2 = new Func();
        fun1.setComponent(comp);
        funcDao.save(fun2);

        Scenario scenario = new Scenario();
        scenarioDao.save(scenario);

        FuncFlow parent = createFF(scenario, null, null, fun1);

        FuncFlow child2 = createFF(scenario, parent, null, null);
        FuncFlow child1 = createFF(scenario, parent, child2, null);

        FuncFlow parent2 = createFF(scenario, null, null, fun2);
        FuncFlow parent3 = createFF(scenario, null, null, null);

        componentDelegate.delete(comp.getId());

        assertFalse(funcDao.findById(fun1.getId()).isPresent());
        assertTrue(funcDao.findById(fun2.getId()).isPresent());
        assertTrue(funcFlowDao.findAll().size()==2);
        assertTrue(funcFlowDao.findById(parent2.getId()).isPresent());
        assertTrue(funcFlowDao.findById(parent3.getId()).isPresent());
        assertFalse(funcFlowDao.findById(child2.getId()).isPresent());
        assertFalse(funcFlowDao.findById(child1.getId()).isPresent());

    }

    private FuncFlow createFF(Scenario scenario, FuncFlow parent, FuncFlow next, Func func){
        FuncFlow ff = new FuncFlow(scenario);
        ff.setParent(parent);
        ff.setNext(next);
        ff.setFunction(func);
        funcFlowDao.save(ff);
        return ff;
    }

}
