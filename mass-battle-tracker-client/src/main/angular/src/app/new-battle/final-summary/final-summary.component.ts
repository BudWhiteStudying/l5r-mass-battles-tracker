import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Battle } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'app-final-summary',
  templateUrl: './final-summary.component.html',
  styleUrls: ['./final-summary.component.scss']
})
export class FinalSummaryComponent implements OnInit {

  battle : Battle;

  constructor(private router : Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
      console.debug("Reached the final screen with battle: " + JSON.stringify(this.battle));
    }
    else {
      this.router.navigateByUrl("/");
    }}

  ngOnInit(): void {
  }

  onFinalSubmit(): void {
    this.router.navigateByUrl("/");
  }

}
