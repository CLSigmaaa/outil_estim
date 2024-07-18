 export type FileProperty = {
  nom: string;
  url: string;
  extension: string;
}

export class US {
    nom: string;
    description: string;
    id: string;
    priorite: string;
    statut: string;
    version: string;
    maitrise: string;
    estimation: string;
    datesEffectives: {from: string, to :string};
    children: Item[];
    commentaires: string;
    type: string;
    new_attachments: any[];
    existing_attachments: FileProperty[]; 

    constructor(nom: string, description: string, id: string, priorite: string, statut: string, technologies: string, 
        maitrise: string, estimation: string, datesEffectives: {from: string, to :string}, 
        children: Item[], commentaires: string, type: string, new_attachments: any[], existing_attachments: FileProperty[]){
    this.nom = nom;
    this.description = description;
    this.id = id;
    this.priorite = priorite;
    this.statut = statut;
    this.version = technologies;
    this.maitrise = maitrise;
    this.estimation = estimation;
    this.datesEffectives = datesEffectives;
    this.children = children;
    this.commentaires = commentaires;
    this.type = type;
    this.new_attachments = new_attachments;
    this.existing_attachments = existing_attachments;
    }
}

export class Tache {
    nom: string;
    description: string;
    statut: string;
    id: string;

    constructor(nom: string, description: string, statut: string, id: string){
        this.nom = nom;
        this.description = description;
        this.statut = statut;
        this.id = id;
    }
}

export type Item =  US | EnsembleUS | Sprint  ;

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
    datesEffectives: {from: string, to :string};
    commentaires: string;
    type: string
    constructor(nom: string, description: string, children: NestedItem[], id:string, statut: string,
        datesEstimee: {from: string, to :string}, datesEffectives: {from: string, to :string}, commentaires: string, type: string){
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
    childNb:number;
    constructor(nom: string, description: string, children: Item[], id: string, childNb:number){
        this.nom = nom;
        this.description = description;
        this.children = children;
        this.id = id;
        this.childNb = childNb;
    }
}

