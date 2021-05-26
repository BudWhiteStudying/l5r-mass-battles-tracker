import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing/landing.component';
import { FinalSummaryComponent } from './new-battle/final-summary/final-summary.component';
import { InvolvedArmiesComponent } from './new-battle/involved-armies/involved-armies.component';
import { NameDescriptionComponent } from './new-battle/name-description/name-description.component';
import { AvailableBattlesComponent } from './resume-battle/available-battles/available-battles.component';


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
