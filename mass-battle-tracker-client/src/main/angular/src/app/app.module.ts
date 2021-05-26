import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingModule } from './landing/landing.module';
import { NewBattleModule } from './new-battle/new-battle.module';
import { ResumeBattleModule } from './resume-battle/resume-battle.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LandingModule,
    NewBattleModule,
    ResumeBattleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
