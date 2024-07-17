
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
  getNewUS: (statut?: string) => US;
  getNewEnsemble: () => EnsembleUS;
  getNewSprint: (statut?: string) => Sprint;
}

export const useTreeStore = create<TreeState>((set, get) => ({
  project: {
    // Initialisez avec un projet par défaut ou un objet vide
    nom: "",
    description: "",
    id: "",
    children: [],
    childNb: 0,
  } as Projet,
  selectedItem: undefined,
  setProject: (newProject) => set({ project: newProject }),
  setSelectedItem: (newSelectedItem) => set({ selectedItem: newSelectedItem }),
  addItem: (parentId, newItem) => set((state) => {
    const findAndAddItem = (items: Item[], parentId: string, newItem: Item): Item[] => {
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
    return {
      project: {
        ...state.project,
        children: findAndEditItem(state.project.children, itemId),
      }
    };
  }),
  getNewUS: (statut = "") => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.US +" "+ nextUSNb,
      description: "",
      id: "ID-"+nativeItemTypeEnum.US + nextUSNb,
      priorite: nativePriorityEnum.Mineure,
      statut: statut ? statut : nativeStateEnum.A_Faire,
      version: "",
      maitrise: nativeMasteryEnum.Faible,
      estimation: "",
      datesEffectives: {from:"", to:""},
      children: [],
      commentaires: "",
      type: nativeItemTypeEnum.US,
      new_attachments: [],
      existing_attachments: [],
    }
  },
  getNewEnsemble: () => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.Ensemble +" "+ nextUSNb,
      description: "",
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
      description: "",
      id: "ID-"+nativeItemTypeEnum.Sprint + nextUSNb,
      statut: statut ? statut : nativeStateEnum.A_Faire,
      datesEffectives: {from:"", to:""},
      children: [],
      commentaires: "",
      type: nativeItemTypeEnum.Sprint,
    }
  }
}));

