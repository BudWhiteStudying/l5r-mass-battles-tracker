import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Battle, RoundState } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'first-move',
  templateUrl: './first-move.component.html',
  styleUrls: ['./first-move.component.scss']
})
export class FirstMoveComponent implements OnInit {

  battle : Battle;
  roundState : RoundState;
  pageTitle = `"Rounds" phase: determine who makes the first move`;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
      this.roundState = this.router.getCurrentNavigation().extras.state.roundState;
    }
  }

  ngOnInit(): void {
    this.pageTitle = `Rounds phase (round {this.roundState.roundIndex}): determine who makes the first move`;
  }

  onSubmit(): void {
    console.debug("Upon submission, roundState is\n" + JSON.stringify(this.roundState, null, 4));
    this.router.navigateByUrl('/play-battle/rounds/leader-selection', {
      state: {battle: this.battle, roundState : this.roundState}
    });
  }
}
