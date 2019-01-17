package model.dao;

import model.entities.Component;
import model.entities.Func;

import java.util.List;

public interface ICompDao {

    Component getById(long id);
    void saveOrUpdate(Component func);

}
