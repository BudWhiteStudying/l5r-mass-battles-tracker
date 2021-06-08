package l5r.mass.battle.tracker.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Entity
public class Commander extends Character {
    @JsonIgnore
    @OneToOne(fetch = FetchType.EAGER, cascade= CascadeType.ALL,mappedBy = "commander")
    @JoinColumn(name = "ARMY_ID")
    private Army army;
    private int initiative;
}
