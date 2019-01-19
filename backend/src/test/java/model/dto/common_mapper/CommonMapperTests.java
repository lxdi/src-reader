package model.dto.common_mapper;

import model.dto.IEntityById;
import org.junit.Before;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static junit.framework.TestCase.assertTrue;

public class CommonMapperTests {

    TestEntity testEntityFromEntityById = new TestEntity();

    IEntityById entityById = new IEntityById() {
        @Override
        public Object get(long id, Class clazz) {
            if(TestEntity.class == clazz){
                if(id==56){
                    return testEntityFromEntityById;
                }
            }
            return null;
        }
    };

    @Before
    public void init(){
        testEntityFromEntityById.setId(56);
        testEntityFromEntityById.setTitle("test entity from entityById");
    }

    @Test
    public void toDtoTest(){
        CommonMapper commonMapperTest = new CommonMapper(entityById);

        TestEntity anotherEntity = new TestEntity();
        anotherEntity.setId(24);

        TestEntity testEntity = new TestEntity();
        testEntity.setId(123);
        testEntity.setTitle("test title");
        testEntity.setAnotherTestEntity(anotherEntity);
        testEntity.setTestEnum(TestEnum.val1);

        Map<String, Object> dto = commonMapperTest.mapToDto(testEntity, new HashMap<>());

        assertTrue(dto.get("title").equals("test title"));
        assertTrue((long)dto.get("id")==123);
        assertTrue((long)dto.get("anotherTestEntityid")==24);
        assertTrue(dto.get("anotherTestEntity2id")==null);
        assertTrue(dto.get("testEnum").equals("val_1"));
    }

    @Test
    public void toEntityTest(){
        CommonMapper commonMapperTest = new CommonMapper(entityById);

        Map<String, Object> dto = new HashMap<>();
        dto.put("id", "15");
        dto.put("title", "test title2");
        dto.put("testEnum", "val_1");
        dto.put("anotherTestEntity2id", 56);
        dto.put("anotherTestEntityid", null);

        dto.put("notExisting", "someval");
        dto.put("notExistingid", 43);
        dto.put("notExisting2id", "someval");

        TestEntity testEntity = (TestEntity) commonMapperTest.mapToEntity(dto, new TestEntity());

        assertTrue(testEntity.getId()==15);
        assertTrue(testEntity.getTitle().equals("test title2"));
        assertTrue(testEntity.getTestEnum()==TestEnum.val1);
        assertTrue(testEntity.getAnotherTestEntity2()==testEntityFromEntityById);
        assertTrue(testEntity.getAnotherTestEntity()==null);
    }

    @Test
    public void toEntityWhenTitleIsNumberTest(){
        CommonMapper commonMapperTest = new CommonMapper(entityById);

        Map<String, Object> dto = new HashMap<>();
        dto.put("id", "15");
        dto.put("title", "45");

        TestEntity testEntity = (TestEntity) commonMapperTest.mapToEntity(dto, new TestEntity());

        assertTrue(testEntity.getId()==15);
        assertTrue(testEntity.getTitle().equals("45"));
    }

}
