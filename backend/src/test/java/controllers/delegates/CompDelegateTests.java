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
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

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

        assertTrue(funcDao.findOne(fun1.getId())==null);
        assertTrue(funcDao.findOne(fun2.getId())!=null);
        assertTrue(funcFlowDao.findAll().size()==2);
        assertTrue(funcFlowDao.findOne(parent2.getId())!=null);
        assertTrue(funcFlowDao.findOne(parent3.getId())!=null);
        assertTrue(funcFlowDao.findOne(child2.getId())==null);
        assertTrue(funcFlowDao.findOne(child1.getId())==null);

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
