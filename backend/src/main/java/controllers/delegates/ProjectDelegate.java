package controllers.delegates;

import model.dao.IProjectDao;
import model.entities.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ProjectDelegate extends CommonDelegate {

    @Autowired
    IProjectDao projectDao;

    @Override
    protected Class getClassDao() {
        return Project.class;
    }

    public void setCurrent(long projid){
        projectDao.setAllCurrentFalse();
        projectDao.setCurrent(projid);
    }

}
