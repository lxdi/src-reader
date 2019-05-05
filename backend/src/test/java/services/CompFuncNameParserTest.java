package services;

import configs.SpringTestConfig;
import model.dao.*;
import model.entities.*;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import static junit.framework.TestCase.assertTrue;

@Transactional
public class CompFuncNameParserTest extends SpringTestConfig {

    @Autowired
    ICompDao compDao;

    @Autowired
    IFuncDao funcDao;

    @Autowired
    IScenarioDao scenarioDao;

    @Autowired
    IProjectDao projectDao;

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    CompFuncNameParser compFuncNameParser;

    @Test
    public void parseTest(){
        Project project = new Project();
        projectDao.save(project);

        Scenario scenario = new Scenario();
        scenario.setProject(project);
        scenarioDao.save(scenario);

        Component comp = createComp("comp1", project);
        Func func = createFunc("func11", comp);

        FuncFlow rootFF = createFF(scenario, null, null, null, func);
        FuncFlow child4 = createFF(scenario, "$comp3.func31", rootFF, null, null);
        FuncFlow child3 = createFF(scenario, "comp2.func21", rootFF, child4, null);
        FuncFlow child2 = createFF(scenario, "comp1.func11", rootFF, child3, null);
        FuncFlow child1 = createFF(scenario, "comp1.func12", rootFF, child2, null);

        compFuncNameParser.parse(scenario);

        assertTrue(compDao.findByTitle("comp2")!=null);
        assertTrue(funcDao.findByTitle("func21")!=null);
        assertTrue(funcDao.findByTitle("func21").getComponent().getId()==compDao.findByTitle("comp2").getId());
        assertTrue(funcDao.findByTitle("func12").getComponent().getId()==compDao.findByTitle("comp1").getId());

        assertTrue(funcFlowDao.findOne(child1.getId()).getFunction().getId()==funcDao.findByTitle("func12").getId());
        assertTrue(funcFlowDao.findOne(child2.getId()).getFunction().getId()==funcDao.findByTitle("func11").getId());
        assertTrue(funcFlowDao.findOne(child3.getId()).getFunction().getId()==funcDao.findByTitle("func21").getId());
        assertTrue(funcFlowDao.findOne(child4.getId()).getFunction()==null);
        assertTrue(compDao.findByTitle("$comp3")==null);
        assertTrue(compDao.findByTitle("comp3")==null);

    }

    private Component createComp(String title, Project project){
        Component component = new Component();
        component.setProject(project);
        component.setTitle(title);
        compDao.save(component);
        return component;
    }

    private Func createFunc(String title, Component component){
        Func func = new Func();
        func.setTitle(title);
        func.setComponent(component);
        funcDao.save(func);
        return func;
    }

    private FuncFlow createFF(Scenario scenario, String compFuncName, FuncFlow parent, FuncFlow next, Func func){
        FuncFlow funcFlow = new FuncFlow();
        funcFlow.setScenario(scenario);
        funcFlow.setCompFuncString(compFuncName);
        funcFlow.setParent(parent);
        funcFlow.setNext(next);
        funcFlow.setFunction(func);
        funcFlowDao.save(funcFlow);
        return funcFlow;
    }
}
