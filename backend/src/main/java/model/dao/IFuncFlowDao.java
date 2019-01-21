package model.dao;

import model.entities.FuncFlow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IFuncFlowDao extends JpaRepository<FuncFlow, Long> {

    @Query("from FuncFlow where parent = :parent and next is null")
    FuncFlow findLast(@Param("parent") FuncFlow parent);

    @Query("from FuncFlow where parent is null and next is null")
    FuncFlow findLastAmongRoots();

}
