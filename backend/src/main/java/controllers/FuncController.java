package controllers;

import controllers.delegates.FuncDelegate;
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
public class FuncController {

    @Autowired
    FuncDelegate funcDelegate;

    @RequestMapping(path = "/function/all")
    public ResponseEntity<List<Map<String, Object>>> getAllFuncs(){;
        return new ResponseEntity<>(funcDelegate.getAll(), HttpStatus.OK);
    }

    @RequestMapping(path = "/function/all/lazy")
    public ResponseEntity<List<Map<String, Object>>> getAllLazy(){;
        return new ResponseEntity<>(funcDelegate.getAllLazy(), HttpStatus.OK);
    }

    @RequestMapping(path = "/function/{funcid}")
    public ResponseEntity<Map<String, Object>> getFull(@PathVariable("funcid") long id){
        return new ResponseEntity<>(funcDelegate.getFull(id), HttpStatus.OK);
    }

    @RequestMapping(path="/function/create", method = RequestMethod.PUT)
    public ResponseEntity<Map<String, Object>> createNew(@RequestBody Map<String, Object> dto){
        return new ResponseEntity<>(funcDelegate.createNew(dto), HttpStatus.OK);
    }

    @RequestMapping(path="/function/update", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> update(@RequestBody Map<String, Object> dto){
        return new ResponseEntity<>(funcDelegate.update(dto), HttpStatus.OK);
    }

    @RequestMapping(path="/function/delete/{funcid}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("funcid") long id){
        funcDelegate.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
