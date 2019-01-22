package controllers.delegates;

import model.dao.IFuncDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.Component;
import model.entities.Func;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FuncDelegate {

    @Autowired
    IFuncDao funcDao;

    @Autowired
    CommonMapper commonMapper;

    public List<Map<String, Object>> getAllFuncs(){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Func func : funcDao.findAll()){
            result.add(commonMapper.mapToDto(func, new HashMap<>()));
        }
        return result;
    }

    public Map<String, Object> createNew(Map<String, Object> projectDto){
        Func func = (Func) commonMapper.mapToEntity(projectDto, new Func());
        if(func.getComponent()==null){
            throw new RuntimeException("A Function must have a Component");
        }
        funcDao.save(func);
        return commonMapper.mapToDto(func, new HashMap<>());
    }

}
