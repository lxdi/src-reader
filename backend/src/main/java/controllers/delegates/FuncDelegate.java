package controllers.delegates;

import model.entities.Func;
import org.springframework.stereotype.Service;
@Service
public class FuncDelegate extends CommonDelegate {

    @Override
    protected Class getClassDao() {
        return Func.class;
    }

    @Override
    protected void validateCreateNew(Object obj){
        Func func = (Func) obj;
        if(func.getComponent()==null){
            throw new RuntimeException("A Function must have a Component");
        }
    }

}
