package l5r.mass.battle.tracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cohort implements Serializable {
    @NotNull
    private String name;
    private String description;
    @NotNull
    private Character leader;
}
