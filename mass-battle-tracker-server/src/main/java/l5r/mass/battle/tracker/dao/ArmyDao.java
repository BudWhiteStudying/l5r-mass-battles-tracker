package l5r.mass.battle.tracker.dao;

import l5r.mass.battle.tracker.model.entity.Army;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArmyDao extends JpaRepository<Army,Long> {
}
