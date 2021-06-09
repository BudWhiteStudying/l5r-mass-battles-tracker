/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 2.30.840 on 2021-06-08 22:10:27.

export interface ExecutedAction extends Action {
    executionRound?: number;
    perpetrator?: Character;
    perpetratorStance?: ConflictStance;
    attritionCaused?: number;
    panicCaused?: number;
    panicRemoved?: number;
}

export interface RoundScore extends Serializable {
    totalAttritionSuffered?: number;
    totalPanicSuffered?: number;
    totalPanicRemoved?: number;
    totalCasualtiesSuffered?: number;
}

export interface RoundState extends Serializable {
    roundIndex?: number;
    actingCommander?: Commander;
    actingLeader?: Character;
    currentObjectivePerArmyName?: { [index: string]: StrategicObjective };
    scorePerArmyName?: { [index: string]: RoundScore };
    actionHistory?: ExecutedAction[];
}

export interface Actions {
    actions?: Action[];
}

export interface Armies {
    armies?: Army[];
}

export interface Battles {
    battles?: Battle[];
}

export interface Characters {
    characters?: Character[];
}

export interface Objectives {
    objectives?: StrategicObjective[];
}

export interface Action extends Serializable {
    type?: ActionType;
    description?: string;
    canCauseAttrition?: boolean;
    canCausePanic?: boolean;
    canRemovePanic?: boolean;
}

export interface Army extends Serializable {
    id?: number;
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
    id?: number;
    name: string;
    clan: string;
}

export interface Cohort extends Serializable {
    id?: number;
    name: string;
    leader: Character;
}

export interface Commander extends Character {
    initiative?: number;
}

export interface StrategicObjective extends Serializable {
    type?: StrategicObjectiveType;
    name?: string;
    reached?: boolean;
    attritionCaused?: number;
    panicCaused?: number;
    panicRemoved?: number;
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
