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

    @ManyToOne
    Func func;

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

    public Func getFunc() {
        return func;
    }

    public void setFunc(Func func) {
        this.func = func;
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
}
