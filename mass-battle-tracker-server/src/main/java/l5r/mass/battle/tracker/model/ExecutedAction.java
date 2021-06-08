package l5r.mass.battle.tracker.model;

import l5r.mass.battle.tracker.model.entity.Action;
import l5r.mass.battle.tracker.model.entity.Character;
import l5r.mass.battle.tracker.model.framework.ConflictStance;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ExecutedAction extends Action {
    private int executionRound;
    private Character perpetrator;
    private ConflictStance perpetratorStance;
    private int attritionCaused;
    private int panicCaused;
    private int panicRemoved;
}
