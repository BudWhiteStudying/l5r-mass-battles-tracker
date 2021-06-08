import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Army, Battle, ExecutedAction, RoundState, StrategicObjective } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'totals-check',
  templateUrl: './totals-check.component.html',
  styleUrls: ['./totals-check.component.scss']
})
export class TotalsCheckComponent implements OnInit {

  battle : Battle;
  roundState : RoundState;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
      this.roundState = this.router.getCurrentNavigation().extras.state.roundState;
    }
  }

  ngOnInit(): void {}

  onSubmit() : void {
    this.registerTotals();
    console.debug("Upon submission, roundState is\n" + JSON.stringify(this.roundState, null, 4));
    this.router.navigateByUrl('/play-battle/rounds/round-summary', {
      state: {battle: this.battle, roundState : this.roundState}
    });
  }

  determineAttritionSuffered(army : Army) : number {
    return this.retrieveHostileActions(army)
      .map(action => action.attritionCaused ? action.attritionCaused : 0)
      .reduce((a,b)=>a+b,0);
  }

  determinePanicSuffered(army : Army) : number {
    return this.retrieveHostileActions(army)
      .map(action => action.panicCaused ? action.panicCaused : 0)
      .reduce((a,b)=>a+b,0);
  }

  determinePanicRemoved(army : Army) : number {
    return this.retrieveFriendlyActions(army)
    .map(action => action.panicRemoved ? action.panicRemoved : 0)
    .reduce((a,b)=>a+b,0);
  }

  determineTotalAttritionSuffered(army : Army) : number {
    let attritionFromHostileObjectives = this.retrieveHostileObjective(army)?.attritionCaused;
    return this.determineAttritionSuffered(army) + (attritionFromHostileObjectives ? attritionFromHostileObjectives : 0);
  }

  determineTotalPanicSuffered(army : Army) : number {
    let panicFromHostileObjectives = this.retrieveHostileObjective(army)?.panicCaused;
    return this.determinePanicSuffered(army) + (panicFromHostileObjectives ? panicFromHostileObjectives : 0);
  }

  determineTotalPanicRemoved(army : Army) : number {
    let disiplineRecoveryFromFriendlyObjectives = this.retrieveFriendlyObjective(army)?.panicRemoved;
    return this.determinePanicRemoved(army) + (disiplineRecoveryFromFriendlyObjectives ? disiplineRecoveryFromFriendlyObjectives : 0);
  }

  private retrieveHostileActions(army : Army) : ExecutedAction[] {
    return this.roundState.actionHistory
    .filter(action =>
      action.executionRound===this.roundState.roundIndex
      && !army.leaders.includes(action.perpetrator));
  }
  private retrieveFriendlyActions(army : Army) : ExecutedAction[] {
    return this.roundState.actionHistory
    .filter(action =>
      action.executionRound===this.roundState.roundIndex
      && army.leaders.includes(action.perpetrator));
  }
  private retrieveHostileObjective(army : Army) : StrategicObjective {
    let opposingArmy = this.battle.involvedArmies.find(anArmy => anArmy!=army);
    return this.roundState.currentObjectivePerArmyName[opposingArmy.name].reached
    ? this.roundState.currentObjectivePerArmyName[opposingArmy.name]
    : null;
  }
  private retrieveFriendlyObjective(army : Army) : StrategicObjective {
    return this.roundState.currentObjectivePerArmyName[army.name].reached
    ? this.roundState.currentObjectivePerArmyName[army.name]
    : null;
  }

  private registerTotals() : void {
    this.battle.involvedArmies.forEach(
      army => {
        this.roundState.scorePerArmyName[army.name].totalAttritionSuffered = this.determineTotalAttritionSuffered(army);
        this.roundState.scorePerArmyName[army.name].totalPanicSuffered = this.determineTotalPanicSuffered(army);
        this.roundState.scorePerArmyName[army.name].totalPanicRemoved = this.determineTotalPanicRemoved(army);
        this.roundState.scorePerArmyName[army.name].totalCasualtiesSuffered = this.roundState.scorePerArmyName[army.name].totalAttritionSuffered-army.attritionReduction;
      });
  }
}