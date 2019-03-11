package model.entities;


import com.sogoodlabs.common_mapper.annotations.MapForLazy;

import javax.persistence.*;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String title;

    @Column(length=2048)
    String description;

    boolean iscurrent = false;

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
    public boolean getIscurrent() {
        return iscurrent;
    }
    public void setIscurrent(boolean iscurrent) {
        this.iscurrent = iscurrent;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
