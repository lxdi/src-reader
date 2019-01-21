package model.dao;

import model.entities.FuncFlow;
import model.entities.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IFuncFlowDao extends JpaRepository<FuncFlow, Long> {

    @Query("from FuncFlow where scenario = :scenario and parent = :parent and next is null")
    FuncFlow findLast(@Param("parent") FuncFlow parent, @Param("scenario") Scenario scenario);

    @Query("from FuncFlow where scenario = :scenario and parent is null and next is null")
    FuncFlow findLastAmongRoots(@Param("scenario") Scenario scenario);

}
