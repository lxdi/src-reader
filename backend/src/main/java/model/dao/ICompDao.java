package model.dao;

import model.entities.Component;
import model.entities.Func;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICompDao extends JpaRepository<Component, Long> {

    //Component getById(long id);
    //void saveOrUpdate(Component func);

}
