package l5r.mass.battle.tracker.model.dto;

import l5r.mass.battle.tracker.model.entity.Battle;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Battles {
    private List<Battle> battles;
}
