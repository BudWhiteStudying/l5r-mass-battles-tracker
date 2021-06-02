import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing/landing.component';

import { NameDescriptionComponent } from './new-battle/name-description/name-description.component';
import { InvolvedArmiesComponent } from './new-battle/involved-armies/involved-armies.component';
import { FinalSummaryComponent } from './new-battle/final-summary/final-summary.component';

import { AvailableBattlesComponent } from './resume-battle/available-battles/available-battles.component';

import { CommanderSelectionComponent } from './play-battle/initiative/commander-selection/commander-selection.component';
import { InitiativeRecordingComponent } from './play-battle/initiative/initiative-recording/initiative-recording.component';
import { LeadersSelectionComponent } from './play-battle/initiative/leaders-selection/leaders-selection.component';

import { ObjectiveSelectionComponent } from './play-battle/rounds/objective-selection/objective-selection.component';
import { LeaderSelectionComponent } from './play-battle/rounds/leader-selection/leader-selection.component';
import { LeaderActionComponent } from './play-battle/rounds/leader-action/leader-action.component';
import { ConditionsCheckComponent } from './play-battle/rounds/conditions-check/conditions-check.component';


const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'new-battle/name-description',
    component: NameDescriptionComponent
  },
  {
    path: 'new-battle/involved-armies',
    component: InvolvedArmiesComponent
  },
  {
    path: 'new-battle/final-summary',
    component: FinalSummaryComponent
  },
  {
    path: 'resume-battle/available-battles',
    component: AvailableBattlesComponent
  },
  {
    path: 'play-battle/initiative/commander-selection',
    component: CommanderSelectionComponent
  },
  {
    path: 'play-battle/initiative/initiative-recording',
    component: InitiativeRecordingComponent
  },
  {
    path: 'play-battle/initiative/leaders-selection',
    component: LeadersSelectionComponent
  },
  {
    path: 'play-battle/rounds/objective-selection',
    component: ObjectiveSelectionComponent
  },
  {
    path: 'play-battle/rounds/leader-selection',
    component: LeaderSelectionComponent
  },
  {
    path: 'play-battle/rounds/leader-action',
    component: LeaderActionComponent
  },
  {
    path: 'play-battle/rounds/conditions-check',
    component: ConditionsCheckComponent
  },
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
