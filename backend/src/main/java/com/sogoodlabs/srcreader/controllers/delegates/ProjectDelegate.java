package com.sogoodlabs.srcreader.controllers.delegates;

import com.sogoodlabs.srcreader.model.dao.ICompDao;
import com.sogoodlabs.srcreader.model.dao.IProjectDao;
import com.sogoodlabs.srcreader.model.dao.IScenarioDao;
import com.sogoodlabs.srcreader.model.entities.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectDelegate extends CommonDelegate {

    @Autowired
    IProjectDao projectDao;

    @Autowired
    IScenarioDao scenarioDao;

    @Autowired
    ICompDao compDao;

    @Autowired
    ScenarioDelegate scenarioDelegate;

    @Autowired
    ComponentDelegate componentDelegate;

    @Override
    protected Class getClassDao() {
        return Project.class;
    }

    public void setCurrent(long projid){
        projectDao.setAllCurrentFalse();
        projectDao.setCurrent(projid);
    }

    public void delete(long id){
        scenarioDao.findByProjectid(id).forEach((scenario)->scenarioDelegate.delete(scenario.getId()));
        compDao.findByProjectid(id).forEach((comp)->componentDelegate.delete(comp.getId()));
        projectDao.deleteById(id);
    }


}
