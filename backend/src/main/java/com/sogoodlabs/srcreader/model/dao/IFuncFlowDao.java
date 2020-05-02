package com.sogoodlabs.srcreader.model.dao;

import com.sogoodlabs.srcreader.model.entities.Func;
import com.sogoodlabs.srcreader.model.entities.FuncFlow;
import com.sogoodlabs.srcreader.model.entities.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IFuncFlowDao extends JpaRepository<FuncFlow, Long> {

    @Query("from FuncFlow where scenario = :scenario and parent = :parent and next is null")
    FuncFlow findLast(@Param("parent") FuncFlow parent, @Param("scenario") Scenario scenario);

    @Query("from FuncFlow where scenario = :scenario and parent is null and next is null")
    FuncFlow findLastAmongRoots(@Param("scenario") Scenario scenario);

    @Query("from FuncFlow where parent = :parent")
    List<FuncFlow> findChildren(@Param("parent") FuncFlow parent);

    @Query("from FuncFlow where next = :current")
    FuncFlow findPrev(@Param("current") FuncFlow current);

    @Query("from FuncFlow where function = :function")
    List<FuncFlow> funcFlowsByFunction(@Param("function") Func func);

    @Query("from FuncFlow where scenario.id = :id")
    List<FuncFlow> findByScenarioid(@Param("id") long id);

    @Query("from FuncFlow where scenario.id = :id and parent is null")
    List<FuncFlow> findRootsByScenarioid(@Param("id") long id);

    @Query("from FuncFlow where scenario.project.id = :id")
    List<FuncFlow> findByProjectid(@Param("id") long id);

    @Query("from FuncFlow where scenario.id=:scenarioid and function is null")
    List<FuncFlow> findByWithEmptyFuncScenarioId(@Param("scenarioid") long scenarioid);

    @Modifying
    @Query("update FuncFlow set hideChildren = (CASE hideChildren WHEN true THEN false ELSE true END) where id = :id ")
    void changeHideChildren(@Param("id") long id);

}
