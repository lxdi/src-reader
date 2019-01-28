package controllers.delegates;

import model.dao.IFuncDao;
import model.dao.IFuncFlowDao;
import model.entities.Func;
import model.entities.FuncFlow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuncDelegate extends CommonDelegate {

    @Autowired
    IFuncDao iFuncDao;

    @Autowired
    IFuncFlowDao funcFlowDao;

    @Autowired
    FuncFlowDelegate funcFlowDelegate;

    @Override
    protected Class getClassDao() {
        return Func.class;
    }


    @Override
    public void delete(long id){
        Func func = iFuncDao.findOne(id);
        delete(func);
    }

    private void delete(Func func){
        List<FuncFlow> dependedFF = funcFlowDao.funcFlowsByFunction(func);
        if(dependedFF.size()>0){
            dependedFF.forEach((ff)->{
                funcFlowDelegate.delete(ff.getId());
            });
        }
        iFuncDao.delete(func);
    }


    @Override
    protected void validateCreateNew(Object obj){
        commonValidation(obj);
    }

    @Override
    protected void validateUpdate(Object obj){
        commonValidation(obj);
    }

    protected void commonValidation(Object obj){
        Func func = (Func) obj;
        if(func.getComponent()==null){
            throw new RuntimeException("A Function must have a Component");
        }
        if(func.getTitle()==null || func.getTitle().isEmpty()){
            throw new RuntimeException("A Function must have a title");
        }
    }

}
