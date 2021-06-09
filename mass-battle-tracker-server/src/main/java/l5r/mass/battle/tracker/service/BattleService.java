package l5r.mass.battle.tracker.service;

import ch.qos.logback.classic.Logger;
import l5r.mass.battle.tracker.dao.ArmyDao;
import l5r.mass.battle.tracker.dao.BattleDao;
import l5r.mass.battle.tracker.dao.CharacterDao;
import l5r.mass.battle.tracker.dao.CohortDao;
import l5r.mass.battle.tracker.model.dto.Battles;
import l5r.mass.battle.tracker.model.entity.Army;
import l5r.mass.battle.tracker.model.entity.Battle;
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
                        return null;
                    }
                }
        )
        .filter(Objects::nonNull)
        .collect(Collectors.toList()));
    }

    //TODO: set relation IDs on children - currently null
    private Battle cascadeSaveBattle(Battle updatedBattle) {
        battleDao.save(updatedBattle);
        updatedBattle.setInvolvedArmies(
                updatedBattle.getInvolvedArmies().stream().map(
                        this::cascadeSaveArmy
                )
                .collect(Collectors.toList())
        );
        return updatedBattle;
    }

    private Army cascadeSaveArmy(Army updatedArmy) {
        armyDao.save(updatedArmy);
        updatedArmy.setLeaders(
                updatedArmy.getLeaders().stream().map(
                        characterDao::save
                )
                .collect(Collectors.toList())
        );
        updatedArmy.setCohorts(
                updatedArmy.getCohorts().stream().map(
                        this::cascadeSaveCohort
                )
                .collect(Collectors.toList())
        );
        if(updatedArmy.getCommander()!=null) {
            updatedArmy.setCommander(
                    characterDao.save(updatedArmy.getCommander())
            );
        }

        return updatedArmy;
    }

    private Cohort cascadeSaveCohort(Cohort updatedCohort) {
        cohortDao.save(updatedCohort);
        if(updatedCohort.getLeader()!=null) {
            updatedCohort.setLeader(
                    characterDao.save(updatedCohort.getLeader())
            );
        }
        return updatedCohort;
    }

    private Battle fetchBattleChildrenProperties(Battle baseBattleRecord) throws Exception {
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

    private Army fetchArmyChildrenProperties(Army baseArmyRecord) throws Exception {
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
        baseArmyRecord.setCommander(
                (Commander) characterDao.findOneByArmyIdAndDtype(baseArmyRecord.getId(), Commander.class.getTypeName()).orElseThrow(
                        Exception::new
                )
        );
        return baseArmyRecord;
    }

    private Cohort fetchCohortChildrenProperties(Cohort baseCohortRecord) throws Exception {
        baseCohortRecord.setLeader(
                characterDao.findOneByCohortId(baseCohortRecord.getId()).orElseThrow(
                        Exception::new
                )
        );
        return baseCohortRecord;
    }
}
