package model.dao;

import configs.SpringTestConfig;
import model.entities.FuncFlow;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static junit.framework.TestCase.assertTrue;

public class FuncFlowDaoTests extends SpringTestConfig {

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Test
    public void findLastWhenOneChildTest(){

        FuncFlow parent = new FuncFlow();
        parent.setTitle("parent test");
        funcFlowDao.save(parent);

        FuncFlow child = new FuncFlow();
        child.setParent(parent);
        child.setTitle("child test");
        funcFlowDao.save(child);

        FuncFlow last = funcFlowDao.findLast(parent);

        assertTrue(last.getId() == child.getId());

    }

    @Test
    public void findLastWhenParentIsNullTest(){

        FuncFlow child = new FuncFlow();
        child.setTitle("root test");
        funcFlowDao.save(child);

        FuncFlow last = funcFlowDao.findLastAmongRoots();

        assertTrue(last.getId() == child.getId());

    }

}
