package l5r.mass.battle.tracker.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Commander extends Character {
    private Long armyId;
    private int initiative;

    public void update(Character leader) {
        this.setClan(leader.getClan());
        this.setCohortId(leader.getCohortId());
        this.setName(leader.getName());
    }
}
