package com.sogoodlabs.srcreader.controllers.delegates;

import com.sogoodlabs.srcreader.model.dao.ICompDao;
import com.sogoodlabs.srcreader.model.dao.IFuncDao;
import com.sogoodlabs.srcreader.model.entities.Component;
import com.sogoodlabs.srcreader.model.entities.Func;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
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
            result.add(commonMapper.mapToDto(comp));
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
        Component comp = compDao.findById(id).get();
        delete(comp);
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
