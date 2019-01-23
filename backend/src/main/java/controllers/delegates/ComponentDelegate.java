package controllers.delegates;

import model.entities.Component;
import org.springframework.stereotype.Service;

@Service
public class ComponentDelegate extends CommonDelegate {

    @Override
    protected Class getClassDao() {
        return Component.class;
    }

    @Override
    protected void validateCreateNew(Object object){
        Component component = (Component) object;
        if(component.getProject()==null){
            throw new RuntimeException("A Component must have a Project");
        }
    }

}
