package l5r.mass.battle.tracker.dao;

import l5r.mass.battle.tracker.model.entity.Battle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BattleDao extends JpaRepository<Battle, Long> {
}
