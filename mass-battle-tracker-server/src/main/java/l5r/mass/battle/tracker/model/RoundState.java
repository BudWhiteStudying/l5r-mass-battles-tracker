package l5r.mass.battle.tracker.model;

import l5r.mass.battle.tracker.model.entity.Character;
import l5r.mass.battle.tracker.model.entity.Commander;
import l5r.mass.battle.tracker.model.entity.StrategicObjective;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoundState implements Serializable {
    private int roundIndex;
    private Commander actingCommander;
    private Character actingLeader;
    private Map<String, StrategicObjective> currentObjectivePerArmyName;
    private Map<String, RoundScore> scorePerArmyName;
    private List<ExecutedAction> actionHistory;
}
