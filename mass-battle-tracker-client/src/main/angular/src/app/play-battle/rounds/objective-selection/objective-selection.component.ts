import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Battle, RoundState } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'objective-selection',
  templateUrl: './objective-selection.component.html',
  styleUrls: ['./objective-selection.component.scss']
})
export class ObjectiveSelectionComponent implements OnInit {

  battle : Battle;
  roundState : RoundState;
  
  pageTitle = `"Rounds" phase: set strategic objectives for the Round`;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
      if(this.router.getCurrentNavigation().extras.state.roundState) {
        this.roundState = this.router.getCurrentNavigation().extras.state.roundState;
      }
      else {
        this.roundState = {
          roundIndex : 0,
          currentObjectivePerArmyName : {},
          actionHistory : []
        };
      }
    }
    else {
      //this.router.navigateByUrl("/");
      this.battle = {
        "description": "The Scorpion tries to snatch Kenson Gakka back from Lion hands",
        "involvedArmies": [
            {
                "leaders": [
                    {
                        "clan": "",
                        "name": "Bayushi Ogoi"
                    },
                    {
                        "clan": "",
                        "name": "Shosuro Ageko"
                    }
                ],
                "currentCasualties": 0,
                "currentPanic": 0,
                "attritionReduction" : 0,
                "description": "",
                "discipline": 70,
                "mainClan": "Scorpion",
                "name": "Scorpion attackers",
                "strength": 70,
                "commander": {
                    "clan": "",
                    "name": "Shosuro Ageko",
                    "initiative": 3
                },
                "cohorts": [
                    {
                        "name": "Elite Guard",
                        "leader": {
                            "clan": "",
                            "name": "Bayushi Ogoi"
                        }
                    },
                    {
                        "name": "Infiltrators",
                        "leader": {
                            "clan": "",
                            "name": "Shosuro Ageko"
                        }
                    }
                ]
            },
            {
                "leaders": [
                    {
                        "clan": "Lion",
                        "name": "Matsu Mitsui"
                    },
                    {
                        "clan": "Crab",
                        "name": "Hida Gamagori"
                    }
                ],
                "currentCasualties": 0,
                "currentPanic": 0,
                "attritionReduction" : 0,
                "description": "",
                "discipline": 80,
                "mainClan": "Lion",
                "name": "Lion defenders",
                "strength": 100,
                "commander": {
                    "clan": "Crab",
                    "name": "Hida Gamagori",
                    "initiative": 4
                },
                "cohorts": [
                    {
                        "name": "Light Infantry",
                        "leader": {
                            "clan": "Lion",
                            "name": "Matsu Mitsui"
                        }
                    },
                    {
                        "name": "Heavy Infantry",
                        "leader": {
                            "clan": "Crab",
                            "name": "Hida Gamagori"
                        }
                    }
                ]
            }
        ],
        "name": "The Battle of Kenson Gakka"
    };
    this.roundState = {
      roundIndex : 0,
      currentObjectivePerArmyName : {},
      scorePerArmyName : {},
      actionHistory : []
    };
    }
  }

  onSubmit(): void {
    console.debug("Upon submission, roundState is\n" + JSON.stringify(this.roundState, null, 4));

    this.router.navigateByUrl('/play-battle/rounds/first-move', {
      state: {battle: this.battle, roundState : this.roundState}
    });
  }

  private initializeStrategicObjectives() : void {
    this.battle.involvedArmies.forEach(
      army => {
        this.roundState.currentObjectivePerArmyName[army.name] = {
          name : "",
          description : "",
          reached : false
        };
      }
    );
  }

  private initializeRoundScores() : void {
    this.battle.involvedArmies.forEach(
      army => {
        this.roundState.scorePerArmyName[army.name] = {
          totalAttritionSuffered : 0,
          totalPanicSuffered : 0,
          totalDisciplineRecovered : 0
        };
      }
    );
  }

  ngOnInit(): void {
    this.roundState.roundIndex++;
    this.pageTitle = `Rounds phase (round {this.roundState.roundIndex}): set strategic objectives`;
    this.initializeStrategicObjectives();
    this.initializeRoundScores();
  }

}
