package com.sogoodlabs.srcreader.configs;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import javax.persistence.EntityManagerFactory;


/**
 * Created by Alexander on 07.04.2018.
 */

@RunWith(SpringRunner.class)
@SpringBootTest
//@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@ActiveProfiles("test")
public abstract class SpringTestConfig {

    @Autowired
    EntityManagerFactory etf;

    @Before
    public void cleanDB(){
        SessionFactory sessionFactory = etf.unwrap(SessionFactory.class);
        Session session = sessionFactory.openSession();
        session.beginTransaction();
        session.createQuery("delete from CodeSnippet").executeUpdate();
        session.createQuery("delete from FuncFlow").executeUpdate();
        session.createQuery("delete from Func").executeUpdate();
        session.createQuery("delete from Component").executeUpdate();
        session.createQuery("delete from Scenario").executeUpdate();
        session.createQuery("delete from Project").executeUpdate();
        session.getTransaction().commit();
        session.close();
    }

}
