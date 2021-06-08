package l5r.mass.battle.tracker.dao;

import l5r.mass.battle.tracker.model.entity.Character;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterDao extends JpaRepository<Character, Long> {
}
