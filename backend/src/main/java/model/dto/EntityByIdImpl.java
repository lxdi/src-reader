package model.dto;

import model.dao.*;
import model.dto.common_mapper.IEntityById;
import model.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntityByIdImpl implements IEntityById {

    @Autowired
    IFuncDao funcDao;

    @Autowired
    IProjectDao projectDao;

    @Autowired
    IScenarioDao scenarioDao;

    @Autowired
    ICompDao compDao;

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Override
    public Object get(long id, Class clazz) {
        if(clazz == Project.class){
            return projectDao.findOne(id);
        }
        if(clazz == Func.class){
            return funcDao.findOne(id);
        }
        if(clazz == Scenario.class){
            return scenarioDao.findOne(id);
        }
        if(clazz == FuncFlow.class){
            return funcFlowDao.findOne(id);
        }
        if(clazz == Component.class){
            return compDao.findOne(id);
        }
        throw new RuntimeException("No DAO for the class - "+clazz.getName());
    }
}
