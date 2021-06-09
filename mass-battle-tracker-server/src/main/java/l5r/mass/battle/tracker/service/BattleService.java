package l5r.mass.battle.tracker.service;

import ch.qos.logback.classic.Logger;
import l5r.mass.battle.tracker.dao.ArmyDao;
import l5r.mass.battle.tracker.dao.BattleDao;
import l5r.mass.battle.tracker.dao.CharacterDao;
import l5r.mass.battle.tracker.dao.CohortDao;
import l5r.mass.battle.tracker.model.dto.Battles;
import l5r.mass.battle.tracker.model.entity.Army;
import l5r.mass.battle.tracker.model.entity.Battle;
import l5r.mass.battle.tracker.model.entity.Character;
import l5r.mass.battle.tracker.model.entity.Cohort;
import l5r.mass.battle.tracker.model.entity.Commander;
import l5r.mass.battle.tracker.model.framework.exception.WrappedException;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BattleService {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(BattleService.class);
    private final BattleDao battleDao;
    private final ArmyDao armyDao;
    private final CohortDao cohortDao;
    private final CharacterDao characterDao;

    public Battle initializeNewBattle() {
        return battleDao.save(new Battle());
    }

    public Battle updateBattle(Battle battle) {
        logger.debug("About to update battle, id is {}", battle.getId());
        return cascadeSaveBattle(battle);
    }

    public Battle finalizeBattle(Battle battle) {
        battle.setZombie(false);
        return cascadeSaveBattle(battle);
    }

    public Battles getAllBattles() {
        return new Battles(battleDao.findAll().stream().map(
                battle -> {
                    try {
                        return fetchBattleChildrenProperties(battle);
                    }
                    catch (Exception e) {
                        logger.error("Failed fetching children props: {}", e.getMessage(), e);
                        return null;
                    }
                }
        )
        .filter(Objects::nonNull)
        .collect(Collectors.toList()));
    }

    private Battle cascadeSaveBattle(Battle updatedBattle) {
        battleDao.save(updatedBattle);
        updatedBattle.setInvolvedArmies(
                updatedBattle.getInvolvedArmies().stream().map(
                        army -> cascadeSaveArmy(army, updatedBattle)
                )
                .collect(Collectors.toList())
        );
        return updatedBattle;
    }

    private Army cascadeSaveArmy(Army updatedArmy, Battle parentBattle) {
        updatedArmy.setBattleId(parentBattle.getId());
        logger.info("About to save army {} with id {}", updatedArmy.getName(), updatedArmy.getId());
        armyDao.save(updatedArmy);
        updatedArmy.setLeaders(
                updatedArmy.getLeaders().stream().map(
                        leader -> {
                            leader.setArmyId(updatedArmy.getId());
                            return characterDao.saveAndFlush(leader);
                        }
                )
                .collect(Collectors.toList())
        );
        updatedArmy.setCohorts(
                updatedArmy.getCohorts().stream().map(
                        cohort -> cascadeSaveCohort(cohort, updatedArmy)
                )
                .collect(Collectors.toList())
        );
        if(updatedArmy.getCommander()!=null) {
            updatedArmy.getCommander().setArmyId(updatedArmy.getId());
            if(updatedArmy.getCommander().getId()!=null) {
                Character existingCharacter = characterDao.findById(updatedArmy.getCommander().getId()).orElse(null);
                if(!(existingCharacter instanceof Commander)) {
                    logger.info("Promoting {} to commander (erasing him as common character)", existingCharacter.getName());
                    characterDao.deleteById(existingCharacter.getId());
                    characterDao.flush();   //we can eventually remove this, I just dont like the ID raising with no reason
                }
            }
            logger.info("About to persist commander {} with id {}", updatedArmy.getCommander().getName(), updatedArmy.getCommander().getId());
            updatedArmy.setCommander(
                    characterDao.saveAndFlush(updatedArmy.getCommander())
            );
        }

        return updatedArmy;
    }

    private Cohort cascadeSaveCohort(Cohort updatedCohort, Army parentArmy) {
        updatedCohort.setArmyId(parentArmy.getId());
        Long cohortId = cohortDao.save(updatedCohort).getId();
        if(updatedCohort.getLeader()!=null) {
            updatedCohort.getLeader().setArmyId(parentArmy.getId());
            updatedCohort.getLeader().setCohortId(cohortId);
            updatedCohort.setLeader(
                    characterDao.saveAndFlush(updatedCohort.getLeader())
            );
        }
        return updatedCohort;
    }

    private Battle fetchBattleChildrenProperties(Battle baseBattleRecord) {
        baseBattleRecord.setInvolvedArmies(
                armyDao.findByBattleId(baseBattleRecord.getId()).stream().map(
                        army -> {
                            try {
                                return fetchArmyChildrenProperties(army);
                            }
                            catch (Exception e) {
                                throw WrappedException.throwWrapped(e);
                            }
                        }
                )
                .collect(Collectors.toList())
        );
        return baseBattleRecord;
    }

    private Army fetchArmyChildrenProperties(Army baseArmyRecord) {
        baseArmyRecord.setLeaders(
                characterDao.findByArmyId(baseArmyRecord.getId())
        );
        baseArmyRecord.setCohorts(
            cohortDao.findByArmyId(baseArmyRecord.getId()).stream().map(
                    army -> {
                        try {
                            return fetchCohortChildrenProperties(army);
                        }
                        catch (Exception e) {
                            throw WrappedException.throwWrapped(e);
                        }
                    }
            )
            .collect(Collectors.toList())
        );
        final List<Character> armyCommanderCandidates = characterDao.findOneByArmyIdAndDtype(baseArmyRecord.getId(), Commander.class);
        if(!armyCommanderCandidates.isEmpty()) {
            baseArmyRecord.setCommander(
                    (Commander) armyCommanderCandidates.get(0)
            );
        }
        return baseArmyRecord;
    }

    private Cohort fetchCohortChildrenProperties(Cohort baseCohortRecord) {
        final List<Character> cohortLeaderCandidates = characterDao.findOneByCohortId(baseCohortRecord.getId());
        if(!cohortLeaderCandidates.isEmpty()) {
            baseCohortRecord.setLeader(
                    cohortLeaderCandidates.get(0)
            );
        }
        return baseCohortRecord;
    }
}
