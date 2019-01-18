package model.dao;

import model.entities.Func;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IFuncDao extends JpaRepository<Func, Long> {

    Func findById(long id);
    Func save(Func func);

    @Query("from Func")
    List<Func> getAll();

}
