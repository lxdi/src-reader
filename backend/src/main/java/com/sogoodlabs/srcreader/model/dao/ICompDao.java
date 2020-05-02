package com.sogoodlabs.srcreader.model.dao;

import com.sogoodlabs.srcreader.model.entities.Component;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ICompDao extends JpaRepository<Component, Long> {

    @Query("from Component where project.id = :id")
    List<Component> findByProjectid(@Param("id") long id);

    @Query("from Component where title=:title")
    Component findByTitle(@Param("title") String title);

}
