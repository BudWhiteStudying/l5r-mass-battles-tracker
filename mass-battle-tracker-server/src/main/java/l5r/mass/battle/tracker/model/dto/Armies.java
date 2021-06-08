package l5r.mass.battle.tracker.model.dto;

import l5r.mass.battle.tracker.model.entity.Army;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Armies {
    private List<Army> armies;
}
