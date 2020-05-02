package com.sogoodlabs.srcreader.controllers.delegates;

import com.sogoodlabs.srcreader.configs.SpringTestConfig;
import com.sogoodlabs.srcreader.model.dao.*;
import com.sogoodlabs.srcreader.model.entities.*;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;

public class ProjectDelegateTest extends SpringTestConfig {

    @Autowired
    IProjectDao projectDao;

    @Autowired
    IScenarioDao scenarioDao;

    @Autowired
    ICompDao compDao;

    @Autowired
    IFuncDao funcDao;

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    ProjectDelegate projectDelegate;

    @Test
    public void deletingTest(){
        Project project0 = new Project();
        projectDao.save(project0);

        Scenario scenario0 = new Scenario();
        scenario0.setProject(project0);
        scenarioDao.save(scenario0);

        Component component0 = new Component();
        component0.setProject(project0);
        compDao.save(component0);

        Project project = new Project();
        projectDao.save(project);

        Component component = new Component();
        component.setProject(project);
        compDao.save(component);

        Func function = new Func();
        function.setComponent(component);
        funcDao.save(function);

        Func function2 = new Func();
        function2.setComponent(component);
        funcDao.save(function2);

        Scenario scenario = new Scenario();
        scenario.setProject(project);
        scenarioDao.save(scenario);

        Scenario scenario2 = new Scenario();
        scenario2.setProject(project);
        scenarioDao.save(scenario2);

        FuncFlow ffRoot1 = createFF(scenario, function, null);
        FuncFlow ffChild11 = createFF(scenario, function2, ffRoot1);
        FuncFlow ffChild111 = createFF(scenario, function2, ffChild11);
        FuncFlow ffChild12 = createFF(scenario, function2, ffRoot1);

        FuncFlow ffRoot12 = createFF(scenario, function2, null);

        FuncFlow ffRoot2 = createFF(scenario2, function, null);

        projectDelegate.delete(project.getId());

        assertFalse(projectDao.findById(project.getId()).isPresent());
        assertFalse(compDao.findById(component.getId()).isPresent());
        assertFalse(funcDao.findById(function.getId()).isPresent());
        assertFalse(funcDao.findById(function2.getId()).isPresent());
        assertFalse(scenarioDao.findById(scenario.getId()).isPresent());
        assertFalse(scenarioDao.findById(scenario2.getId()).isPresent());
        assertFalse(funcFlowDao.findById(ffRoot1.getId()).isPresent());
        assertFalse(funcFlowDao.findById(ffRoot2.getId()).isPresent());

        assertTrue(projectDao.findById(project0.getId()).isPresent());
        assertTrue(compDao.findById(component0.getId()).isPresent());
        assertTrue(scenarioDao.findById(scenario0.getId()).isPresent());

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
