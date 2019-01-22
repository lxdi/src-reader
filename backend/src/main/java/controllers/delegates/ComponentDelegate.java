package controllers.delegates;

import model.dao.ICompDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.Component;
import model.entities.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ComponentDelegate {

    @Autowired
    ICompDao compDao;

    @Autowired
    CommonMapper commonMapper;

    public List<Map<String, Object>> getAll(){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Component comp : compDao.findAll()){
            result.add(commonMapper.mapToDto(comp, new HashMap<>()));
        }
        return result;
    }

    public Map<String, Object> createNew(Map<String, Object> projectDto){
        Component component = (Component) commonMapper.mapToEntity(projectDto, new Component());
        if(component.getProject()==null){
            throw new RuntimeException("A Component must have a Project");
        }
        compDao.save(component);
        return commonMapper.mapToDto(component, new HashMap<>());
    }

}
