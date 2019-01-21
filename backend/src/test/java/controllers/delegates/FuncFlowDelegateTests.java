package controllers.delegates;

import configs.SpringTestConfig;
import model.dao.IFuncFlowDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.FuncFlow;
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

    @Test
    public void createBrandNewTest(){

        FuncFlow newRoot = new FuncFlow();
        newRoot.setTitle("newRoot test");

        Map<String, Object> result = funcFlowDelegate.createNew(commonMapper.mapToDto(newRoot, new HashMap<>()));

        assertTrue((long)result.get("id")>0);
        assertTrue(result.get("previd")==null);
    }

    @Test
    public void createNewTest(){

        FuncFlow parent = new FuncFlow();
        parent.setTitle("parent test");
        funcFlowDao.save(parent);

        FuncFlow child = new FuncFlow();
        child.setParent(parent);
        child.setTitle("child test");
        funcFlowDao.save(child);

        FuncFlow newchild = new FuncFlow();
        newchild.setParent(parent);
        newchild.setTitle("newchild test");

        Map<String, Object> result = funcFlowDelegate.createNew(commonMapper.mapToDto(newchild, new HashMap<>()));

        assertTrue((long)result.get("id")>0);
        assertTrue((long)result.get("previd")==child.getId());
        assertTrue(funcFlowDao.findOne(child.getId()).getNext().getId()==(long)result.get("id"));

    }

    @Test
    public void createNewRootTest(){

        FuncFlow parent = new FuncFlow();
        parent.setTitle("root test");
        funcFlowDao.save(parent);

        FuncFlow newroot = new FuncFlow();
        newroot.setTitle("newroot test");

        Map<String, Object> result = funcFlowDelegate.createNew(commonMapper.mapToDto(newroot, new HashMap<>()));

        assertTrue((long)result.get("id")>0);
        assertTrue((long)result.get("previd")==parent.getId());
        assertTrue(funcFlowDao.findOne(parent.getId()).getNext().getId()==(long)result.get("id"));

    }

}
