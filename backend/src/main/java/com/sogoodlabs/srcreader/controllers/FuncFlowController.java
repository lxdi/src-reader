package com.sogoodlabs.srcreader.controllers;

import com.sogoodlabs.srcreader.controllers.delegates.FuncFlowDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;

@Controller
public class FuncFlowController {

    @Autowired
    FuncFlowDelegate funcFlowDelegate;

    @RequestMapping(path = "/funcflow/all")
    public ResponseEntity<List<Map<String, Object>>> getAllFuncs(){
        return new ResponseEntity<>(funcFlowDelegate.getAll(), HttpStatus.OK);
    }

    @RequestMapping(path = "/funcflow/all/lazy")
    public ResponseEntity<List<Map<String, Object>>> getAllLazy(){;
        return new ResponseEntity<>(funcFlowDelegate.getAllLazy(), HttpStatus.OK);
    }

    @RequestMapping(path = "/funcflow/all/lazy/by/scenario/{scenid}")
    public ResponseEntity<List<Map<String, Object>>> getByCompId(@PathVariable("scenid") long scenid){;
        return new ResponseEntity<>(funcFlowDelegate.getByScenid(scenid), HttpStatus.OK);
    }

    @RequestMapping(path = "/funcflow/all/lazy/by/project/{projid}")
    public ResponseEntity<List<Map<String, Object>>> getByProjid(@PathVariable("projid") long projid){;
        return new ResponseEntity<>(funcFlowDelegate.getByProjid(projid), HttpStatus.OK);
    }

    @RequestMapping(path = "/funcflow/{ffid}")
    public ResponseEntity<Map<String, Object>> getFull(@PathVariable("ffid") long id){
        return new ResponseEntity<>(funcFlowDelegate.getFull(id), HttpStatus.OK);
    }

    @RequestMapping(path="/funcflow/create", method = RequestMethod.PUT)
    public ResponseEntity<Map<String, Object>> createNew(@RequestBody Map<String, Object> dto){
        return new ResponseEntity<>(funcFlowDelegate.createNew(dto), HttpStatus.OK);
    }

    @RequestMapping(path="/funcflow/update", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> update(@RequestBody Map<String, Object> dto){
        return new ResponseEntity<>(funcFlowDelegate.update(dto), HttpStatus.OK);
    }

//    @RequestMapping(path="/funcflow/update/list", method = RequestMethod.POST)
//    public ResponseEntity<List<Map<String, Object>>> updateList(@RequestBody List<Map<String, Object>> dtolist){
//        return new ResponseEntity<>(funcFlowDelegate.updateList(dtolist), HttpStatus.OK);
//    }

    @RequestMapping(path="/funcflow/reposition/list", method = RequestMethod.POST)
    public ResponseEntity<List<Map<String, Object>>> reposition(@RequestBody List<Map<String, Object>> dtolist){
        return new ResponseEntity<>(funcFlowDelegate.reposition(dtolist), HttpStatus.OK);
    }

    @RequestMapping(path="/funcflow/hidechildren/{ffid}", method = RequestMethod.POST)
    public ResponseEntity<List<Map<String, Object>>> hideChildren(@PathVariable("ffid") long ffid){
        funcFlowDelegate.hideChildren(ffid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(path="/funcflow/delete/{funcflowid}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("funcflowid") long id){
        funcFlowDelegate.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
