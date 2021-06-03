package l5r.mass.battle.tracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RoundState implements Serializable {
    private int roundIndex;
    private Commander actingCommander;
    private Character actingLeader;
}
