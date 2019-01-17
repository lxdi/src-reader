package controllers;

import controllers.delegates.FuncDelegate;
import model.dto.func.FuncDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
public class FuncController {

    @Autowired
    FuncDelegate funcDelegate;

    @RequestMapping(path = "/mean/all/lazy")
    public ResponseEntity<List<FuncDto>> getAllFuncs(){;
        return new ResponseEntity<>(funcDelegate.getAllFuncs(), HttpStatus.OK);
    }


}