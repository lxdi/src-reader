package com.sogoodlabs.srcreader.controllers.delegates;

import com.sogoodlabs.common_mapper.CommonMapper;
import com.sogoodlabs.srcreader.configs.SpringTestConfig;
import com.sogoodlabs.srcreader.model.dao.ICodeSnippetDao;
import com.sogoodlabs.srcreader.model.dao.IFuncDao;
import com.sogoodlabs.srcreader.model.entities.CodeSnippet;
import com.sogoodlabs.srcreader.model.entities.Func;
import org.hibernate.Session;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.HashMap;

import static junit.framework.TestCase.assertTrue;


public class CodeSnippetDelegateTest extends SpringTestConfig {

    @Autowired
    IFuncDao funcDao;

    @Autowired
    ICodeSnippetDao codeSnippetDao;

    @Autowired
    CodeSnippetDelegate codeSnippetDelegate;

    @Autowired
    CommonMapper commonMapper;

    @Autowired
    EntityManager entityManager;

    @Test
    public void createTest(){
        Func function = new Func();
        funcDao.save(function);

        CodeSnippet newSnippet = new CodeSnippet();
        newSnippet.setFunction(function);
        newSnippet.setCode("test code");

        newSnippet = (CodeSnippet) commonMapper.mapToEntity(
                codeSnippetDelegate.create(commonMapper.mapToDto(newSnippet, new HashMap<>())), new CodeSnippet());

        assertTrue(newSnippet.getId()>0);
        assertTrue(newSnippet.getFunction().getId()==function.getId());
        assertTrue(newSnippet.getCode().equals("test code"));

    }

    @Test
    @Transactional
    public void getTest(){
        Func function = new Func();
        funcDao.save(function);

        CodeSnippet newSnippet = new CodeSnippet();
        newSnippet.setFunction(function);
        newSnippet.setCode("test code");
        codeSnippetDao.save(newSnippet);

        entityManager.unwrap(Session.class).getTransaction().commit();

        CodeSnippet snippet = commonMapper.mapToEntity(
                codeSnippetDelegate.get(function.getId()), new CodeSnippet());

        assertTrue(snippet.getId() == newSnippet.getId());
        assertTrue(snippet.getFunction().getId() == newSnippet.getFunction().getId());
        assertTrue(snippet.getCode().equals(newSnippet.getCode()));

    }
}
