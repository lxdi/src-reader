package configs;

import configuration.HibernateConfigMain;
import controllers.delegates.FuncDelegate;
import model.dao.CompDao;
import model.dao.FuncDao;
import model.dto.func.FuncDtoMapper;
import org.junit.runner.RunWith;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;


/**
 * Created by Alexander on 07.04.2018.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(loader=AnnotationConfigContextLoader.class,
        classes = {HibernateConfigMain.class, EmbeddedDBConf.class,
                FuncDtoMapper.class, FuncDelegate.class,
                CompDao.class})
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public abstract class SpringTestConfig {

}
