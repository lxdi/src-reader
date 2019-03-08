package controllers;

import controllers.delegates.CodeSnippetDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@Controller
public class CodeSnippetController {

    @Autowired
    CodeSnippetDelegate codeSnippetDelegate;

    @RequestMapping(path = "/codesnippet/by/func/{funcid}")
    public ResponseEntity get(@PathVariable(value = "funcid") long funcid){
        Map<String, Object> result = codeSnippetDelegate.get(funcid);
        if(result==null){
            return new ResponseEntity("Not exist", HttpStatus.OK);
        }
        return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
    }

    @RequestMapping(path = "/codesnippet/create", method = RequestMethod.PUT)
    public ResponseEntity<Map<String, Object>> create(@RequestBody Map<String, Object> newCodeSnippet){
        return new ResponseEntity<Map<String, Object>>(codeSnippetDelegate.create(newCodeSnippet), HttpStatus.OK);
    }

    @RequestMapping(path = "/codesnippet/update", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> update(@RequestBody Map<String, Object> actualCodeSnippet){
        return new ResponseEntity<>(codeSnippetDelegate.update(actualCodeSnippet), HttpStatus.OK);
    }

    @RequestMapping(path = "/codesnippet/delete/by/id/{snippetId}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable(value = "snippetId") long snippetId){
        codeSnippetDelegate.delete(snippetId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
