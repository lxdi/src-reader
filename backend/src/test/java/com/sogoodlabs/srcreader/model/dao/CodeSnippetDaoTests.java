package com.sogoodlabs.srcreader.model.dao;

import com.sogoodlabs.srcreader.configs.SpringTestConfig;
import com.sogoodlabs.srcreader.model.entities.CodeSnippet;
import com.sogoodlabs.srcreader.model.entities.Func;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.Assert.assertTrue;

public class CodeSnippetDaoTests extends SpringTestConfig {

    @Autowired
    ICodeSnippetDao codeSnippetDao;

    @Autowired
    IFuncDao funcDao;

    @Test
    public void checkTest(){
        Func function = new Func();
        funcDao.save(function);

        CodeSnippet codeSnippet = new CodeSnippet();
        codeSnippet.setFunction(function);
        codeSnippetDao.save(codeSnippet);

        CodeSnippet codeSnippet2 = new CodeSnippet();
        codeSnippetDao.save(codeSnippet2);

        assertTrue(codeSnippetDao.checkSnippet(function.getId(), codeSnippet.getId())==1);
        assertTrue(codeSnippetDao.checkSnippet(function.getId(), 67)==0);
        assertTrue(codeSnippetDao.checkSnippet(79, codeSnippet.getId())==0);
        assertTrue(codeSnippetDao.checkSnippet(79, 56)==0);

        assertTrue(codeSnippetDao.checkSnippet(function.getId(), codeSnippet2.getId())==0);
    }
}
