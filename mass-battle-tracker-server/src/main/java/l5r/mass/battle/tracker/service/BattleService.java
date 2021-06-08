package l5r.mass.battle.tracker.service;

import l5r.mass.battle.tracker.dao.BattleDao;
import l5r.mass.battle.tracker.model.dto.Battles;
import l5r.mass.battle.tracker.model.entity.Battle;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BattleService {

    private final BattleDao battleDao;

    public Battle initializeNewBattle() {
        return battleDao.save(new Battle());
    }

    public Battle insertOrUpdateBattle(Battle battle) {
        return battleDao.save(battle);
    }

    public Battles getAllBattles() {
        return new Battles(battleDao.findAll());
    }
}
