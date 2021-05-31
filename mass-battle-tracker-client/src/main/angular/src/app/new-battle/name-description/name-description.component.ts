import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
import {isEqualWith} from "lodash";
import {isNullOrEmptyString} from "../../shared/utility/string.utility";

import { Battle } from "../../shared/data-model/mass-battle-tracker-server";
import { Router } from '@angular/router';

@Component({
  selector: 'app-name-description',
  templateUrl: './name-description.component.html',
  styleUrls: ['./name-description.component.scss']
})
export class NameDescriptionComponent implements OnInit {

  private battle: Battle = {name : "", description : "", involvedArmies : []};
  private battleFormValueChangesSubscription: Subscription;

  newBattleForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router:Router) { }

  ngOnInit(): void {
    this.buildBattleForm();
  }

  ngOnDestroy(): void {
    this.battleFormValueChangesSubscription.unsubscribe();
  }

  onSubmit(): void {
    console.log("You clicked NEXT with name = " + this.newBattleForm.value.name + " and description = " + this.newBattleForm.value.description);
    this.router.navigateByUrl('/new-battle/involved-armies', {
      state: {battle: {name : this.newBattleForm.value.name, description : this.newBattleForm.value.description, involvedArmies : []}}
  });
  }

  private buildBattleForm(): void {
    this.newBattleForm = this.formBuilder.group({
      name: new FormControl(''),//[this.battle.name, Validators.required],
      description: new FormControl('')//[this.battle.description, Validators.required]
    });

    let formInitialValue = this.newBattleForm.value;
    this.battleFormValueChangesSubscription = this.newBattleForm.valueChanges
      .subscribe(() => {
        let formCurrentValueEqualsInitialValue = isEqualWith(formInitialValue, this.newBattleForm.getRawValue(),
          (field1, field2) => { // treat empty and null strings as equal
            if (isNullOrEmptyString(field1) && isNullOrEmptyString(field2))
              return true;
          })

        if (formCurrentValueEqualsInitialValue)
          this.newBattleForm.markAsPristine()
      })
  }
}
