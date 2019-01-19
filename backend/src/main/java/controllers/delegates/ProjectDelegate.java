package controllers.delegates;

import model.dao.IProjectDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectDelegate {


    @Autowired
    IProjectDao projectDao;

    @Autowired
    CommonMapper commonMapper;

    public List<Map<String, Object>> getAll(){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Project func : projectDao.findAll()){
            result.add(commonMapper.mapToDto(func, new HashMap<>()));
        }
        return result;
    }

    public Map<String, Object> createNew(Map<String, Object> projectDto){
        Project project = (Project) commonMapper.mapToEntity(projectDto, new Project());
        projectDao.save(project);
        return commonMapper.mapToDto(project, new HashMap<>());
    }

}
