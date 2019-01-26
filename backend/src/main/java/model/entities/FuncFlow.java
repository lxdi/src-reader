package model.entities;

import javax.persistence.*;

@Entity
public class FuncFlow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @ManyToOne
    FuncFlow parent;

    @OneToOne
    FuncFlow next;

    @ManyToOne
    Func function;

    @ManyToOne
    Scenario scenario;

    String desc;

    String tags;

    boolean hideChildren = false;

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

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public boolean isHideChildren() {
        return hideChildren;
    }

    public void setHideChildren(boolean hideChildren) {
        this.hideChildren = hideChildren;
    }
}
