import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Army, Battle, Cohort } from 'src/app/shared/data-model/mass-battle-tracker-server';
import {isEqualWith} from "lodash";
import {isNullOrEmptyString} from "../../shared/utility/string.utility";

@Component({
  selector: 'app-involved-armies',
  templateUrl: './involved-armies.component.html',
  styleUrls: ['./involved-armies.component.scss']
})
export class InvolvedArmiesComponent implements OnInit {

  battle : Battle;
  addingNewArmy : Boolean = false;
  addingNewCohort : Boolean = false;

  armyInProgress : Army = {
    name : "",
    description : "",
    mainClan : "",
    cohorts : [],
    strength : 0,
    discipline : 0,
    currentCasualties : 0,
    currentPanic : 0
  };

  cohortInProgress : Cohort = {
    name : "",
    description : "",
    leader : {
      name : "",
      clan : ""
    }
  };

  private armyFormValueChangesSubscription: Subscription;
  private cohortFormValueChangesSubscription: Subscription;

  newArmyForm: FormGroup;
  newCohortForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
      this.buildArmyForm();
      this.buildCohortForm();
    }
    else {
      this.router.navigateByUrl("/");
    }
  }

  ngOnInit(): void {
    console.log("Yo I received: " + JSON.stringify(this.battle));
/*     if(this.battle) {
      let mockArmy1 : Army = {name : "Army 1", description : "That one army", mainClan : "Lion", cohorts : [], strength : 100, discipline : 100, currentCasualties : 0, currentPanic : 0};
      let mockArmy2 : Army = {name : "Army 2", description : "That other army", mainClan : "Crab", cohorts : [], strength : 100, discipline : 100, currentCasualties : 0, currentPanic : 0};
      this.battle.involvedArmies.push(mockArmy1);
      this.battle.involvedArmies.push(mockArmy2);
    } */
  }

  onFinalSubmit(): void {
    this.router.navigateByUrl('/new-battle/final-summary', {
      state: {battle: this.battle}
    });
  }

  onAddArmyClicked(): void {
    if(!this.addingNewArmy) {
      this.addingNewArmy = true;
      this.armyInProgress = 
        {
          name : "",
          description : "",
          mainClan : "",
          cohorts : [],
          strength : 0,
          discipline : 0,
          currentCasualties : 0,
          currentPanic : 0
        };
    }
  }

  onNewArmySubmit(): void {
    this.armyInProgress.name = this.newArmyForm.value.armyName;
    this.armyInProgress.mainClan = this.newArmyForm.value.armyClan;
    this.armyInProgress.strength = this.newArmyForm.value.armyStrength;
    this.armyInProgress.discipline = this.newArmyForm.value.armyDiscipline;
    this.battle.involvedArmies.push(this.armyInProgress);
    console.debug("New state of battle after onNewArmySubmit: " + JSON.stringify(this.battle,null,4));
    this.addingNewArmy = false;
    this.newArmyForm.reset();
  }

  onNewCohortSubmit(): void {
    this.cohortInProgress.name = this.newCohortForm.value.cohortName;
    this.cohortInProgress.description = this.newCohortForm.value.cohortName;
    this.cohortInProgress.leader = {
      name : this.newCohortForm.value.leaderName,
      clan : this.armyInProgress.mainClan
    }
    this.armyInProgress.cohorts.push(this.cohortInProgress);
    console.debug("New state of army after onNewCohortSubmit: " + JSON.stringify(this.armyInProgress,null,4));
    this.addingNewCohort = false;
    this.newCohortForm.reset();
  }

  onAddCohortClicked(): void {
    if(!this.addingNewCohort) {
      this.addingNewCohort = true;
      this.cohortInProgress = 
        {
          name : "",
          description : "",
          leader : {
            name : "",
            clan : ""
          }
        };
    }
  }



  private buildArmyForm(): void {
    this.newArmyForm = this.formBuilder.group({
      armyName: new FormControl(''),//[this.battle.name, Validators.required],
      armyClan: new FormControl(''),//[this.battle.name, Validators.required],
      armyStrength: new FormControl(''),//[this.battle.description, Validators.required],//[this.battle.name, Validators.required],
      armyDiscipline: new FormControl('')//[this.battle.description, Validators.required]
    });

    let formInitialValue = this.newArmyForm.value;
    this.armyFormValueChangesSubscription = this.newArmyForm.valueChanges
      .subscribe(() => {
        let formCurrentValueEqualsInitialValue = isEqualWith(formInitialValue, this.newArmyForm.getRawValue(),
          (field1, field2) => { // treat empty and null strings as equal
            if (isNullOrEmptyString(field1) && isNullOrEmptyString(field2))
              return true;
          })

        if (formCurrentValueEqualsInitialValue)
          this.newArmyForm.markAsPristine();
      })
  }



  private buildCohortForm(): void {
    this.newCohortForm = this.formBuilder.group({
      leaderName: new FormControl(''),//[this.battle.name, Validators.required],
      cohortName: new FormControl('')//[this.battle.description, Validators.required]
    });

    let formInitialValue = this.newCohortForm.value;
    this.cohortFormValueChangesSubscription = this.newCohortForm.valueChanges
      .subscribe(() => {
        let formCurrentValueEqualsInitialValue = isEqualWith(formInitialValue, this.newCohortForm.getRawValue(),
          (field1, field2) => { // treat empty and null strings as equal
            if (isNullOrEmptyString(field1) && isNullOrEmptyString(field2))
              return true;
          })

        if (formCurrentValueEqualsInitialValue)
          this.newCohortForm.markAsPristine()
      })
  }
}
