package l5r.mass.battle.tracker.dao;

import l5r.mass.battle.tracker.model.entity.Army;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArmyDao extends JpaRepository<Army,Long> {
    List<Army> findByBattleId(Long battleId);
}
