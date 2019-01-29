package controllers;

import controllers.delegates.ComponentDelegate;
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
public class ComponentController {

    @Autowired
    ComponentDelegate componentDelegate;

    @RequestMapping(path = "/component/all")
    public ResponseEntity<List<Map<String, Object>>> getAll(){;
        return new ResponseEntity<>(componentDelegate.getAll(), HttpStatus.OK);
    }

    @RequestMapping(path = "/component/all/lazy")
    public ResponseEntity<List<Map<String, Object>>> getAllLazy(){;
        return new ResponseEntity<>(componentDelegate.getAllLazy(), HttpStatus.OK);
    }

    @RequestMapping(path = "/component/{compid}")
    public ResponseEntity<Map<String, Object>> getFull(@PathVariable("compid") long id){
        return new ResponseEntity<>(componentDelegate.getFull(id), HttpStatus.OK);
    }

    @RequestMapping(path="/component/create", method = RequestMethod.PUT)
    public ResponseEntity<Map<String, Object>> createNew(@RequestBody Map<String, Object> dto){;
        return new ResponseEntity<>(componentDelegate.createNew(dto), HttpStatus.OK);
    }

    @RequestMapping(path="/component/update", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> update(@RequestBody Map<String, Object> dto){
        return new ResponseEntity<>(componentDelegate.update(dto), HttpStatus.OK);
    }

    @RequestMapping(path="/component/delete/{compid}", method = RequestMethod.DELETE)
    public ResponseEntity delete(@PathVariable("compid") long id){
        componentDelegate.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
