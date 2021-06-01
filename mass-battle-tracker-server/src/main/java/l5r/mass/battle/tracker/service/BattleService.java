package l5r.mass.battle.tracker.service;

import l5r.mass.battle.tracker.model.Battle;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BattleService {

    public static final HashMap<Long, Battle> TEMP_BATTLE_DATABASE = new HashMap<>();

    public Battle recordNewBattle(Battle battle) {
        final Long newBattleId = TEMP_BATTLE_DATABASE.keySet().stream().max(Long::compare).orElse(0L)+1;
        battle.setId(newBattleId);
        TEMP_BATTLE_DATABASE.put(
                newBattleId,
                battle);
        return TEMP_BATTLE_DATABASE.get(newBattleId);
    }

    public List<Battle> getAllBattles() {
        return new ArrayList<>(TEMP_BATTLE_DATABASE.values());
    }
}
