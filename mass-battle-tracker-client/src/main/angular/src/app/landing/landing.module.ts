import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class LandingModule { }
