/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.30.840 on 2021-06-01 20:39:05.

export interface Army extends Serializable {
    name: string;
    description: string;
    mainClan: string;
    cohorts: Cohort[];
    leaders: Character[];
    strength: number;
    currentCasualties: number;
    discipline: number;
    currentPanic: number;
}

export interface Battle extends Serializable {
    name: string;
    description: string;
    involvedArmies: Army[];
}

export interface Character extends Serializable {
    name: string;
    clan: string;
}

export interface Cohort extends Serializable {
    name: string;
    description: string;
    leader: Character;
}

export interface Serializable {
}
