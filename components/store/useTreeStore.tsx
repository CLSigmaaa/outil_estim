
import { create } from 'zustand';
import { EnsembleUS, Item, Projet, Sprint, Tache, US } from "@/app/model/projet/index";
import { nativeMasteryEnum, nativeItemTypeEnum, nativePriorityEnum, nativeStateEnum } from '@/app/model/projet/itemEnum';

export interface TreeState {
  project: Projet;
  selectedItem: undefined | any;
  setProject: (newProject: Projet) => void;
  setSelectedItem: (newSelectedItem: any) => void;
  addItem: (parentId: string, newItem: Item | Tache) => void;
  deleteItem: (itemId: string) => void;
  editItem: (itemId: string, updatedProperties: Item | Tache) => void;
  editItemState: (itemId: string, updatedState: string) => void;
  getNewUS: (statut?: nativeStateEnum) => US;
  getNewTache: (statut?: string) => Tache;
  getNewEnsemble: () => EnsembleUS;
  getNewSprint: (statut?: string) => Sprint;
}

const mockProjet = {
  nom: "Project1 Name",
  description: "description",
  id:"id-proj1",
  children: [
    {"nom": "Sprint 1",
        "description": "DescriptionUser Sprint 1",
        "id": "ID-Sprint1",
        "statut": "Terminée",
        "datesEffectives": {
            "from": "2024-07-01T12:23:21.335Z",
            "to": "2024-07-30T12:23:21.335Z"
        },
        "children": [
          {
            "nom": "User Story 2",
            "description": "DescriptionUser Story 2",
            "id": "ID-User Story2",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 10,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-09T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 3",
            "description": "DescriptionUser Story 3",
            "id": "ID-User Story3",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 15,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-12T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 4",
            "description": "DescriptionUser Story 4",
            "id": "ID-User Story4",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 20,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-15T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 5",
            "description": "DescriptionUser Story 5",
            "id": "ID-User Story5",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 25,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-21T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 6",
            "description": "DescriptionUser Story 6",
            "id": "ID-User Story6",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 30,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-23T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 7",
            "description": "DescriptionUser Story 7",
            "id": "ID-User Story7",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 35,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-25T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 8",
            "description": "DescriptionUser Story 8",
            "id": "ID-User Story8",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 25,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-26T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 9",
            "description": "DescriptionUser Story 9",
            "id": "ID-User Story9",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 35,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-28T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 10",
            "description": "DescriptionUser Story 10",
            "id": "ID-User Story10",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 15,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-28T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        },
        {
            "nom": "User Story 11",
            "description": "DescriptionUser Story 11",
            "id": "ID-User Story11",
            "priorite": "Mineure",
            "statut": "Terminée",
            "version": "",
            "estimation": 30,
            "datesEffectives": {
                "from": "",
                "to": "2024-07-30T12:23:21.335Z"
            },
            "children": [],
            "commentaires": "",
            "type": "User Story",
        }
        ],
        "commentaires": "",
        "type": "Sprint"
      }
],
  childNb: 12,
} as Projet

export const useTreeStore = create<TreeState>((set, get) => ({
  project: mockProjet,
  // {
  //   // Initialisez avec un projet par défaut ou un objet vide
  //   nom: "",
  //   description: "",
  //   id: "",
  //   children: [],
  //   childNb: 0,
  // } as Projet,
  selectedItem: undefined,
  setProject: (newProject) => set({ project: newProject }),
  setSelectedItem: (newSelectedItem) => set({ selectedItem: newSelectedItem }),
  addItem: (parentId, newItem) => set((state) => {
    const findAndAddItem = (items: Item[], parentId: string, newItem: Item |Tache): Item[] => {
      return items.map(item => {
        if (item.id === parentId) {
          state.setSelectedItem({ ...item, children: [...item.children, newItem] })
          return { ...item, children: [...item.children, newItem] } as Item;
        } else if (item.children?.length > 0) { // Les taches ne possèdent pas d'enfant
          return { ...item, children: findAndAddItem(item.children, parentId, newItem) } as Item;
        }
        return item;
      });
    };
    return {
      project: {
        ...state.project,
        children: parentId ? findAndAddItem(state.project.children, parentId, newItem) : [...state.project.children, newItem],
        childNb: state.project.childNb + 1,
      }
    };
  }),
  deleteItem: (itemId) => set((state) => {
    const findAndDeleteItem = (items: Item[], itemId: string): Item[] => {
      return items?.filter(item => item.id !== itemId)
        .map(item => ({
          ...item,
          children: findAndDeleteItem(item.children, itemId)
        } as Item));
    };

    return {
      project: {
        ...state.project,
        children: findAndDeleteItem(state.project.children, itemId),
      },
    };
  }),
  editItem: (itemId, updatedProperties) => set((state) => {
    const findAndEditItem = (items: Item[], itemId: string): Item[] => {
      return items.map(item => {
        if (item.id === itemId) {
          return { ...item, ...updatedProperties };
        } else if (item.children?.length > 0) {
          return { ...item, children: findAndEditItem(item.children, itemId) } as Item;
        }
        return item;
      });
    };
    
    if (updatedProperties.statut == nativeStateEnum.Terminee){
      updatedProperties.datesEffectives.to = new Date()
    }
    return {
      project: {
        ...state.project,
        children: findAndEditItem(state.project.children, itemId),
      }
    };
  }),
  editItemState: (itemId, updatedState) => set((state) => {
    const findAndEditItemState = (parent: any, itemId: string): Item[] => {
      var items: Item[] = parent.children;
      var found: boolean = false;
      return items.map(item => {
        if (item.id === itemId) {
          found = true;
          state.setSelectedItem({
            ...parent, 
            children: items.map(child => child.id === itemId ? { ...child, statut: updatedState } : child)
          })
          return { ...item, statut: updatedState };
        } else if (found){
          return item;
        } else if (item.children?.length > 0) {
          return { ...item, children: findAndEditItemState(item, itemId) } as Item;
        }
        return item;
      });
    };
    return {
      project: {
        ...state.project,
        children: findAndEditItemState(state.project, itemId),
      }
    };
  }),
  getNewUS: (statut = nativeStateEnum.A_Faire) => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.US +" "+ nextUSNb,
      description: "Description" + nativeItemTypeEnum.US +" "+ nextUSNb,
      id: "ID-"+nativeItemTypeEnum.US + nextUSNb,
      priorite: nativePriorityEnum.Mineure,
      statut: statut,
      version: "",
      estimation: 0,
      datesEffectives: {from:"", to:""},
      children: [],
      commentaires: "",
      type: nativeItemTypeEnum.US,
    }
  },
  getNewTache: (statut = "") => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.Tache +" "+ nextUSNb,
      description: "Description" + nativeItemTypeEnum.Tache +" "+ nextUSNb,
      statut: statut ? statut : nativeStateEnum.A_Faire,
      id: "ID"+nativeItemTypeEnum.Tache + nextUSNb,
      type: nativeItemTypeEnum.Tache
    }
  },
  getNewEnsemble: () => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.Ensemble +" "+ nextUSNb,
      description: "Description" + nativeItemTypeEnum.Ensemble +" "+ nextUSNb,
      children: [],
      id: "ID-"+nativeItemTypeEnum.Ensemble + nextUSNb,
      commentaires: "",
      type: nativeItemTypeEnum.Ensemble
    }
  },
  getNewSprint: (statut = "") => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.Sprint +" "+ nextUSNb,
      description: "Description" + nativeItemTypeEnum.Sprint +" "+ nextUSNb,
      id: "ID-"+nativeItemTypeEnum.Sprint + nextUSNb,
      statut: statut ? statut : nativeStateEnum.A_Faire,
      datesEffectives: {from:"", to:""},
      children: [],
      commentaires: "",
      type: nativeItemTypeEnum.Sprint,
    }
  }
}));

