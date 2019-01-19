package model.dto.common_mapper;

public class TestEntity {

    long id;
    String title;

    TestEntity anotherTestEntity;
    TestEntity anotherTestEntity2;

    TestEnum testEnum;

    TestSecondEntity testSecondEntity;

    boolean booleanVal;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public TestEntity getAnotherTestEntity() {
        return anotherTestEntity;
    }

    public void setAnotherTestEntity(TestEntity anotherTestEntity) {
        this.anotherTestEntity = anotherTestEntity;
    }

    public TestEntity getAnotherTestEntity2() {
        return anotherTestEntity2;
    }

    public void setAnotherTestEntity2(TestEntity anotherTestEntity2) {
        this.anotherTestEntity2 = anotherTestEntity2;
    }

    public TestEnum getTestEnum() {
        return testEnum;
    }

    public void setTestEnum(TestEnum testEnum) {
        this.testEnum = testEnum;
    }

    public TestSecondEntity getTestSecondEntity() {
        return testSecondEntity;
    }

    public void setTestSecondEntity(TestSecondEntity testSecondEntity) {
        this.testSecondEntity = testSecondEntity;
    }

    public boolean getBooleanVal() {
        return booleanVal;
    }

    public void setBooleanVal(boolean booleanVal) {
        this.booleanVal = booleanVal;
    }
}
