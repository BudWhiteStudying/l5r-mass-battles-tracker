package l5r.mass.battle.tracker.dao;

import l5r.mass.battle.tracker.model.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CharacterDao extends JpaRepository<Character, Long> {
    List<Character> findByArmyId(Long armyId);
    List<Character> findByCohortId(Long cohortId);
    @Query("SELECT c FROM Character c WHERE c.armyId = ?1 AND TYPE(c) = ?2")
    List<Character> findOneByArmyIdAndDtype(Long armyId, Class<?> dType);
    List<Character> findOneByCohortId(Long cohortId);
}
