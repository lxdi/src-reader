package controllers.delegates;

import model.dao.ICompDao;
import model.dao.IFuncDao;
import model.entities.Component;
import model.entities.Func;
import model.entities.Scenario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ComponentDelegate extends CommonDelegate {

    @Autowired
    ICompDao compDao;

    @Autowired
    IFuncDao funcDao;

    @Autowired
    FuncDelegate funcDelegate;

    @Override
    protected Class getClassDao() {
        return Component.class;
    }

    public List<Map<String, Object>> getByProjectLazy(long projectid){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Component comp : compDao.findByProjectid(projectid)){
            result.add(commonMapper.mapToDtoLazy(comp, new HashMap<>()));
        }
        return result;
    }

    @Override
    protected void validateCreateNew(Object object){
        Component component = (Component) object;
        if(component.getProject()==null){
            throw new RuntimeException("A Component must have a Project");
        }
        if(component.getTitle()==null || component.getTitle().isEmpty()){
            throw new RuntimeException("A Component must have a title");
        }
    }

    @Override
    public void delete(long id){
        Component func = compDao.findOne(id);
        delete(func);
    }

    private void delete(Component comp){
        List<Func> dependedFuncs = funcDao.funcByComp(comp);
        if(dependedFuncs.size()>0){
            dependedFuncs.forEach((func)->{
                funcDelegate.delete(func.getId());
            });
        }
        compDao.delete(comp);
    }

}
