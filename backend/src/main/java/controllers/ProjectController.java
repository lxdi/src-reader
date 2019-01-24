package controllers;

import controllers.delegates.ProjectDelegate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.Map;

@Controller
public class ProjectController {

    @Autowired
    ProjectDelegate projectDelegate;

    @RequestMapping(path = "/project/all")
    public ResponseEntity<List<Map<String, Object>>> getAllFuncs(){;
        return new ResponseEntity<>(projectDelegate.getAll(), HttpStatus.OK);
    }

    @RequestMapping(path="/project/create", method = RequestMethod.PUT)
    public ResponseEntity<Map<String, Object>> createNew(@RequestBody Map<String, Object> dto){;
        return new ResponseEntity<>(projectDelegate.createNew(dto), HttpStatus.OK);
    }

    @RequestMapping(path="/project/update", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> update(@RequestBody Map<String, Object> dto){
        return new ResponseEntity<>(projectDelegate.update(dto), HttpStatus.OK);
    }

}
