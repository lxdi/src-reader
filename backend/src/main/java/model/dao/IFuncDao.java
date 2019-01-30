package model.dao;

import model.entities.Component;
import model.entities.Func;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IFuncDao extends JpaRepository<Func, Long> {

    @Query("from Func")
    List<Func> getAll();

    @Query("from Func where component = :comp")
    List<Func> funcByComp(@Param("comp") Component comp);

    @Query("from Func where component.id = :id")
    List<Func> findByComponentid(@Param("id") long id);

}
