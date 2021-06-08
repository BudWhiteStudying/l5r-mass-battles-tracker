package l5r.mass.battle.tracker.controller;

import ch.qos.logback.classic.Logger;
import l5r.mass.battle.tracker.model.dto.Battles;
import l5r.mass.battle.tracker.model.entity.Battle;
import l5r.mass.battle.tracker.service.BattleService;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(ResourcePaths.Api.BASE)
public class ApiController {

    private final BattleService battleService;

    private final ch.qos.logback.classic.Logger logger = (Logger) LoggerFactory.getLogger(ApiController.class);

    @GetMapping(
            value = ResourcePaths.Api.BATTLE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Battle getInitializedBattle() {
        logger.debug("Client requests the initialization of a new battle");
        return battleService.initializeNewBattle();
    }

    @PutMapping(
            value = ResourcePaths.Api.BATTLE,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Battle updateBattle(@RequestBody Battle battle) {
        logger.debug("Client wants us to update battle {} to {}", battle.getId(), battle);
        return battleService.updateBattle(battle);
    }

    @PostMapping(
            value = ResourcePaths.Api.BATTLE,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Battle finalizeNewBattle(@RequestBody Battle battle) {
        logger.debug("Client wants us to record {}", battle);
        return battleService.updateBattle(battle);
    }

    @GetMapping(
            value = ResourcePaths.Api.ALL_BATTLES,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Battles getAllBattles() {
        logger.debug("Client requests a dump of all the battles");
        return battleService.getAllBattles();
    }
}
