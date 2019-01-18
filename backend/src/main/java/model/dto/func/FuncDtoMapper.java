package model.dto.func;

import model.dao.ICompDao;
import model.dao.IFuncDao;
import model.dto.IMapper;
import model.entities.Func;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FuncDtoMapper implements IMapper<FuncDto, Func> {

    @Autowired
    IFuncDao funcDao;

    @Autowired
    ICompDao compDao;

    @Override
    public FuncDto mapToDto(Func entity) {
        FuncDto funcDto = new FuncDto();
        funcDto.setId(entity.getId());
        funcDto.setTitle(entity.getTitle());
        if(entity.getComponent()!=null){
            funcDto.setComponentid(entity.getComponent().getId());
        }
        return funcDto;
    }

    @Override
    public Func mapToEntity(FuncDto dto) {
        Func func = new Func();
        func.setId(dto.getId());
        func.setTitle(dto.getTitle());

        func.setComponent(compDao.getById(dto.getComponentid()));

        return func;
    }
}
