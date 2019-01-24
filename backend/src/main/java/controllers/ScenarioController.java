package controllers;

import controllers.delegates.ScenarioDelegate;
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
public class ScenarioController {

    @Autowired
    ScenarioDelegate scenarioDelegate;

    @RequestMapping(path = "/scenario/all")
    public ResponseEntity<List<Map<String, Object>>> getAllFuncs(){;
        return new ResponseEntity<>(scenarioDelegate.getAll(), HttpStatus.OK);
    }

    @RequestMapping(path="/scenario/create", method = RequestMethod.PUT)
    public ResponseEntity<Map<String, Object>> createNew(@RequestBody Map<String, Object> dto){;
        return new ResponseEntity<>(scenarioDelegate.createNew(dto), HttpStatus.OK);
    }

    @RequestMapping(path="/scenario/update", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> update(@RequestBody Map<String, Object> dto){
        return new ResponseEntity<>(scenarioDelegate.update(dto), HttpStatus.OK);
    }


}
