package controllers.delegates;

import com.sogoodlabs.common_mapper.CommonMapper;
import model.dto.DaoReceiver;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

abstract public class CommonDelegate {

    @Autowired
    DaoReceiver daoReceiver;

    @Autowired
    CommonMapper commonMapper;

    public List<Map<String, Object>> getAll(){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Object obj : daoReceiver.getDAO(this.getClassDao()).findAll()){
            result.add(commonMapper.mapToDto(obj, new HashMap<>()));
        }
        return result;
    }

    public List<Map<String, Object>> getAllLazy(){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Object obj : daoReceiver.getDAO(this.getClassDao()).findAll()){
            result.add(commonMapper.mapToDtoLazy(obj, new HashMap<>()));
        }
        return result;
    }

    public Map<String, Object> getFull(long id){
        return commonMapper.mapToDto(daoReceiver.getDAO(this.getClassDao()).findOne(id), new HashMap<>());
    }

    public Map<String, Object> createNew(Map<String, Object> objDto){
        Object obj = unmarshall(objDto);
        this.validateCreateNew(obj);
        daoReceiver.getDAO(this.getClassDao()).save(obj);
        return commonMapper.mapToDto(obj, new HashMap<>());
    }

    public Map<String, Object> update(Map<String, Object> objDto){
        Object obj = unmarshall(objDto);
        this.validateUpdate(obj);
        daoReceiver.getDAO(this.getClassDao()).save(obj);
        return commonMapper.mapToDto(obj, new HashMap<>());
    }

    public List<Map<String, Object>> updateList(List<Map<String, Object>> dtoList){
        List objs = new ArrayList();
        for(Map<String, Object> dto : dtoList){
            Object obj = unmarshall(dto);
            this.validateUpdate(obj);
            objs.add(obj);
        }
        daoReceiver.getDAO(this.getClassDao()).save(objs);

        List<Map<String, Object>> result = new ArrayList<>();
        objs.forEach(obj->result.add(commonMapper.mapToDto(obj, new HashMap<>())));

        return result;
    }

    public void delete(long id){
        this.validateDelete(id);
        daoReceiver.getDAO(this.getClassDao()).delete(id);
    }

    private Object unmarshall(Map<String, Object> objDto){
        Object obj = null;
        try {
            obj = commonMapper.mapToEntity(objDto, this.getClassDao().newInstance());
        } catch (Exception e) {
            new RuntimeException(e.getMessage());
        }
        return obj;
    }

    protected abstract Class getClassDao();

    protected void validateCreateNew(Object obj){}

    protected void validateUpdate(Object obj){}

    protected void validateDelete(long id){}

}
