package model.dto.common_mapper;

import org.junit.Test;

import java.util.Map;

import static junit.framework.TestCase.assertTrue;

public class CommonMapperTests {

    @Test
    public void ToDtoTest(){
        CommonMapperTestImpl commonMapperTest = new CommonMapperTestImpl();

        TestEntity anotherEntity = new TestEntity();
        anotherEntity.setId(24);

        TestEntity testEntity = new TestEntity();
        testEntity.setId(123);
        testEntity.setTitle("test title");
        testEntity.setAnotherTestEntity(anotherEntity);

        Map<String, String> dto = commonMapperTest.mapToDto(testEntity);

        assertTrue(dto.get("title").equals("test title"));
        assertTrue(dto.get("id").equals("123"));
        assertTrue(dto.get("anotherTestEntityid").equals("24"));
        assertTrue(dto.get("anotherTestEntity2id")==null);
    }

}
