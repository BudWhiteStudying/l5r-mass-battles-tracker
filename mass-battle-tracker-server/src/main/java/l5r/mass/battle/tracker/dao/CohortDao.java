package l5r.mass.battle.tracker.dao;

import l5r.mass.battle.tracker.model.entity.Cohort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CohortDao extends JpaRepository<Cohort, Long> {
    List<Cohort> findByArmyId(Long armyId);
}
