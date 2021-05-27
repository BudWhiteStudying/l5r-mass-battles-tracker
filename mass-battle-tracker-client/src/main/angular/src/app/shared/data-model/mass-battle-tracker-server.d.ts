/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.30.840 on 2021-05-28 01:42:09.

export interface Army extends Serializable {
    name: string;
    description: string;
    cohorts: Cohort[];
    strength: number;
    currentCasualties: number;
    discipline: number;
    currentPanic: number;
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
