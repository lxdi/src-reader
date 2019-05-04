package services;

import model.dao.ICompDao;
import model.dao.IFuncDao;
import model.dao.IFuncFlowDao;
import model.dao.IScenarioDao;
import model.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CompFuncNameParser {

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    ICompDao compDao;

    @Autowired
    IFuncDao funcDao;

    public void parse(Scenario scenario){
        if(scenario!=null){
            List<FuncFlow> funcflows = funcFlowDao.findByWithEmptyFuncScenarioId(scenario.getId());
            funcflows.forEach(ff->{
                if(ff.getCompFuncString()!=null && !ff.getCompFuncString().isEmpty()){
                    String[] compFunc = ff.getCompFuncString().split("\\.");
                    Project project = scenario.getProject();
                    ff.setFunction(getOrCreateFunction(compFunc[1], getOrCreateComponent(compFunc[0], project)));
                }
            });
        }

    }

    private Component getOrCreateComponent(String title, Project project){
        Component component = compDao.findByTitle(title);
        if(component==null){
            component = new Component();
            component.setTitle(title);
            component.setProject(project);
            compDao.save(component);
        }
        return component;
    }

    private Func getOrCreateFunction(String title, Component component){
        Func func = funcDao.findByTitleAndCompId(title, component.getId());
        if(func==null){
            func = new Func();
            func.setTitle(title);
            func.setComponent(component);
            funcDao.save(func);
        }
        return func;
    }

}
