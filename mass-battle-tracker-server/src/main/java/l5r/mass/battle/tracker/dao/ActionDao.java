package l5r.mass.battle.tracker.dao;

import l5r.mass.battle.tracker.model.entity.Action;
import l5r.mass.battle.tracker.model.framework.ActionType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActionDao extends JpaRepository<Action, ActionType> {
}
