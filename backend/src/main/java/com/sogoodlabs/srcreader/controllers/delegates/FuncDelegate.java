package com.sogoodlabs.srcreader.controllers.delegates;

import com.sogoodlabs.srcreader.model.dao.IFuncDao;
import com.sogoodlabs.srcreader.model.dao.IFuncFlowDao;
import com.sogoodlabs.srcreader.model.entities.Func;
import com.sogoodlabs.srcreader.model.entities.FuncFlow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
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

    public List<Map<String, Object>> getByComponentLazy(long compid){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Func func : iFuncDao.findByComponentid(compid)){
            result.add(commonMapper.mapToDto(func));
        }
        return result;
    }

    public List<Map<String, Object>> getByProjectId(long projid){
        List<Map<String, Object>> result = new ArrayList<>();
        for(Func func : iFuncDao.findByProjectId(projid)){
            result.add(commonMapper.mapToDto(func));
        }
        return result;
    }

    @Override
    public void delete(long id){
        Func func = iFuncDao.findById(id).get();
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
