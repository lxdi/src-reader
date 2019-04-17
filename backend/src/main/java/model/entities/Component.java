package model.entities;

import com.sogoodlabs.common_mapper.annotations.MapForLazy;
import javax.persistence.*;

@Entity
public class Component {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String title;

    @Column(length = 4096)
    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    Project project;

    String color = "green";

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

    public Project getProject() {
        return project;
    }
    public void setProject(Project project) {
        this.project = project;
    }

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
