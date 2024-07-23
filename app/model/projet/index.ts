import { nativePriorityEnum, nativeStateEnum } from "./itemEnum";

export class US {
    nom: string;
    description: string;
    id: string;
    priorite: nativePriorityEnum;
    statut: nativeStateEnum;
    version: string;
    estimation: number;
    datesEffectives: { from: string, to: string };
    children: Item[];
    commentaires: string;
    type: string;

    constructor(nom: string, description: string, id: string, priorite: nativePriorityEnum, statut: nativeStateEnum, version: string,
        estimation: number, datesEffectives: { from: string, to: string },
        children: Item[], commentaires: string, type: string) {
        this.nom = nom;
        this.description = description;
        this.id = id;
        this.priorite = priorite;
        this.statut = statut;
        this.version = version;
        this.estimation = estimation;
        this.datesEffectives = datesEffectives;
        this.children = children;
        this.commentaires = commentaires;
        this.type = type;
    }
}

export type Item = US | EnsembleUS | Sprint;

export type NestedItem = US | EnsembleUS;

export class EnsembleUS {
    nom: string;
    description: string;
    children: NestedItem[];
    id: string;
    commentaires: string;
    type: string;
    constructor(nom: string, description: string, children: NestedItem[], id: string, commentaires: string, type: string) {
        this.nom = nom;
        this.description = description;
        this.children = children;
        this.id = id;
        this.commentaires = commentaires;
        this.type = type;
    }
}

export class Sprint {
    nom: string;
    description: string;
    children: NestedItem[];
    id: string;
    statut: string;
    datesEffectives: { from: string, to: string };
    commentaires: string;
    type: string
    constructor(nom: string, description: string, children: NestedItem[], id: string, statut: string,
        datesEffectives: { from: string, to: string }, commentaires: string, type: string) {
        this.nom = nom;
        this.description = description;
        this.statut = statut;
        this.datesEffectives = datesEffectives;
        this.children = children;
        this.id = id;
        this.commentaires = commentaires;
        this.type = type;
    }
}

export class Projet {
    nom: string;
    description: string;
    id: string;
    children: Item[];
    childNb: number;
    constructor(nom: string, description: string, children: Item[], id: string, childNb: number) {
        this.nom = nom;
        this.description = description;
        this.children = children;
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

export type Ensemble_Data = {
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
