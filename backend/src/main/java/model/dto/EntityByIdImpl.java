package model.dto;

import model.dao.IFuncDao;
import model.dao.IProjectDao;
import model.dto.common_mapper.IEntityById;
import model.entities.Func;
import model.entities.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntityByIdImpl implements IEntityById {

    @Autowired
    IFuncDao funcDao;

    @Autowired
    IProjectDao projectDao;

    @Override
    public Object get(long id, Class clazz) {
        if(clazz == Project.class){
            return projectDao.findOne(id);
        }
        if(clazz == Func.class){
            return funcDao.findOne(id);
        }
        return null;
    }
}
