package controllers.delegates;

import model.dao.ICompDao;
import model.dao.IFuncDao;
import model.entities.Component;
import model.entities.Func;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
