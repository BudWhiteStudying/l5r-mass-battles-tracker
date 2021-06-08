package l5r.mass.battle.tracker.controller;

import l5r.mass.battle.tracker.model.dto.*;
import l5r.mass.battle.tracker.model.entity.Action;
import l5r.mass.battle.tracker.model.entity.Army;
import l5r.mass.battle.tracker.model.entity.Battle;
import l5r.mass.battle.tracker.model.entity.Character;
import l5r.mass.battle.tracker.model.entity.StrategicObjective;
import l5r.mass.battle.tracker.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(ResourcePaths.Admin.BASE)
@RequiredArgsConstructor
public class AdminController {
    
    private final AdminService adminService;

    @GetMapping(
            value = ResourcePaths.Admin.ALL_ARMIES,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Armies getArmies() {
        return adminService.getArmies();
    }

    @GetMapping(
            value = ResourcePaths.Admin.ALL_BATTLES,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Battles getBattles() {
        return adminService.getBattles();
    }

    @GetMapping(
            value = ResourcePaths.Admin.ALL_CHARACTERS,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Characters getCharacters() {
        return adminService.getCharacters();
    }

    @GetMapping(
            value = ResourcePaths.Admin.ALL_ACTIONS,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Actions getActions() {
        return adminService.getActions();
    }

    @GetMapping(
            value = ResourcePaths.Admin.ALL_OBJECTIVES,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Objectives getObjectives() {
        return adminService.getObjectives();
    }

    @PostMapping(
            value = ResourcePaths.Admin.ARMY,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Army createArmy(@RequestBody Army army) {
        return adminService.createArmy(army);
    }

    @PostMapping(
            value = ResourcePaths.Admin.BATTLE,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Battle createBattle(@RequestBody Battle battle) {
        return adminService.createBattle(battle);
    }

    @PostMapping(
            value = ResourcePaths.Admin.CHARACTER,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Character createCharacter(@RequestBody Character character) {
        return adminService.createCharacter(character);
    }

    @PostMapping(
            value = ResourcePaths.Admin.ACTION,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Action createAction(@RequestBody Action action) {
        return adminService.createAction(action);
    }

    @PostMapping(
            value = ResourcePaths.Admin.OBJECTIVE,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public StrategicObjective createObjective(@RequestBody StrategicObjective objective) {
        return adminService.createObjective(objective);
    }


    @PutMapping(
            value = ResourcePaths.Admin.ARMY,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Army updateArmy(@RequestBody Army army) {
        return adminService.updateArmy(army);
    }

    @PutMapping(
            value = ResourcePaths.Admin.BATTLE,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Battle updateBattle(@RequestBody Battle battle) {
        return adminService.updateBattle(battle);
    }

    @PutMapping(
            value = ResourcePaths.Admin.CHARACTER,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Character updateCharacter(@RequestBody Character character) {
        return adminService.updateCharacter(character);
    }

    @PutMapping(
            value = ResourcePaths.Admin.ACTION,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Action updateAction(@RequestBody Action action) {
        return adminService.updateAction(action);
    }

    @PutMapping(
            value = ResourcePaths.Admin.OBJECTIVE,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public StrategicObjective updateObjective(@RequestBody StrategicObjective objective) {
        return adminService.updateObjective(objective);
    }
}
