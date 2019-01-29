package model.enums;

import model.dto.common_mapper.IEnumForCommonMapper;

public enum FuncFlowRelevance implements IEnumForCommonMapper<FuncFlowRelevance> {
    high("High"), normal("Normal"), low("Low"), transitional("Transitional");

    String val;

    FuncFlowRelevance(String val){
        this.val = val;
    }

    @Override
    public String value() {
        return this.val;
    }
}
