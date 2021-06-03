package l5r.mass.battle.tracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Action implements Serializable {
    private String description;
    private ActionType type;
    private Character perpetrator;
    private ConflictStance perpetratorStance;
    private boolean canCauseAttrition;
    private boolean canCausePanic;
}
