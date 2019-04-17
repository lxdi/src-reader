package model.entities;

import com.sogoodlabs.common_mapper.annotations.MapForLazy;
import model.enums.FuncFlowRelevance;

import javax.persistence.*;

@Entity
public class FuncFlow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @ManyToOne(fetch = FetchType.LAZY)
    FuncFlow parent;

    @OneToOne(fetch = FetchType.LAZY)
    FuncFlow next;

    @ManyToOne(fetch = FetchType.LAZY)
    Func function;

    @ManyToOne(fetch = FetchType.LAZY)
    Scenario scenario;

    @Column(name = "description", length = 4096)
    String desc;

    String tags;

    @Enumerated(EnumType.STRING)
    FuncFlowRelevance relevance = FuncFlowRelevance.normal;

    boolean hideChildren = false;

    boolean todoMark = false;

    boolean groupMark = false;

    public FuncFlow(){}

    public FuncFlow(Scenario scenario){
        this.scenario = scenario;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public Func getFunction() {
        return function;
    }
    public void setFunction(Func function) {
        this.function = function;
    }

    public FuncFlow getParent() {
        return parent;
    }
    public void setParent(FuncFlow parent) {
        this.parent = parent;
    }

    public Scenario getScenario() {
        return scenario;
    }
    public void setScenario(Scenario scenario) {
        this.scenario = scenario;
    }

    public FuncFlow getNext() {
        return next;
    }
    public void setNext(FuncFlow next) {
        this.next = next;
    }

    public String getTags() {
        return tags;
    }
    public void setTags(String tags) {
        this.tags = tags;
    }

    public boolean getHideChildren() {
        return hideChildren;
    }
    public void setHideChildren(boolean hideChildren) {
        this.hideChildren = hideChildren;
    }

    public FuncFlowRelevance getRelevance() {
        return relevance;
    }
    public void setRelevance(FuncFlowRelevance relevance) {
        this.relevance = relevance;
    }

    public boolean getTodoMark() {
        return todoMark;
    }
    public void setTodoMark(boolean todoMark) {
        this.todoMark = todoMark;
    }

    public boolean getGroupMark() {
        return groupMark;
    }
    public void setGroupMark(boolean groupMark) {
        this.groupMark = groupMark;
    }

    public String getDesc() {
        return desc;
    }
    public void setDesc(String desc) {
        this.desc = desc;
    }


}
