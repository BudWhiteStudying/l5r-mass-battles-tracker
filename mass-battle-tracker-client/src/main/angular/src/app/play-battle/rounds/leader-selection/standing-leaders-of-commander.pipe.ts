import { Pipe, PipeTransform } from '@angular/core';
import { Battle, Character, RoundState } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Pipe({
    name: 'standingleadersofcommander',
    pure: false
})
export class StandingLeadersOfCommanderPipe implements PipeTransform {
    transform(battle: Battle, roundState: RoundState): Character[] {
        if (!battle || !battle.involvedArmies) {
            throw {};
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return battle.involvedArmies
        .find(army => army.commander.name===roundState.actingCommander.name).leaders
            .filter(
                leader =>
                !roundState.actionHistory
                    .filter(action => action.executionRound===roundState.roundIndex)
                        .map(action => action.perpetrator)
                            .includes(leader));
    }
}