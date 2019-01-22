package model.entities;

import javax.persistence.*;

@Entity
public class FuncFlow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String title;

    @ManyToOne
    FuncFlow parent;

    @OneToOne
    FuncFlow next;

    @ManyToOne
    Func function;

    @ManyToOne
    Scenario scenario;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
}
