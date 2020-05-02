package com.sogoodlabs.srcreader.model.entities;

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

    public boolean getHidden() {
        return hidden;
    }
    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

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
