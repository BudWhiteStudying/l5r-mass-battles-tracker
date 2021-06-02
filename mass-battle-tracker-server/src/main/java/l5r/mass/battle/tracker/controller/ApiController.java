package l5r.mass.battle.tracker.controller;

import ch.qos.logback.classic.Logger;
import l5r.mass.battle.tracker.model.Battle;
import l5r.mass.battle.tracker.service.BattleService;
import lombok.RequiredArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ApiController {

    private final BattleService battleService;

    private final ch.qos.logback.classic.Logger logger = (Logger) LoggerFactory.getLogger(ApiController.class);

    @PostMapping(
            value = "/battle",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public Battle recordNewBattle(@RequestBody Battle battle) {
        logger.info("Client wants us to record {}", battle);
        return battleService.recordNewBattle(battle);
    }
}
