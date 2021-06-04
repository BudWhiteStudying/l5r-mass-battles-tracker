import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Action, ActionType, Battle, ExecutedAction, RoundState } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'leader-action',
  templateUrl: './leader-action.component.html',
  styleUrls: ['./leader-action.component.scss']
})
export class LeaderActionComponent implements OnInit {

  battle : Battle;
  roundState : RoundState;

  availableActions : Action[] = [
    {
      description : "Assault",
      type : ActionType.ASSAULT,
      canCauseAttrition : true,
      canCausePanic : false
    },
    {
      description : "Challenge",
      type : ActionType.CHALLENGE,
      canCauseAttrition : false,
      canCausePanic : true
    }
  ];
  
currentAction : ExecutedAction;

  pageTitle = `"Rounds" phase: chosen Leader performs his action`;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
      this.roundState = this.router.getCurrentNavigation().extras.state.roundState;
    }
  }

  onSubmit(): void {
    this.recordAction(this.currentAction, this.roundState);
    //this.roundState.actionHistory.push(this.currentAction);
    this.switchToNextCommander(this.roundState, this.battle);
    console.debug("Upon submission, roundState is\n" + JSON.stringify(this.roundState, null, 4));
    this.router.navigateByUrl('/play-battle/rounds/leader-selection', {
      state: {battle: this.battle, roundState : this.roundState}
    });
  }

  recordAction(action : ExecutedAction, roundState : RoundState) : void {
    action.perpetrator = roundState.actingLeader;
    action.executionRound = roundState.roundIndex;
    roundState.actionHistory.push(action);
  }

  switchToNextCommander(roundState : RoundState, battle : Battle): void {
    roundState.actingCommander = battle.involvedArmies.map(army => army.commander).find(commander => commander!=roundState.actingCommander);
  }

  ngOnInit(): void {
  }

}
