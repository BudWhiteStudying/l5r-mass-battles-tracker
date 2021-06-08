package l5r.mass.battle.tracker.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Army implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @NotNull
    private String name;
    private String description;
    private String mainClan;

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    //@JoinColumn(name = "ARMY_ID", referencedColumnName = "ID")
    private List<Cohort> cohorts;
    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    //@JoinColumn(name = "ARMY_ID", referencedColumnName = "ID")
    private List<Character> leaders;

    @OneToOne(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "army")
    private Commander commander;

    private int strength;
    private int currentCasualties;
    private int attritionReduction;

    private int discipline;
    private int currentPanic;
}
