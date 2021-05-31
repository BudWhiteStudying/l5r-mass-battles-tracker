import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameDescriptionComponent } from './name-description/name-description.component';
import { InvolvedArmiesComponent } from './involved-armies/involved-armies.component';
import { FinalSummaryComponent } from './final-summary/final-summary.component';
import { AppRoutingModule } from '../app-routing.module';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [NameDescriptionComponent, InvolvedArmiesComponent, FinalSummaryComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ]
})
export class NewBattleModule { }
