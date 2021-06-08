package l5r.mass.battle.tracker.dao;

import l5r.mass.battle.tracker.model.entity.StrategicObjective;
import l5r.mass.battle.tracker.model.framework.StrategicObjectiveType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StrategicObjectiveDao extends JpaRepository<StrategicObjective, StrategicObjectiveType> {
}
