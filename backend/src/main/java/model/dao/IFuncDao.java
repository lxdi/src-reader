package model.dao;

import model.entities.Func;

import java.util.List;

public interface IFuncDao {

    Func getById(long id);
    void saveOrUpdate(Func func);
    List<Func> getAll();

}
