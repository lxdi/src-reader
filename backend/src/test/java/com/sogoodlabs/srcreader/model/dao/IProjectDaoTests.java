package com.sogoodlabs.srcreader.model.dao;

import com.sogoodlabs.srcreader.configs.SpringTestConfig;
import com.sogoodlabs.srcreader.model.entities.Project;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static junit.framework.TestCase.assertTrue;

public class IProjectDaoTests extends SpringTestConfig {

    @Autowired
    IProjectDao projectDao;

    @Test
    public void setAllCurrentFalseTest(){
        Project proj1 = new Project();
        proj1.setIscurrent(true);
        projectDao.save(proj1);

        Project proj2 = new Project();
        proj2.setIscurrent(true);
        projectDao.save(proj2);

        projectDao.setAllCurrentFalse();

        assertTrue(!projectDao.findById(proj1.getId()).get().getIscurrent());
        assertTrue(!projectDao.findById(proj2.getId()).get().getIscurrent());

    }

    @Test
    public void setCurrentTest(){
        Project proj1 = new Project();
        proj1.setIscurrent(false);
        projectDao.save(proj1);

        Project proj2 = new Project();
        proj2.setIscurrent(false);
        projectDao.save(proj2);

        Project proj3 = new Project();
        proj3.setIscurrent(false);
        projectDao.save(proj3);

        projectDao.setCurrent(proj2.getId());

        assertTrue(!projectDao.findById(proj1.getId()).get().getIscurrent());
        assertTrue(projectDao.findById(proj2.getId()).get().getIscurrent());
        assertTrue(!projectDao.findById(proj3.getId()).get().getIscurrent());

    }

}
