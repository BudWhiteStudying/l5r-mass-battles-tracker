package l5r.mass.battle.tracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoundScore implements Serializable {
    private int totalAttritionSuffered;
    private int totalPanicSuffered;
    private int totalPanicRemoved;
    private int totalCasualtiesSuffered;
}
