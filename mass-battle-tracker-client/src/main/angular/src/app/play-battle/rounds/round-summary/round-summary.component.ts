import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Battle, RoundState } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'round-summary',
  templateUrl: './round-summary.component.html',
  styleUrls: ['./round-summary.component.scss']
})
export class RoundSummaryComponent implements OnInit {

  battle : Battle;
  roundState : RoundState;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
      this.roundState = this.router.getCurrentNavigation().extras.state.roundState;
    }
  }

  ngOnInit(): void {
  }


  onSubmit() : void {
    console.debug("Upon submission, roundState is\n" + JSON.stringify(this.roundState, null, 4));
    this.router.navigateByUrl('/play-battle/rounds/objective-selection', {
      state: {battle: this.battle, roundState : this.roundState}
    });
  }
}
