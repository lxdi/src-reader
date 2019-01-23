package controllers.delegates;

import model.entities.Project;
import org.springframework.stereotype.Service;


@Service
public class ProjectDelegate extends CommonDelegate {

    @Override
    protected Class getClassDao() {
        return Project.class;
    }

}
