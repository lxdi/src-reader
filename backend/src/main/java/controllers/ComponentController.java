package controllers;

import controllers.delegates.ComponentDelegate;
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
public class ComponentController {

    @Autowired
    ComponentDelegate componentDelegate;

    @RequestMapping(path = "/component/all")
    public ResponseEntity<List<Map<String, Object>>> getAllFuncs(){;
        return new ResponseEntity<>(componentDelegate.getAll(), HttpStatus.OK);
    }

    @RequestMapping(path="/component/create", method = RequestMethod.PUT)
    public ResponseEntity<Map<String, Object>> createNew(@RequestBody Map<String, Object> dto){;
        return new ResponseEntity<>(componentDelegate.createNew(dto), HttpStatus.OK);
    }


}
