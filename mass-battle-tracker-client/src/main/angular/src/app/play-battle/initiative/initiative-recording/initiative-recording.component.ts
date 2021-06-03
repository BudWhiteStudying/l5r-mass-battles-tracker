import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Battle } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'initiative-recording',
  templateUrl: './initiative-recording.component.html',
  styleUrls: ['./initiative-recording.component.scss']
})
export class InitiativeRecordingComponent implements OnInit {

  battle : Battle;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
    }
    else {
      this.router.navigateByUrl("/");
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.debug("Upon submission, battle is:\n" + JSON.stringify(this.battle, null, 4));
    if(this.battle.involvedArmies.filter(army => !army.commander.initiative).length>0) {
      console.warn("Not all initiative values have been set");
    }
    else {
      this.router.navigateByUrl('/play-battle/initiative/leaders-selection', {
        state: {battle: this.battle}
      });
    }
  }
}
