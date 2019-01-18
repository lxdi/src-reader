package model.dto.common_mapper;

import model.dto.IEntityById;

public class CommonMapperTestImpl extends CommonMapper<TestEntity> {
    @Override
    protected IEntityById getEntityById() {
        return null;
    }
}
