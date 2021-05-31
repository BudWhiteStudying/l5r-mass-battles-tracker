import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Army, Battle } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'app-involved-armies',
  templateUrl: './involved-armies.component.html',
  styleUrls: ['./involved-armies.component.scss']
})
export class InvolvedArmiesComponent implements OnInit {

  battle : Battle;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
    }
  }

  ngOnInit(): void {
    console.log("Yo I received: " + JSON.stringify(this.battle));
    if(this.battle) {
      let mockArmy1 : Army = {name : "Army 1", description : "That one army", cohorts : [], strength : 100, discipline : 100, currentCasualties : 0, currentPanic : 0};
      let mockArmy2 : Army = {name : "Army 2", description : "That other army", cohorts : [], strength : 100, discipline : 100, currentCasualties : 0, currentPanic : 0};
      this.battle.involvedArmies.push(mockArmy1);
      this.battle.involvedArmies.push(mockArmy2);
    }
  }

  onSubmit(): void {}
}
