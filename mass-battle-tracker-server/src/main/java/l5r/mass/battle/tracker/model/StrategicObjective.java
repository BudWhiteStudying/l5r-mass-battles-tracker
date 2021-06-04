package l5r.mass.battle.tracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StrategicObjective implements Serializable {
    private String name;
    private String description;
    private StrategicObjectiveType type;
}
