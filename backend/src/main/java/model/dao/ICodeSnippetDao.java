package model.dao;

import model.entities.CodeSnippet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



public interface ICodeSnippetDao extends JpaRepository<CodeSnippet, Long> {

    @Query("from CodeSnippet where function.id = :id")
    CodeSnippet findByFunctionId(@Param("id") long id);

}
