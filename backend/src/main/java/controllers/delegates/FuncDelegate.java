package controllers.delegates;

import model.dao.IFuncDao;
import model.dto.func.FuncDto;
import model.dto.func.FuncDtoMapper;
import model.entities.Func;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FuncDelegate {

    @Autowired
    IFuncDao funcDao;

    @Autowired
    FuncDtoMapper funcDtoMapper;

    public List<FuncDto> getAllFuncs(){
        List<FuncDto> result = new ArrayList<>();
        for(Func func : funcDao.getAll()){
            result.add(funcDtoMapper.mapToDto(func));
        }
        return result;
    }

}
