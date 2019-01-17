package model.dto.func;

import model.dao.IFuncDao;
import model.dto.IMapper;
import model.entities.Func;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FuncDtoMapper implements IMapper<FuncDto, Func> {

    @Autowired
    IFuncDao funcDao;

    @Override
    public FuncDto mapToDto(Func entity) {
        FuncDto funcDto = new FuncDto();
        funcDto.setId(entity.getId());
        funcDto.setTitle(entity.getTitle());
        if(entity.getParent()!=null){
            funcDto.setParentid(entity.getParent().getId());
        }
        return funcDto;
    }

    @Override
    public Func mapToEntity(FuncDto dto) {
        Func func = new Func();
        func.setId(dto.getId());
        func.setTitle(dto.getTitle());

        if(dto.getParentid()!=null){
            func.setParent(funcDao.getById(dto.getParentid()));
        }
        return func;
    }
}
