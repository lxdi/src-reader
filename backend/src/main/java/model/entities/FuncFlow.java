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

    @MapForLazy
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    @MapForLazy
    public Func getFunction() {
        return function;
    }
    public void setFunction(Func function) {
        this.function = function;
    }

    @MapForLazy
    public FuncFlow getParent() {
        return parent;
    }
    public void setParent(FuncFlow parent) {
        this.parent = parent;
    }

    @MapForLazy
    public Scenario getScenario() {
        return scenario;
    }
    public void setScenario(Scenario scenario) {
        this.scenario = scenario;
    }

    @MapForLazy
    public FuncFlow getNext() {
        return next;
    }
    public void setNext(FuncFlow next) {
        this.next = next;
    }

    @MapForLazy
    public String getTags() {
        return tags;
    }
    public void setTags(String tags) {
        this.tags = tags;
    }

    @MapForLazy
    public boolean getHideChildren() {
        return hideChildren;
    }
    public void setHideChildren(boolean hideChildren) {
        this.hideChildren = hideChildren;
    }

    @MapForLazy
    public FuncFlowRelevance getRelevance() {
        return relevance;
    }
    public void setRelevance(FuncFlowRelevance relevance) {
        this.relevance = relevance;
    }

    @MapForLazy
    public boolean getTodoMark() {
        return todoMark;
    }
    public void setTodoMark(boolean todoMark) {
        this.todoMark = todoMark;
    }

    @MapForLazy
    public boolean getGroupMark() {
        return groupMark;
    }
    public void setGroupMark(boolean groupMark) {
        this.groupMark = groupMark;
    }

    @MapForLazy
    public String getDesc() {
        return desc;
    }
    public void setDesc(String desc) {
        this.desc = desc;
    }


}
