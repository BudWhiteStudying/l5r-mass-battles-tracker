import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectiveSelectionComponent } from './objective-selection/objective-selection.component';
import { LeaderSelectionComponent } from './leader-selection/leader-selection.component';
import { LeaderActionComponent } from './leader-action/leader-action.component';
import { ConditionsCheckComponent } from './conditions-check/conditions-check.component';



@NgModule({
  declarations: [ObjectiveSelectionComponent, LeaderSelectionComponent, LeaderActionComponent, ConditionsCheckComponent],
  imports: [
    CommonModule
  ]
})
export class RoundsModule { }
