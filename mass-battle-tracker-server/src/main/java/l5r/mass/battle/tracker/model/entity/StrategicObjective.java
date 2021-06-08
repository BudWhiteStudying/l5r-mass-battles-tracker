package l5r.mass.battle.tracker.model.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import l5r.mass.battle.tracker.model.framework.StrategicObjectiveType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class StrategicObjective implements Serializable {
    @Id
    @Enumerated(EnumType.STRING)
    private StrategicObjectiveType type;
    private String name;
    @JsonInclude
    @Transient
    private boolean reached;
    @JsonInclude
    @Transient
    private int attritionCaused;
    @JsonInclude
    @Transient
    private int panicCaused;
    @JsonInclude
    @Transient
    private int panicRemoved;
}
