package model.dao;

import model.entities.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IScenarioDao extends JpaRepository<Scenario, Long> {

}
