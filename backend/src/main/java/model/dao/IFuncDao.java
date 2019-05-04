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

    @Query("from Func where component.project.id = :id")
    List<Func> findByProjectId(@Param("id") long id);

    @Query("from Func where title=:title")
    Func findByTitle(@Param("title") String title);

    @Query("from Func where title=:title and component.id = :compid")
    Func findByTitleAndCompId(@Param("title") String title, @Param("compid") long compid);

}
