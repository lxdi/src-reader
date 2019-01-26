package controllers.delegates;

import configs.SpringTestConfig;
import model.dao.IFuncFlowDao;
import model.dao.IScenarioDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.FuncFlow;
import model.entities.Scenario;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

import static junit.framework.TestCase.assertTrue;

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
        assertTrue(funcFlowDao.findOne(child.getId()).getNext().getId()==(long)result.get("id"));

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
        assertTrue(funcFlowDao.findOne(parent.getId()).getNext().getId()==(long)result.get("id"));

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

        assertTrue(funcFlowDao.findOne(child2Child1.getId())==null);
        assertTrue(funcFlowDao.findOne(child2.getId())==null);
        assertTrue(funcFlowDao.findOne(child1.getId()).getNext()==null);

    }

    private FuncFlow createFF(Scenario scenario, FuncFlow parent, FuncFlow next){
        FuncFlow ff = new FuncFlow(scenario);
        ff.setParent(parent);
        ff.setNext(next);
        funcFlowDao.save(ff);
        return ff;
    }

}
