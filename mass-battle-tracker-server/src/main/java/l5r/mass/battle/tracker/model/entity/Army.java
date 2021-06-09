package l5r.mass.battle.tracker.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    @Transient
    @JsonInclude
    private List<Cohort> cohorts;
    @Transient
    @JsonInclude
    private List<Character> leaders;
    @Transient
    @JsonInclude
    private Commander commander;

    private int strength;
    private int currentCasualties;
    private int attritionReduction;

    private int discipline;
    private int currentPanic;

    private Long battleId;
}
