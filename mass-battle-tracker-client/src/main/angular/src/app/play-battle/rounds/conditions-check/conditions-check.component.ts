import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Battle, RoundState } from 'src/app/shared/data-model/mass-battle-tracker-server';

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

  private determineRoundTotals(battle : Battle, roundState : RoundState) : void {
    console.debug("Determining totals for round " + roundState.roundIndex);
    battle.involvedArmies.forEach(army => {
      console.debug("Considering " + army.name);
      let hostileActions = roundState.actionHistory
      .filter(action =>
        action.executionRound===roundState.roundIndex
        && !army.leaders.includes(action.perpetrator));
      let friendlyActions = roundState.actionHistory
        .filter(action =>
          action.executionRound===roundState.roundIndex
          && army.leaders.includes(action.perpetrator));
      let totalAttritionSuffered = hostileActions
      .map(action => action.attritionCaused ? action.attritionCaused : 0)
      .reduce((a,b)=>a+b,0);
      let totalPanicSuffered = hostileActions
      .map(action => action.panicCaused ? action.panicCaused : 0)
      .reduce((a,b)=>a+b,0);
      let totalDisciplineRecovered = friendlyActions
      .map(action => action.disciplineRecovered ? action.disciplineRecovered : 0)
      .reduce((a,b)=>a+b,0);
      let totalCasualtiesSuffered = Math.max(totalAttritionSuffered-army.attritionReduction,0);
      console.debug("Army " + army.name
      + " suffered " + totalAttritionSuffered + " attrition (" + totalCasualtiesSuffered + " casualties), "
      + totalPanicSuffered + " panic, and recovered "
      + totalDisciplineRecovered + " discipline");
    });
  }
}
