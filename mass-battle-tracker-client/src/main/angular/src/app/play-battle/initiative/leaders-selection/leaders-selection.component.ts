import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebDriverLogger } from 'blocking-proxy/built/lib/webdriver_logger';
import { Army, Battle, Cohort } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'leaders-selection',
  templateUrl: './leaders-selection.component.html',
  styleUrls: ['./leaders-selection.component.scss']
})
export class LeadersSelectionComponent implements OnInit {

  pageTitle = "Initiative phase: for each Army, select the Leaders that will lead the Cohorts"

  battle : Battle;
  cohortInProgress : Cohort = {name : "", leader : {name : "", clan : ""}};
  addingNewCohort : Boolean;
  currentArmyName : String;
  notEnoughCohortsError : Boolean;

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

  onAddCohortClicked(army : Army): void {
    this.notEnoughCohortsError = false;
    console.debug("Start forming cohort for army " + army.name);
    this.addingNewCohort = true;
    this.currentArmyName = army.name;
  }

  onDiscardCohortClicked(): void {
    this.addingNewCohort = false;
  }

  onNewCohortSubmit(containingArmy : Army): void {
    this.notEnoughCohortsError = false;
    console.debug("Cohort submitted for army " + containingArmy.name + ", cohortInProgress is\n" + JSON.stringify(this.cohortInProgress, null, 3));
    if(!this.battle.involvedArmies.find(army => army.name==containingArmy.name).cohorts) {
      this.battle.involvedArmies.find(army => army.name==containingArmy.name).cohorts = [];
    }
    this.battle.involvedArmies.find(army => army.name==containingArmy.name).cohorts.push(this.cohortInProgress);
    this.addingNewCohort = false;
    this.cohortInProgress = {name : "", leader : {name : "", clan : ""}};
  }

  onSubmit(): void {
    console.debug("Upon submission, battle is:\n" + JSON.stringify(this.battle, null, 4));
    for (let army of this.battle.involvedArmies) {
      if(!army.cohorts || !army.cohorts.length) {
        console.warn("Cohorts were not defined in at least one case");
        this.notEnoughCohortsError = true;
      }
    }
  }
}
