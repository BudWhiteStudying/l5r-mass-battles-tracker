import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Army, Battle, ExecutedAction, RoundState, StrategicObjective } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'conditions-check',
  templateUrl: './conditions-check.component.html',
  styleUrls: ['./conditions-check.component.scss']
})
export class ConditionsCheckComponent implements OnInit {

  battle : Battle;
  roundState : RoundState;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
      this.roundState = this.router.getCurrentNavigation().extras.state.roundState;
    }
  }

  ngOnInit(): void {
    this.determineRoundTotals(this.battle, this.roundState);
  }

  onSubmit() : void {}

  private determineRoundTotals(battle : Battle, roundState : RoundState) : void {
    console.debug("Determining totals for round " + roundState.roundIndex);
    battle.involvedArmies.forEach(army => {
      console.debug("Considering " + army.name);
      let totalAttritionSuffered = this.determineAttritionSuffered(army);
      let totalPanicSuffered = this.determinePanicSuffered(army);
      let totalDisciplineRecovered = this.determineDisciplineRecovered(army);
      let totalCasualtiesSuffered = Math.max(totalAttritionSuffered-army.attritionReduction,0);
      console.debug("Army " + army.name
      + " suffered " + totalAttritionSuffered + " attrition (" + totalCasualtiesSuffered + " casualties), "
      + totalPanicSuffered + " panic, and recovered "
      + totalDisciplineRecovered + " discipline");
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

  determineDisciplineRecovered(army : Army) : number {
    return this.retrieveFriendlyActions(army)
    .map(action => action.disciplineRecovered ? action.disciplineRecovered : 0)
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

  determineTotalDisciplineRecovered(army : Army) : number {
    let disiplineRecoveryFromFriendlyObjectives = this.retrieveFriendlyObjective(army)?.disciplineRecovered;
    return this.determineDisciplineRecovered(army) + (disiplineRecoveryFromFriendlyObjectives ? disiplineRecoveryFromFriendlyObjectives : 0);
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
}
