package l5r.mass.battle.tracker.model.entity;

import l5r.mass.battle.tracker.model.framework.ActionType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Action implements Serializable {
    @Id
    @Enumerated(EnumType.STRING)
    private ActionType type;
    private String description;
    private boolean canCauseAttrition;
    private boolean canCausePanic;
    private boolean canRemovePanic;
}
