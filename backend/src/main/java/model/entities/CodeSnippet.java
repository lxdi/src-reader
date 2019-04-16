package model.entities;

import javax.persistence.*;

@Entity
public class CodeSnippet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @ManyToOne(fetch = FetchType.LAZY)
    Func function;

    @Column(length = 8192)
    String code;

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

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
