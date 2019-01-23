package model.dto;

import model.dao.*;
import model.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class DaoReceiver {

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

    public JpaRepository getDAO(Class clazz){
        if(clazz == Project.class){
            return projectDao;
        }
        if(clazz == Func.class){
            return funcDao;
        }
        if(clazz == Scenario.class){
            return scenarioDao;
        }
        if(clazz == FuncFlow.class){
            return funcFlowDao;
        }
        if(clazz == Component.class){
            return compDao;
        }
        throw new RuntimeException("No DAO for the class - "+clazz.getName());
    }

}
