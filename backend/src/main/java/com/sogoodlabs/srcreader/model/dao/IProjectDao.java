package com.sogoodlabs.srcreader.model.dao;

import com.sogoodlabs.srcreader.model.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface IProjectDao extends JpaRepository<Project, Long> {

    @Modifying
    @Query("update Project set iscurrent=false where iscurrent = true")
    void setAllCurrentFalse();

    @Modifying
    @Query("update Project set iscurrent=true where id = :projid")
    void setCurrent(@Param("projid") long projid);

}
