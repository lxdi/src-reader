package model.entities;

import com.sogoodlabs.common_mapper.annotations.MapForLazy;

import javax.persistence.*;

@Entity
public class Scenario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String title;

    @Column(name = "description", length = 4096)
    String desc;

    boolean hidden;
    boolean sizing = true;

    @ManyToOne(fetch = FetchType.LAZY)
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

    @MapForLazy
    public boolean getHidden() {
        return hidden;
    }
    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

    @MapForLazy
    public boolean getSizing() {
        return sizing;
    }
    public void setSizing(boolean sizing) {
        this.sizing = sizing;
    }

    public String getDesc() {
        return desc;
    }
    public void setDesc(String desc) {
        this.desc = desc;
    }
}
