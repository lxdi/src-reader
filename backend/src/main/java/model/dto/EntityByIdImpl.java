package model.dto;

import model.dto.common_mapper.IEntityById;
import model.entities.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntityByIdImpl implements IEntityById {

    @Autowired
    DaoReceiver daoReceiver;

    @Override
    public Object get(long id, Class clazz) {
        return daoReceiver.getDAO(clazz).findOne(id);
    }
}
