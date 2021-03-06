package com.sogoodlabs.srcreader.controllers.delegates;

import com.sogoodlabs.common_mapper.CommonMapper;
import com.sogoodlabs.srcreader.configs.SpringTestConfig;
import com.sogoodlabs.srcreader.model.dao.IFuncFlowDao;
import com.sogoodlabs.srcreader.model.dao.IScenarioDao;
import com.sogoodlabs.srcreader.model.entities.FuncFlow;
import com.sogoodlabs.srcreader.model.entities.Scenario;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

import static junit.framework.TestCase.assertFalse;
import static junit.framework.TestCase.assertTrue;

@Transactional
public class FuncFlowDelegateTests extends SpringTestConfig {

    @Autowired
    FuncFlowDelegate funcFlowDelegate;

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    CommonMapper commonMapper;

    @Autowired
    IScenarioDao scenarioDao;

    @Test
    public void createBrandNewTest(){

        Scenario scenario = new Scenario();
        scenario.setTitle("test scenario");
        scenarioDao.save(scenario);

        FuncFlow newRoot = new FuncFlow();
        newRoot.setScenario(scenario);
        newRoot.setDesc("newRoot test");

        Map<String, Object> result = funcFlowDelegate.createNew(commonMapper.mapToDto(newRoot, new HashMap<>()));

        assertTrue((long)result.get("id")>0);
        assertTrue(result.get("previd")==null);
    }

    @Test
    public void createNewTest(){

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

        FuncFlow newchild = new FuncFlow();
        newchild.setParent(parent);
        newchild.setScenario(scenario);
        newchild.setDesc("newchild test");

        Map<String, Object> result = funcFlowDelegate.createNew(commonMapper.mapToDto(newchild, new HashMap<>()));

        assertTrue((long)result.get("id")>0);
        assertTrue((long)result.get("previd")==child.getId());
        assertTrue(funcFlowDao.findById(child.getId()).get().getNext().getId()==(long)result.get("id"));

    }

    @Test
    public void createNewRootTest(){

        Scenario scenario = new Scenario();
        scenario.setTitle("test scenario");
        scenarioDao.save(scenario);

        FuncFlow parent = new FuncFlow();
        parent.setDesc("root test");
        parent.setScenario(scenario);
        funcFlowDao.save(parent);

        FuncFlow newroot = new FuncFlow();
        newroot.setScenario(scenario);
        newroot.setDesc("newroot test");

        Map<String, Object> result = funcFlowDelegate.createNew(commonMapper.mapToDto(newroot, new HashMap<>()));

        assertTrue((long)result.get("id")>0);
        assertTrue((long)result.get("previd")==parent.getId());
        assertTrue(funcFlowDao.findById(parent.getId()).get().getNext().getId()==(long)result.get("id"));

    }

    @Test
    public void deletingTest(){
        Scenario scenario = new Scenario();
        scenarioDao.save(scenario);

        FuncFlow parent = createFF(scenario, null, null);

        FuncFlow child2 = createFF(scenario, parent, null);
        FuncFlow child1 = createFF(scenario, parent, child2);

        FuncFlow child2Child1 = createFF(scenario, child2, null);

        funcFlowDelegate.delete(child2.getId());

        assertFalse(funcFlowDao.findById(child2Child1.getId()).isPresent());
        assertFalse(funcFlowDao.findById(child2.getId()).isPresent());
        assertTrue(funcFlowDao.findById(child1.getId()).get().getNext()==null);

    }

    @Test
    public void deletingParentTest(){
        Scenario scenario = new Scenario();
        scenarioDao.save(scenario);

        FuncFlow parent = createFF(scenario, null, null);

        FuncFlow child2 = createFF(scenario, parent, null);
        FuncFlow child1 = createFF(scenario, parent, child2);

        FuncFlow child2Child1 = createFF(scenario, child2, null);

        funcFlowDelegate.delete(parent.getId());

        assertFalse(funcFlowDao.findById(parent.getId()).isPresent());
        assertFalse(funcFlowDao.findById(child2Child1.getId()).isPresent());
        assertFalse(funcFlowDao.findById(child2.getId()).isPresent());
        assertFalse(funcFlowDao.findById(child1.getId()).isPresent());

    }

    @Test
    public void repositionTest(){

        FuncFlow parent = createFF(null, null, null);
        FuncFlow child2= createFF(null, parent, null);
        FuncFlow child= createFF(null, parent, child2);

        child2.setParent(null);
        child.setNext(null);
        parent.setNext(child2);

        List<Map<String, Object>> dtoLazies = Arrays.asList(
                commonMapper.mapToDto(child2),
                commonMapper.mapToDto(child),
                commonMapper.mapToDto(parent)
        );

        List<Map<String, Object>> result = funcFlowDelegate.reposition(dtoLazies);

        assertTrue(funcFlowDao.findById(child2.getId()).get().getParent()==null);
        assertTrue(funcFlowDao.findById(child.getId()).get().getNext()==null);
        assertTrue(funcFlowDao.findById(parent.getId()).get().getNext().getId()==child2.getId());


    }

    private FuncFlow createFF(Scenario scenario, FuncFlow parent, FuncFlow next){
        FuncFlow ff = new FuncFlow(scenario);
        ff.setParent(parent);
        ff.setNext(next);
        funcFlowDao.save(ff);
        return ff;
    }

}
