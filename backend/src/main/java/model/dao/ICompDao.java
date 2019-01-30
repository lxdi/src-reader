package model.dao;

import model.entities.Component;
import model.entities.Func;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICompDao extends JpaRepository<Component, Long> {

    @Query("from Component where project.id = :id")
    List<Component> findByProjectid(@Param("id") long id);

}
