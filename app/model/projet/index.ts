import { string } from "zod";
import { nativeItemTypeEnum, nativePriorityEnum, nativeStateEnum } from "./itemEnum";

export type Estimation = {id: string, date: Date, consommee: number, resteAFaire: number, causeEcart: string};

export type TaskData = {name: string, description: string, priority: nativePriorityEnum, state: nativeStateEnum, estimationList: Estimation[], effectiveDates: {from: Date, to: Date}, type: nativeItemTypeEnum};

export class Task {
    name: string;
    description: string;
    id: string;
    priority: nativePriorityEnum;
    state: nativeStateEnum;
    estimationList: Estimation[];
    effectiveDates: { from: Date, to: Date };
    type: nativeItemTypeEnum;

    constructor(name: string, description: string, id: string, priority: nativePriorityEnum, state: nativeStateEnum, 
        estimationList: Estimation[], effectivesDates: { from: Date, to: Date }, type: nativeItemTypeEnum) {
        this.name = name;
        this.description = description;
        this.id = id;
        this.priority = priority;
        this.state = state;
        this.estimationList = estimationList;
        this.effectiveDates = effectivesDates;
        this.type = type;
    }
}

export type SprintData = {name: string, description: string, tasks: Task[], state: nativeStateEnum, effectivesDates: { from: string, to: string }, type: nativeItemTypeEnum};

export class Sprint {
    name: string;
    description: string;
    tasks: Task[];
    id: string;
    state: nativeStateEnum;
    effectivesDates: { from: string, to: string };
    type: nativeItemTypeEnum
   
    constructor (name: string, description: string, tasks: Task[], id: string, state: nativeStateEnum, 
        effectivesDates: { from: string, to: string }, type: nativeItemTypeEnum) {
        this.name = name;
        this.description = description;
        this.tasks = tasks;
        this.id = id;
        this.state = state;
        this.effectivesDates = effectivesDates;
        this.type = type;
    }
}

export class Projet {
    nom: string;
    description: string;
    id: string;
    sprints: Sprint[];
    childNb: number;
    constructor(nom: string, description: string, sprints: Sprint[], id: string, childNb: number) {
        this.nom = nom;
        this.description = description;
        this.sprints = sprints;
        this.id = id;
        this.childNb = childNb;
    }
}
export type Sprint_Data = {
    burn: BurnCharts,
    totalPoints: number,
    donePoints: number,
    stateStats: stateStats,
    priorityStats: prorityStats
}

export type BurnCharts = {
    up: [{
        date: string,
        pointsRestants: number
    }];
    down: [{
        date: string,
        pointsRestants: number
    }];
}

export type stateStats = {
    [nativeStateEnum.Terminee]: number;
    [nativeStateEnum.En_Cours]: number;
    [nativeStateEnum.A_Faire]: number;
};

export type prorityStats = {
    [nativePriorityEnum.Mineure]: number;
    [nativePriorityEnum.Majeure]: number;
    [nativePriorityEnum.Critique]: number;
};
