package l5r.mass.battle.tracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Army implements Serializable {
    @NotNull
    private String name;
    private String description;
    private List<Cohort> cohorts;

    private int strength;
    private int currentCasualties;

    private int discipline;
    private int currentPanic;
}
