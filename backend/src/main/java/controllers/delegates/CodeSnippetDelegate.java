package controllers.delegates;

import model.dao.ICodeSnippetDao;
import model.dto.common_mapper.CommonMapper;
import model.entities.CodeSnippet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CodeSnippetDelegate {

    @Autowired
    ICodeSnippetDao codeSnippetDao;

    @Autowired
    CommonMapper commonMapper;

    public Map<String, Object> get(long funcid){
        CodeSnippet codeSnippet = codeSnippetDao.findByFunctionId(funcid);
        if(codeSnippet==null){
            return null;
        }
        return commonMapper.mapToDto(codeSnippet, new HashMap<>());
    }

    public Map<String, Object> create(Map<String, Object> codeSnippetDto){
        CodeSnippet codeSnippet =  (CodeSnippet) commonMapper.mapToEntity(codeSnippetDto, new CodeSnippet());
        if(codeSnippet.getFunction()==null){
            throw new NullPointerException();
        }
        if(codeSnippet.getId()>0){
            throw new IllegalStateException("Only a new Code snippet with id = 0 can be created");
        }
        codeSnippetDao.save(codeSnippet);
        return commonMapper.mapToDto(codeSnippet, new HashMap<>());
    }

    public Map<String, Object> update(Map<String, Object> actualSnippet){
        CodeSnippet codeSnippet = (CodeSnippet) commonMapper.mapToEntity(actualSnippet, new CodeSnippet());
        if(codeSnippet.getId()<1 || codeSnippet.getFunction()==null){
            throw new IllegalStateException();
        }
        if(codeSnippetDao.checkSnippet(codeSnippet.getFunction().getId(), codeSnippet.getId())!=1){
            throw new IllegalStateException();
        }
        codeSnippetDao.save(codeSnippet);
        return commonMapper.mapToDto(codeSnippet, new HashMap<>());
    }

    public void delete(long snippetId){
        codeSnippetDao.delete(codeSnippetDao.findOne(snippetId));
    }

}
