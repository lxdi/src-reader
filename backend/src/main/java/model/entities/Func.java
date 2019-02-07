package model.entities;

import model.dto.common_mapper.annotations.MapForLazy;

import javax.persistence.*;

@Entity
public class Func {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String title;

    @Column(length = 4096)
    String description;
    int lines;
    int startLine;

    @ManyToOne
    Component component;

    String color = "BlueViolet";

    @MapForLazy
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    @MapForLazy
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    @MapForLazy
    public Component getComponent() {
        return component;
    }
    public void setComponent(Component component) {
        this.component = component;
    }

    @MapForLazy
    public int getLines() {
        return lines;
    }
    public void setLines(int lines) {
        this.lines = lines;
    }

    @MapForLazy
    public int getStartLine() {
        return startLine;
    }
    public void setStartLine(int startLine) {
        this.startLine = startLine;
    }

    @MapForLazy
    public String getColor() {
        return color;
    }
    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
