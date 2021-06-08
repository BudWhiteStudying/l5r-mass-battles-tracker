package l5r.mass.battle.tracker.service;

import ch.qos.logback.classic.Logger;
import l5r.mass.battle.tracker.dao.BattleDao;
import l5r.mass.battle.tracker.model.dto.Battles;
import l5r.mass.battle.tracker.model.entity.Battle;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BattleService {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(BattleService.class);
    private final BattleDao battleDao;

    public Battle initializeNewBattle() {
        return battleDao.save(new Battle());
    }

    public Battle updateBattle(Battle battle) {
        logger.debug("About to update battle, id is {}", battle.getId());
        return battleDao.save(battle);
    }

    public Battle finalizeBattle(Battle battle) {
        battle.setZombie(false);
        return battleDao.save(battle);
    }

    public Battles getAllBattles() {
        return new Battles(battleDao.findAll());
    }
}
