export class US {
    nom: string;
    description: string;
    id: string;
    priorite: string;
    statut: string;
    technologies: string;
    complexite: string;
    estimation: string;
    datesEstimee: {from: string, to :string};
    datesEffectives: {from: string, to :string};
    children: Item[];
    commentaires: string;
    type: string;

    constructor(nom: string, description: string, id: string, priorite: string, statut: string, 
        technologies: string, complexite: string, estimation: string, datesEstimee: {from: string, to :string}, 
        datesEffectives: {from: string, to :string}, children: Item[], commentaires: string, type: string){
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
    this.commentaires = commentaires;
    this.type = type;
    }
}

export type Item =  US | EnsembleUS | Sprint ;

export type NestedItem = US | EnsembleUS;

export class EnsembleUS {
    nom: string;
    description: string;
    children: NestedItem[];
    id: string;
    commentaires: string;
    type: string;
    constructor(nom: string, description: string, children: NestedItem[], id: string,  commentaires: string, type: string){
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
    datesEstimee: {from: string, to :string};
    datesEffectives: {from: string, to :string};
    commentaires: string;
    type: string
    constructor(nom: string, description: string, children: NestedItem[], id:string, statut: string,
        datesEstimee: {from: string, to :string}, datesEffectives: {from: string, to :string}, commentaires: string, type: string){
        this.nom = nom;
        this.description = description;
        this.statut = statut;
        this.datesEstimee = datesEstimee;
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
    childNb:number;
    constructor(nom: string, description: string, children: Item[], id: string, childNb:number){
        this.nom = nom;
        this.description = description;
        this.children = children;
        this.id = id;
        this.childNb = childNb;
    }
}

