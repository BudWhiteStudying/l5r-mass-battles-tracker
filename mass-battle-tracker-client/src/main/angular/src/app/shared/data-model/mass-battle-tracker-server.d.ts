/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.30.840 on 2021-06-05 01:36:58.

export interface Action extends Serializable {
    description?: string;
    type?: ActionType;
    canCauseAttrition?: boolean;
    canCausePanic?: boolean;
    canRecoverDiscipline?: boolean;
}

export interface Army extends Serializable {
    name: string;
    description?: string;
    mainClan?: string;
    cohorts?: Cohort[];
    leaders?: Character[];
    commander?: Commander;
    strength?: number;
    currentCasualties?: number;
    attritionReduction?: number;
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

export interface ExecutedAction extends Action {
    executionRound?: number;
    perpetrator?: Character;
    perpetratorStance?: ConflictStance;
    attritionCaused?: number;
    panicCaused?: number;
    disciplineRecovered?: number;
}

export interface RoundState extends Serializable {
    roundIndex?: number;
    actingCommander?: Commander;
    actingLeader?: Character;
    currentObjectivePerArmyName?: { [index: string]: string };
    actionHistory?: ExecutedAction[];
}

export interface StrategicObjective extends Serializable {
    name?: string;
    description?: string;
    type?: StrategicObjectiveType;
}

export interface Serializable {
}

export const enum ActionType {
    ASSAULT = "ASSAULT",
    CHALLENGE = "CHALLENGE",
    REINFORCE = "REINFORCE",
    RALLY = "RALLY",
    MARCH = "MARCH",
}

export const enum ConflictStance {
    AIR = "AIR",
    EARTH = "EARTH",
    FIRE = "FIRE",
    VOID = "VOID",
    WATER = "WATER",
}

export const enum StrategicObjectiveType {
    TODO1 = "TODO1",
    TODO2 = "TODO2",
    TO_VICTORY = "TO_VICTORY",
}
