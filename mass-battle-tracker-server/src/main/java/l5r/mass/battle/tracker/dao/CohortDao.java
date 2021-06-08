package l5r.mass.battle.tracker.dao;

import l5r.mass.battle.tracker.model.entity.Cohort;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CohortDao extends JpaRepository<Cohort, Long> {
}
