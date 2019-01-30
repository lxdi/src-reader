package model.dao;

import model.entities.Func;
import model.entities.FuncFlow;
import model.entities.Scenario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

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

}
