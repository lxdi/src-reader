package model.dto.common_mapper;

public enum TestEnum implements IEnumForCommonMapper<TestEnum>{
    val1("val_1"), val2("val_2");

    String innerval;

    TestEnum(String val){
        innerval = val;
    }

    @Override
    public String value(){
        return this.innerval;
    }

}
