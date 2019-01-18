package model.dao;

import model.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProjectDao extends JpaRepository<Project, Long> {

}
