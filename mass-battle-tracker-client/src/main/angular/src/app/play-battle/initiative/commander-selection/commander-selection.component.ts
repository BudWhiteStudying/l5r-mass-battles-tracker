import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebDriverLogger } from 'blocking-proxy/built/lib/webdriver_logger';
import { Battle } from 'src/app/shared/data-model/mass-battle-tracker-server';

@Component({
  selector: 'commander-selection',
  templateUrl: './commander-selection.component.html',
  styleUrls: ['./commander-selection.component.scss']
})
export class CommanderSelectionComponent implements OnInit {
  
  pageTitle = "Initiative phase: select a commander for every involved Army";

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
                "description": "",
                "discipline": 70,
                "mainClan": "Scorpion",
                "name": "Scorpion attackers",
                "strength": 70
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

  onSubmit() : void {
    console.debug("Commanders have been selected, army is:\n" + JSON.stringify(this.battle, null, 4));
    if(this.battle.involvedArmies.filter(army => !army.commander).length>0) {
      console.warn("Not all commanders have been set");
    }
    else {
      this.router.navigateByUrl('/play-battle/initiative/initiative-recording', {
        state: {battle: this.battle}
      });
    }
  }
}
