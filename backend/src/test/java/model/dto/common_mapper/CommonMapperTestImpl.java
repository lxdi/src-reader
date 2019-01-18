package model.dto.common_mapper;

import model.dto.IEntityById;

public class CommonMapperTestImpl extends CommonMapper<TestEntity> {

    @Override
    protected IEntityById getEntityById(long id, Class clazz) {
        return null;
    }
}
