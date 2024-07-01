export class US {
    nom: string;
    description: string;
    id: string;
    priorite: string;
    statut: string;
    technologies: string;
    complexite: string;
    estimation: string;
    datesEstimee: string;
    datesEffectives: string;
    children: Item[];

    constructor(nom: string, description: string, id: string, priorite: string, statut: string, technologies: string, complexite: string, estimation: string, datesEstimee: string, datesEffectives: string, children: Item[]){
    this.nom = nom;
    this.description = description;
    this.id = id;
    this.priorite = priorite;
    this.statut = statut;
    this.technologies = technologies;
    this.complexite = complexite;
    this.estimation = estimation;
    this.datesEstimee = datesEstimee;
    this.datesEffectives = datesEffectives;
    this.children = children;
    }
}

export type Item =  US | EnsembleUS | Sprint;

export type NestedItem = US | EnsembleUS;

export class EnsembleUS {
    nom: string;
    children: NestedItem[];
    id: string;
    constructor(nom: string, children: NestedItem[], id: string){
        this.nom = nom;
        this.children = children;
        this.id = id;
    }
}

export class Sprint {
    nom: string;
    children: NestedItem[];
    id: string;
    constructor(nom: string, children: NestedItem[], id:string){
        this.nom = nom;
        this.children = children;
        this.id = id;
    }
}

export class Projet {
    nom: string;
    description: string;
    id: string;
    children: Item[];
    childNb:number;
    constructor(nom: string, description: string, children: Item[], id: string, childNb:number){
        this.nom = nom;
        this.description = description;
        this.children = children;
        this.id = id;
        this.childNb = childNb;
    }
}

