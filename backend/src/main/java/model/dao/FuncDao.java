package model.dao;

import model.entities.Func;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FuncDao implements IFuncDao {

    @Autowired
    SessionFactory sessionFactory;

    @Override
    public Func getById(long id) {
        return sessionFactory.getCurrentSession().get(Func.class, id);
    }

    @Override
    public void saveOrUpdate(Func func) {
        this.sessionFactory.getCurrentSession().saveOrUpdate(func);
    }

    @Override
    public List<Func> getAll() {
        return sessionFactory.getCurrentSession().createQuery("from Func").list();
    }
}
