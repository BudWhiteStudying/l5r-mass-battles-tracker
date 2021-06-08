package l5r.mass.battle.tracker.model.dto;

import l5r.mass.battle.tracker.model.entity.Character;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Characters {
    private List<Character> characters;
}
