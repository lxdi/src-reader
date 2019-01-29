package model.entities;

import model.dto.common_mapper.annotations.MapForLazy;

import javax.persistence.*;

@Entity
public class Component {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String title;

    @Column(length = 4096)
    String description;

    @ManyToOne
    Project project;

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
    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
