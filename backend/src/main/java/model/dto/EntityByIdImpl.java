package model.dto;

import com.sogoodlabs.common_mapper.IEntityById;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EntityByIdImpl implements IEntityById {

    @Autowired
    DaoReceiver daoReceiver;

    @Override
    public Object get(long id, Class clazz) {
        Object result =  daoReceiver.getDAO(clazz).findOne(id);
        if(result==null){
            throw new NullPointerException("Enitiy no found by id = " + id+" of class "+ clazz.getName());
        }
        return result;
    }
}
