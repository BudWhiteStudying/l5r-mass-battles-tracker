package l5r.mass.battle.tracker.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
    private List<Cohort> cohorts;
    private List<Character> leaders;
    private Commander commander;

    private int strength;
    private int currentCasualties;
    private int attritionReduction;

    private int discipline;
    private int currentPanic;
}
