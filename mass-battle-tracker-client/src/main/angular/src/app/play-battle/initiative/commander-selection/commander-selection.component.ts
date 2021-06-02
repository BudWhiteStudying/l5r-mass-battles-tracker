import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Battle } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'commander-selection',
  templateUrl: './commander-selection.component.html',
  styleUrls: ['./commander-selection.component.scss']
})
export class CommanderSelectionComponent implements OnInit {

  battle : Battle;

  constructor(private router:Router) {
    if(this.router.getCurrentNavigation().extras.state) {
      this.battle = this.router.getCurrentNavigation().extras.state.battle;
    }
    else {
      this.battle = {
        "description": "The Scorpion tries to snatch Kenson Gakka back from Lion hands",
        "involvedArmies": [
            {
                "cohorts": [
                    {
                        "description": "Elite Guard",
                        "leader": {
                            "clan": "",
                            "name": "Bayushi Ogoi"
                        },
                        "name": "Elite Guard"
                    },
                    {
                        "description": "Heavy Infantry I",
                        "leader": {
                            "clan": "",
                            "name": "Shosuro Ageko"
                        },
                        "name": "Heavy Infantry I"
                    }
                ],
                "currentCasualties": 0,
                "currentPanic": 0,
                "description": "",
                "discipline": 70,
                "mainClan": "Scorpion",
                "name": "Scorpion attackers",
                "strength": 70
            },
            {
                "cohorts": [
                    {
                        "description": "Heavy cavalry",
                        "leader": {
                            "clan": "",
                            "name": "Matsu Mitsui"
                        },
                        "name": "Heavy cavalry"
                    },
                    {
                        "description": "Crab infantry",
                        "leader": {
                            "clan": "",
                            "name": "Hida Gamagori"
                        },
                        "name": "Crab infantry"
                    }
                ],
                "currentCasualties": 0,
                "currentPanic": 0,
                "description": "",
                "discipline": 80,
                "mainClan": "Lion",
                "name": "Lion defenders",
                "strength": 100
            }
        ],
        "name": "The Battle of Kenson Gakka"
    };
    }
    console.debug("Component has been constructed, battle is " + JSON.stringify(this.battle));
  }

  ngOnInit(): void {
  }

}
