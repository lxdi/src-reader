package model.entities;


import model.dto.common_mapper.annotations.MapForLazy;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String title;

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
}
