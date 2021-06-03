/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.30.840 on 2021-06-03 13:11:51.

export interface Army extends Serializable {
    name: string;
    description?: string;
    mainClan?: string;
    cohorts?: Cohort[];
    leaders?: Character[];
    commander?: Commander;
    strength?: number;
    currentCasualties?: number;
    discipline?: number;
    currentPanic?: number;
}

export interface Battle extends Serializable {
    id?: number;
    name: string;
    description?: string;
    involvedArmies?: Army[];
}

export interface Character extends Serializable {
    name: string;
    clan: string;
}

export interface Cohort extends Serializable {
    name: string;
    leader: Character;
}

export interface Commander extends Character {
    initiative?: number;
}

export interface Serializable {
}
