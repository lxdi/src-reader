package controllers.delegates;

import model.dao.IFuncDao;
import model.dto.common_mapper.CommonMapper;
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

//    @Autowired
//    FuncDtoMapper funcDtoMapper;

    public List<Map<String, Object>> getAllFuncs(){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Func func : funcDao.getAll()){
            result.add(commonMapper.mapToDto(func, new HashMap<>()));
        }
        return result;
    }

}
