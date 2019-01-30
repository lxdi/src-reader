package model.dao;

import model.entities.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IScenarioDao extends JpaRepository<Scenario, Long> {

    @Query("from Scenario where project.id = :id")
    List<Scenario> findByProjectid(@Param("id") long id);

}
