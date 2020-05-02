package com.sogoodlabs.srcreader.controllers.delegates;

import com.sogoodlabs.srcreader.configs.SpringTestConfig;
import com.sogoodlabs.srcreader.model.dao.IFuncDao;
import com.sogoodlabs.srcreader.model.dao.IFuncFlowDao;
import com.sogoodlabs.srcreader.model.dao.IScenarioDao;
import com.sogoodlabs.srcreader.model.entities.Func;
import com.sogoodlabs.srcreader.model.entities.FuncFlow;
import com.sogoodlabs.srcreader.model.entities.Scenario;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static junit.framework.TestCase.assertTrue;

public class FuncDelegateTests extends SpringTestConfig {

    @Autowired
    IFuncDao funcDao;

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    IScenarioDao scenarioDao;

    @Autowired
    FuncDelegate funcDelegate;

    @Test
    public void getAllTest(){
        Func func1 = new Func();
        func1.setTitle("super func");
        funcDao.save(func1);

        Func subfunc1 = new Func();
        subfunc1.setTitle("subfunc1");
        funcDao.save(subfunc1);

        Func func2 = new Func();
        func2.setTitle("super func 2");
        funcDao.save(func2);

        List<Func> funcs = funcDao.getAll();

        assertTrue(funcs.size()==3);
    }

    @Test
    public void deletingTest(){

        Func fun1 = new Func();
        funcDao.save(fun1);

        Scenario scenario = new Scenario();
        scenarioDao.save(scenario);

        FuncFlow parent = createFF(scenario, null, null, fun1);

        FuncFlow child2 = createFF(scenario, parent, null, null);
        FuncFlow child1 = createFF(scenario, parent, child2, null);

        funcDelegate.delete(fun1.getId());

        assertTrue(funcDao.findOne(fun1.getId())==null);
        assertTrue(funcFlowDao.findAll().size()==0);

    }

    @Test
    public void deleting2Test(){

        Func fun1 = new Func();
        funcDao.save(fun1);

        Scenario scenario = new Scenario();
        scenarioDao.save(scenario);

        FuncFlow parent = createFF(scenario, null, null, null);

        FuncFlow child2 = createFF(scenario, parent, null, fun1);
        FuncFlow child1 = createFF(scenario, parent, child2, null);

        funcDelegate.delete(fun1.getId());

        assertTrue(funcDao.findOne(fun1.getId())==null);
        assertTrue(funcFlowDao.findAll().size()==2);
        assertTrue(funcFlowDao.findOne(child1.getId())!=null);
        assertTrue(funcFlowDao.findOne(parent.getId())!=null);

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
