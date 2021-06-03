import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Battle } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'final-summary',
  templateUrl: './final-summary.component.html',
  styleUrls: ['./final-summary.component.scss']
})
export class FinalSummaryComponent implements OnInit {

  battle : Battle;

  constructor(private router : Router,private httpClient: HttpClient) {
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
    console.debug("About to invoke");
    this.httpClient
    .post<Battle>("/mass-battle-tracker/api/battle",this.battle).toPromise()
    .then(
      response => {
        console.info("Here it is: " + JSON.stringify(response));
        this.router.navigateByUrl("/play-battle/initiative/commander-selection", {
          state: {battle: this.battle}
        });
      }
    );
    this.router.navigateByUrl("/");
  }

}
