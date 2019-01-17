package model.dao;

import model.entities.Component;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CompDao implements ICompDao{

    @Autowired
    SessionFactory sessionFactory;

    @Override
    public Component getById(long id) {
        return this.sessionFactory.getCurrentSession().get(Component.class, id);
    }

    @Override
    public void saveOrUpdate(Component comp) {
        this.sessionFactory.getCurrentSession().saveOrUpdate(comp);
    }
}
