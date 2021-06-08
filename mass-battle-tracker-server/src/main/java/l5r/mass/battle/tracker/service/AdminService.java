package l5r.mass.battle.tracker.service;

import l5r.mass.battle.tracker.dao.*;
import l5r.mass.battle.tracker.model.dto.*;
import l5r.mass.battle.tracker.model.entity.Action;
import l5r.mass.battle.tracker.model.entity.Army;
import l5r.mass.battle.tracker.model.entity.Battle;
import l5r.mass.battle.tracker.model.entity.Character;
import l5r.mass.battle.tracker.model.entity.StrategicObjective;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final ArmyDao armyDao;
    private final BattleDao battleDao;
    private final CharacterDao characterDao;
    private final ActionDao actionDao;
    private final StrategicObjectiveDao objectiveDao;

    public Armies getArmies() {
        return new Armies(armyDao.findAll());
    }
    public Battles getBattles() {
        return new Battles((battleDao.findAll()));
    }
    public Characters getCharacters() {
        return new Characters(characterDao.findAll());
    }
    public Actions getActions() {
        return new Actions(actionDao.findAll());
    }
    public Objectives getObjectives() {
        return new Objectives(objectiveDao.findAll());
    }

    public Army createArmy(Army army) {
        return armyDao.save(army);
    }
    public Battle createBattle(Battle battle) {
        return battleDao.save(battle);
    }
    public Character createCharacter(Character character) {
        return characterDao.save(character);
    }
    public Action createAction(Action action) {
        return actionDao.save(action);
    }
    public StrategicObjective createObjective(StrategicObjective objective) {
        return objectiveDao.save(objective);
    }

    public Army updateArmy(Army army) {
        return armyDao.save(army);
    }
    public Battle updateBattle(Battle battle) {
        return battleDao.save(battle);
    }
    public Character updateCharacter(Character character) {
        return characterDao.save(character);
    }
    public Action updateAction(Action action) {
        return actionDao.save(action);
    }
    public StrategicObjective updateObjective(StrategicObjective objective) {
        return objectiveDao.save(objective);
    }
}
