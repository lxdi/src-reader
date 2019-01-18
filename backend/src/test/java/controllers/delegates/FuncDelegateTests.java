package controllers.delegates;

import configs.SpringTestConfig;
import model.dao.IFuncDao;
import model.entities.Func;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static junit.framework.TestCase.assertTrue;

public class FuncDelegateTests extends SpringTestConfig {

    @Autowired
    IFuncDao funcDao;

    @Test
    public void getAllTest(){
        Func func1 = new Func();
        func1.setTitle("super func");
        funcDao.save(func1);

        Func subfunc1 = new Func();
        subfunc1.setTitle("subfunc1");
        funcDao.save(subfunc1);

        Func func2 = new Func();
        func2.setTitle("super func 2");
        funcDao.save(func2);

        List<Func> funcs = funcDao.getAll();

        assertTrue(funcs.size()==3);
    }

}
