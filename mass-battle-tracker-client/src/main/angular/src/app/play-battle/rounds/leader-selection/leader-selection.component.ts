import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Battle, RoundState } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'leader-selection',
  templateUrl: './leader-selection.component.html',
  styleUrls: ['./leader-selection.component.scss']
})
export class LeaderSelectionComponent implements OnInit {

  battle : Battle;
  roundState : RoundState;
  
  pageTitle = `"Rounds" phase: acting Commander picks a Leader`;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
      this.roundState = this.router.getCurrentNavigation().extras.state.roundState;
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.router.navigateByUrl('/play-battle/rounds/leader-action', {
      state: {battle: this.battle, roundState : this.roundState}
    });
  }
}
