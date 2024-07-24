import { create } from 'zustand';
import { BurnCharts, Ensemble_Data, EnsembleUS, Item, Projet, Sprint, US, prorityStats, stateStats } from "@/app/model/projet/index";
import { nativeItemTypeEnum, nativePriorityEnum, nativeStateEnum } from '@/app/model/projet/itemEnum';
import { differenceInDays, addDays, format } from "date-fns"

export interface TreeState {
  project: Projet;
  selectedItem: undefined | Item;
  setProject: (newProject: Projet) => void;
  findItemInProject: (itemId: string) => Item | undefined;
  setSelectedItem: (newSelectedItem: any) => void;
  addItem: (parentId: string, newItem: Item) => void;
  deleteItem: (itemId: string) => void;
  editItem: (itemId: string, updatedProperties: Item) => void;
  editItemState: (itemId: string, updatedState: string) => void;
  getNewUS: (statut?: nativeStateEnum) => US;
  getNewEnsemble: () => EnsembleUS;
  getNewSprint: (statut?: string) => Sprint;
  getTimeData: (sprint: Sprint) => any;
  getPointData: (chartData: any, item: Sprint | EnsembleUS) => any;
  getSprintStats: (sprint: Item) => Ensemble_Data;
  getSprintPointsAndCompletedAux: (itemList: Item[], acc: Ensemble_Data) => Ensemble_Data;
  getBurnUpAndDown: (data: any, totalPoints: number) => any;
  getItemData: (item: Item) => { burn: BurnCharts, stateStats: stateStats };
}

const mockProjet = {
  nom: "Project1 Name",
  description: "description",
  id: "id-proj1",
  children: [
    {
      "nom": "Sprint 1",
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
        },
        {
          "nom": "Ensemble 13",
          "description": "DescriptionEnsemble 13",
          "children": [
            {
              "nom": "User Story 14",
              "description": "DescriptionUser Story 14",
              "id": "ID-User Story14",
              "priorite": "Majeure",
              "statut": "Terminée",
              "version": "",
              "estimation": 15,
              "datesEffectives": {
                "from": "",
                "to": "2024-07-18T09:29:19.240Z"
              },
              "children": [],
              "commentaires": "",
              "type": "User Story"
            },
            {
              "nom": "Ensemble 15",
              "description": "DescriptionEnsemble 15",
              "children": [
                {
                  "nom": "User Story 16",
                  "description": "DescriptionUser Story 16",
                  "id": "ID-User Story16",
                  "priorite": "Mineure",
                  "statut": "Terminée",
                  "version": "",
                  "estimation": 30,
                  "datesEffectives": {
                    "from": "",
                    "to": "2024-07-24T09:29:32.603Z"
                  },
                  "children": [],
                  "commentaires": "",
                  "type": "User Story"
                }
              ],
              "id": "ID-Ensemble15",
              "commentaires": "",
              "type": "Ensemble"
            }
          ],
          "id": "ID-Ensemble13",
          "commentaires": "",
          "type": "Ensemble"
        }
      ],
      commentaires: "",
      type: "Sprint"
    }
  ],
  "commentaires": "",
  "type": "Sprint",
  childNb: 16,
} as Projet

export const useTreeStore = create<TreeState>((set, get) => ({
  project: mockProjet,
  selectedItem: undefined,
  setProject: (newProject) => set({ project: newProject }),
  findItemInProject: (itemId: string): Item | undefined => {
    const findItemAux = (children: Item[], itemId: string): Item | undefined => {
      for (const item of children) {
        if (item == undefined) {
          return
        }
        if (item.id == itemId) {
          return item
        }
        if (item.children && item.children.length > 0) {
          const found = findItemAux(item.children, itemId);
          if (found) {
            return found;
          }
        }
      }
      return undefined;
    }

    return findItemAux(get().project.children, itemId);
  },
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
  editItem: (itemId, updatedProperties: any) => set((state) => {
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

    if (updatedProperties.statut == nativeStateEnum.En_Cours) {
      updatedProperties.datesEffectives.from = format(new Date(), "EEE LLL dd y")
    } else if (updatedProperties.statut == nativeStateEnum.Terminee) {
      updatedProperties.datesEffectives.to = format(new Date(), "EEE LLL dd y")
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
          var updatedDate = { from: "", to: "" }
          if (updatedState == nativeStateEnum.En_Cours) {
            updatedDate.to = format(new Date(), "EEE LLL dd y")
          } else if (updatedState == nativeStateEnum.Terminee) {
            updatedDate.to = format(new Date(), "EEE LLL dd y")
          }
          return { ...item, statut: updatedState, datesEffectives: updatedDate };
        } else if (found) {
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
      nom: nativeItemTypeEnum.US + " " + nextUSNb,
      description: "Description" + nativeItemTypeEnum.US + " " + nextUSNb,
      id: "ID-" + nativeItemTypeEnum.US + nextUSNb,
      priorite: nativePriorityEnum.Mineure,
      statut: statut,
      version: "",
      estimation: 0,
      datesEffectives: statut == nativeStateEnum.Terminee ? { from: new Date(), to: new Date() } : { from: "", to: "" },
      children: [],
      commentaires: "",
      type: nativeItemTypeEnum.US,
    }
  },
  getNewEnsemble: () => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.Ensemble + " " + nextUSNb,
      description: "Description" + nativeItemTypeEnum.Ensemble + " " + nextUSNb,
      children: [],
      id: "ID-" + nativeItemTypeEnum.Ensemble + nextUSNb,
      commentaires: "",
      type: nativeItemTypeEnum.Ensemble
    }
  },
  getNewSprint: (statut = "") => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.Sprint + " " + nextUSNb,
      description: "Description" + nativeItemTypeEnum.Sprint + " " + nextUSNb,
      id: "ID-" + nativeItemTypeEnum.Sprint + nextUSNb,
      statut: statut ? statut : nativeStateEnum.A_Faire,
      datesEffectives: { from: "", to: "" },
      children: [],
      commentaires: "",
      type: nativeItemTypeEnum.Sprint,
    }
  },
  getTimeData: (sprint) => {
    const startDate = sprint.datesEffectives.from
    const sprintPeriod = differenceInDays(sprint.datesEffectives.to, startDate);
    var chartData: any = {};
    for (let dayNb = 0; dayNb <= sprintPeriod + 1; dayNb++) { // +1 pour le graphique
      chartData[format(addDays(new Date(startDate), dayNb), 'MMM-dd')] = 0
    }
    return chartData;
  },
  getPointData: (chartData, item) => {
    item.children?.forEach(child => {
      if (child.type == nativeItemTypeEnum.US && (child as US).statut == nativeStateEnum.Terminee) {
        chartData[format((child as US).datesEffectives.to, "MMM-dd")] += (child as US).estimation;
      } else if (child.type == nativeItemTypeEnum.Ensemble && child.children && child.children.length > 0) {
        chartData = get().getPointData(chartData, child);
      }
    });
    return chartData;
  },
  getSprintStats: (sprint: Item): Ensemble_Data => {
    var { totalPoints, donePoints, stateStats, priorityStats } = { totalPoints: 0, donePoints: 0, stateStats: { [nativeStateEnum.Terminee]: 0, [nativeStateEnum.En_Cours]: 0, [nativeStateEnum.A_Faire]: 0 }, priorityStats: { [nativePriorityEnum.Mineure]: 0, [nativePriorityEnum.Majeure]: 0, [nativePriorityEnum.Critique]: 0 } };
    return get().getSprintPointsAndCompletedAux(sprint.children, { totalPoints, donePoints, stateStats, priorityStats });
  },
  getSprintPointsAndCompletedAux: (itemList: Item[], acc: Ensemble_Data): Ensemble_Data => {
    itemList?.forEach(item => {
      if (item.type == nativeItemTypeEnum.US) {
        acc.totalPoints += (item as US).estimation;
        acc.stateStats[(item as US).statut]++;
        if ((item as US).statut == nativeStateEnum.Terminee) {
          acc.donePoints += (item as US).estimation;
        }
        acc.priorityStats[(item as US).priorite]++;
      } else if (item.type == nativeItemTypeEnum.Ensemble && item.children && item.children.length > 0) {
        acc = get().getSprintPointsAndCompletedAux(item.children, acc);
      }
    });
    return acc;
  },
  getBurnUpAndDown: (data, totalPoints) => {
    var acc = 0;
    var burn: { up: any[], down: any[] } = { up: [], down: [] }
    Object.keys(data).forEach(date => {
      acc += parseInt(data[date] || 0);
      burn.up.push({
        date: date,
        pointsRestants: acc
      });
      burn.down.push({
        date: date,
        pointsRestants: totalPoints - acc
      });
    })
    return burn;
  },
  getItemData: (item: Item) => {
    var sprintStats = get().getSprintStats(item as Sprint);
    var chartData = get().getTimeData(item as Sprint);
    chartData = get().getPointData(chartData, item);
    var chart = get().getBurnUpAndDown(chartData, sprintStats.totalPoints);
    return { burn: chart, stateStats: sprintStats.stateStats };
  }
}));

