
import { create } from 'zustand';
import { EnsembleUS, Item, Projet, Sprint, US } from "@/app/model/projet/index";

export interface TreeState {
  project: Projet;
  selectedItem: undefined | any;
  setProject: (newProject: Projet) => void;
  setSelectedItem: (newSelectedItem: any) => void;
  addItem: (parentId: string, newItem: Item) => void;
  deleteItem: (itemId: string) => void;
  editItem: (itemId: string, updatedProperties: Item) => void;
  getNewUS: () => US;
  getNewEnsemble: () => EnsembleUS;
  getNewSprint: () => Sprint;
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
          return { ...item, children: [...item.children, newItem] } as Item;
        } else if (item.children.length > 0) {
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
      return items.filter(item => item.id !== itemId)
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
        } else if (item.children.length > 0) {
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
  getNewUS: () => {
    let nextUSNb = get().project.childNb + 1;
    return {
      nom: "US" + nextUSNb,
      description: "description de l'US" + nextUSNb,
      id: "ID-US" + nextUSNb,
      priorite: "",
      statut: "",
      technologies: "",
      complexite: "",
      estimation: "",
      datesEstimee: {from:"", to:""},
      datesEffectives: {from:"", to:""},
      children: [],
      commentaires: "",
      type: "US",
      new_attachments: [],
      existing_attachments: [],
    }
  },
  getNewEnsemble: () => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: "Ensemble" + nextUSNb,
      description: "",
      children: [],
      id: "ID-Ensemble" + nextUSNb,
      commentaires: "",
      type: "Ensemble"
    }
  },
  getNewSprint: () => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: "Sprint" + nextUSNb,
      description: "Description du Sprint" + nextUSNb,
      id: "ID-Sprint" + nextUSNb,
      statut: "",
      datesEstimee: {from:"", to:""},
      datesEffectives: {from:"", to:""},
      children: [],
      commentaires: "",
      type: "Sprint",
    }
  }
}));

