package com.sogoodlabs.srcreader.configs;

import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.jndi.SimpleNamingContextBuilder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;
import javax.naming.NamingException;


/**
 * Created by Alexander on 07.04.2018.
 */

//@RunWith(SpringJUnit4ClassRunner.class)
////@ContextConfiguration(loader=AnnotationConfigContextLoader.class,
////        classes = {HibernateConfigMain.class, EmbeddedDBConf.class,
////                FuncDtoMapper.class, FuncDelegate.class})
//@ContextConfiguration(loader=AnnotationConfigContextLoader.class,
//        classes = {})
@RunWith(SpringRunner.class)
@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
public abstract class SpringTestConfig {

//    static {
//        SimpleNamingContextBuilder builder = new SimpleNamingContextBuilder();
//        builder.bind("java:comp/env/use_database", "false");
//        try {
//            builder.activate();
//        } catch (NamingException e) {
//            e.printStackTrace();
//        }
//    }

}
