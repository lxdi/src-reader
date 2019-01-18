package model.dto.common_mapper;

import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static junit.framework.TestCase.assertTrue;

public class CommonMapperTests {

    @Test
    public void toDtoTest(){
        CommonMapperTestImpl commonMapperTest = new CommonMapperTestImpl();

        TestEntity anotherEntity = new TestEntity();
        anotherEntity.setId(24);

        TestEntity testEntity = new TestEntity();
        testEntity.setId(123);
        testEntity.setTitle("test title");
        testEntity.setAnotherTestEntity(anotherEntity);

        Map<String, String> dto = commonMapperTest.mapToDto(testEntity, new HashMap<>());

        assertTrue(dto.get("title").equals("test title"));
        assertTrue(dto.get("id").equals("123"));
        assertTrue(dto.get("anotherTestEntityid").equals("24"));
        assertTrue(dto.get("anotherTestEntity2id")==null);
    }

    @Test
    public void toEntityTest(){
        CommonMapperTestImpl commonMapperTest = new CommonMapperTestImpl();

        Map<String, String> dto = new HashMap<>();
        dto.put("id", "15");
        dto.put("title", "test title2");

        TestEntity testEntity = commonMapperTest.mapToEntity(dto, new TestEntity());

        assertTrue(testEntity.getId()==15);
        assertTrue(testEntity.getTitle().equals("test title2"));
    }

    @Test
    public void toEntityWhenTitleIsNumberTest(){
        CommonMapperTestImpl commonMapperTest = new CommonMapperTestImpl();

        Map<String, String> dto = new HashMap<>();
        dto.put("id", "15");
        dto.put("title", "45");

        TestEntity testEntity = commonMapperTest.mapToEntity(dto, new TestEntity());

        assertTrue(testEntity.getId()==15);
        assertTrue(testEntity.getTitle().equals("45"));
    }

}
