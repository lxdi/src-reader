package com.sogoodlabs.srcreader.model.dao;

import com.sogoodlabs.srcreader.configs.SpringTestConfig;
import com.sogoodlabs.srcreader.model.entities.Func;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static junit.framework.TestCase.assertTrue;

public class FuncDaoTests extends SpringTestConfig {

    @Autowired
    IFuncDao funcDao;

    @Test
    public void getByIdTest(){
        Func func = new Func();
        func.setTitle("test func");
        funcDao.save(func);

        Func funcLoaded = funcDao.findById(func.getId()).get();
        assertTrue(funcLoaded.getTitle().equals(func.getTitle()));
    }

}
