import { create } from 'zustand';
import { Ensemble_Data, EnsembleUS, Item, Projet, Sprint, US, Sprint_Data } from "@/app/model/projet/index";
import { nativeItemTypeEnum, nativePriorityEnum, nativeStateEnum } from '@/app/model/projet/itemEnum';
import { differenceInDays, addDays, format } from "date-fns"

export interface TreeState {
  project: Projet;
  selectedItem: undefined | Item;
  expandedItems: string[];
  currentRoute: string;
  setProject: (newProject: Projet) => void;
  setCurrentRoute: (newRoute: string) => void;
  setSelectedItem: (newSelectedItem: any) => void;
  setExpandedItems: (newExpandedItems: string[]) => void;
  findItemInProject: (itemId: string) => Item | undefined;
  addItem: (parentId: string, newItem: Item) => void;
  deleteItem: (itemId: string) => void;
  editItem: (itemId: string, updatedProperties: Item) => void;
  editItemState: (itemId: string, updatedState: string) => void;
  getNewUS: (statut?: nativeStateEnum) => US;
  getNewEnsemble: () => EnsembleUS;
  getNewSprint: (statut?: string) => Sprint;
  getTimeData: (sprint: Sprint) => any;
  getPointData: (chartData: any, item: Sprint | EnsembleUS) => any;
  getItemChildrenStats: (sprint: Item) => Ensemble_Data;
  getItemChildrenStatsAux: (itemList: Item[], acc: Ensemble_Data) => Ensemble_Data;
  getBurnUpAndDown: (data: any, totalPoints: number) => any;
  getItemData: (item: Item) => Sprint_Data | Ensemble_Data;
  getAllSprintsStats: (project: Projet) => { sprintName: string, sprintData: Sprint_Data }[]
}

const mockProjet = {
  nom: "Project1 Name",
  description: "description",
  id: "proj1",
  children: [
    {
      "nom": "Sprint 1",
      "description": "DescriptionUser Sprint 1",
      "id": "Sprint1",
      "statut": "Terminée",
      "datesEffectives": {
        "from": "2024-07-01T12:23:21.335Z",
        "to": "2024-07-30T12:23:21.335Z"
      },
      "children": [
        {
          "nom": "US 2",
          "description": "DescriptionUser Story 2",
          "id": "US2",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 10,
          "datesEffectives": {
            "from": "2024-06-30T22:00:00.000Z",
            "to": "2024-07-06T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "US 3",
          "description": "DescriptionUser Story 3",
          "id": "US3",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 15,
          "datesEffectives": {
            "from": "2024-07-02T22:00:00.000Z",
            "to": "2024-07-05T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "US 4",
          "description": "DescriptionUser Story 4",
          "id": "US4",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 20,
          "datesEffectives": {
            "from": "2024-07-02T22:00:00.000Z",
            "to": "2024-07-08T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "US 5",
          "description": "DescriptionUser Story 5",
          "id": "US5",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 25,
          "datesEffectives": {
            "from": "2024-07-04T22:00:00.000Z",
            "to": "2024-07-07T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "US 6",
          "description": "DescriptionUser Story 6",
          "id": "US6",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 30,
          "datesEffectives": {
            "from": "2024-07-06T22:00:00.000Z",
            "to": "2024-07-11T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "US 7",
          "description": "DescriptionUser Story 7",
          "id": "US7",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 35,
          "datesEffectives": {
            "from": "2024-07-09T22:00:00.000Z",
            "to": "2024-07-13T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "US 8",
          "description": "DescriptionUser Story 8",
          "id": "US8",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 25,
          "datesEffectives": {
            "from": "2024-07-12T22:00:00.000Z",
            "to": "2024-07-17T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "US 9",
          "description": "DescriptionUser Story 9",
          "id": "US9",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 35,
          "datesEffectives": {
            "from": "2024-07-10T22:00:00.000Z",
            "to": "2024-07-14T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "US 10",
          "description": "DescriptionUser Story 10",
          "id": "US10",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 15,
          "datesEffectives": {
            "from": "2024-07-12T22:00:00.000Z",
            "to": "2024-07-16T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "US 11",
          "description": "DescriptionUser Story 11",
          "id": "US11",
          "priorite": "Mineure",
          "statut": "Terminée",
          "version": "",
          "estimation": 30,
          "datesEffectives": {
            "from": "2024-07-18T22:00:00.000Z",
            "to": "2024-07-22T22:00:00.000Z"
          },
          "children": [],
          "commentaires": "",
          "type": "US"
        },
        {
          "nom": "Ensemble 13",
          "description": "DescriptionEnsemble 13",
          "children": [
            {
              "nom": "US 14",
              "description": "DescriptionUser Story 14",
              "id": "US14",
              "priorite": "Majeure",
              "statut": "Terminée",
              "version": "",
              "estimation": 15,
              "datesEffectives": {
                "from": "2024-07-20T22:00:00.000Z",
                "to": "2024-07-23T22:00:00.000Z"
              },
              "children": [],
              "commentaires": "",
              "type": "US"
            },
            {
              "nom": "Ensemble 15",
              "description": "DescriptionEnsemble 15",
              "children": [
                {
                  "nom": "US 16",
                  "description": "DescriptionUser Story 16",
                  "id": "US16",
                  "priorite": "Mineure",
                  "statut": "Terminée",
                  "version": "",
                  "estimation": 30,
                  "datesEffectives": {
                    "from": "2024-07-21T22:00:00.000Z",
                    "to": "2024-07-26T22:00:00.000Z"
                  },
                  "children": [],
                  "commentaires": "",
                  "type": "US"
                }
              ],
              "id": "Ensemble15",
              "commentaires": "",
              "type": "Ensemble"
            },
            {
              "nom": "US 17",
              "description": "DescriptionUser Story 17",
              "id": "US17",
              "priorite": "Mineure",
              "statut": "Terminée",
              "version": "",
              "estimation": 15,
              "datesEffectives": {
                "from": "2024-07-26T22:00:00.000Z",
                "to": "2024-07-29T22:00:00.000Z"
              },
              "children": [],
              "commentaires": "",
              "type": "US"
            }
          ],
          "id": "Ensemble13",
          "commentaires": "",
          "type": "Ensemble"
        }
      ],
      "commentaires": "",
      "type": "Sprint"
    }
  ],
  "commentaires": "",
  "type": "Sprint",
  childNb: 18,
} as Projet

export const useTreeStore = create<TreeState>((set, get) => ({
  project: mockProjet,
  selectedItem: undefined,
  expandedItems: [],
  currentRoute: "",
  setProject: (newProject) => set({ project: newProject }),
  setCurrentRoute: (newRoute: string) => set({ currentRoute: newRoute }),
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
  setExpandedItems: (newExpandedItems) => set({ expandedItems: newExpandedItems }),
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
    if (updatedProperties.statut == nativeStateEnum.A_Faire) {
      updatedProperties.datesEffectives.from = ""
      updatedProperties.datesEffectives.to = ""
    } else if (updatedProperties.statut == nativeStateEnum.En_Cours) {
      if (updatedProperties.datesEffectives.from == undefined) {
        updatedProperties.datesEffectives.from = format(new Date(), "EEE LLL dd y")
      }
      updatedProperties.datesEffectives.to = ""
    } else if (updatedProperties.statut == nativeStateEnum.Terminee && updatedProperties.datesEffectives.to == undefined) {
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
          var updatedDate = item.datesEffectives;
          if (updatedState == nativeStateEnum.A_Faire) {
            updatedDate.from = ""
            updatedDate.to = ""
          } else if (updatedState == nativeStateEnum.En_Cours) {
            updatedDate.from = format(new Date(), "EEE LLL dd y")
            updatedDate.to = ""
          } else if (updatedState == nativeStateEnum.Terminee) {
            if (updatedDate.from == "") {
              updatedDate.from = format(new Date(), "EEE LLL dd y")
            }
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
      id: nativeItemTypeEnum.US + nextUSNb,
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
      id: nativeItemTypeEnum.Ensemble + nextUSNb,
      commentaires: "",
      type: nativeItemTypeEnum.Ensemble
    }
  },
  getNewSprint: (statut = "") => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.Sprint + " " + nextUSNb,
      description: "Description" + nativeItemTypeEnum.Sprint + " " + nextUSNb,
      id: nativeItemTypeEnum.Sprint + nextUSNb,
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
  getItemChildrenStats: (item: Item): Ensemble_Data => {
    var { totalPoints, donePoints, stateStats, priorityStats } = { totalPoints: 0, donePoints: 0, stateStats: { [nativeStateEnum.Terminee]: 0, [nativeStateEnum.En_Cours]: 0, [nativeStateEnum.A_Faire]: 0 }, priorityStats: { [nativePriorityEnum.Mineure]: 0, [nativePriorityEnum.Majeure]: 0, [nativePriorityEnum.Critique]: 0 } };
    return get().getItemChildrenStatsAux(item.children, { totalPoints, donePoints, stateStats, priorityStats });
  },
  getItemChildrenStatsAux: (itemList: Item[], acc: Ensemble_Data): Ensemble_Data => {
    itemList?.forEach(item => {
      if (item.type == nativeItemTypeEnum.US) {
        acc.totalPoints += (item as US).estimation;
        acc.stateStats[(item as US).statut]++;
        if ((item as US).statut == nativeStateEnum.Terminee) {
          acc.donePoints += (item as US).estimation;
        }
        acc.priorityStats[(item as US).priorite]++;
      } else if (item.type == nativeItemTypeEnum.Ensemble && item.children && item.children.length > 0) {
        acc = get().getItemChildrenStatsAux(item.children, acc);
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
    var childrenStats = get().getItemChildrenStats(item as Sprint);
    if (item.type == nativeItemTypeEnum.Sprint) {
      var chartData = get().getTimeData(item as Sprint);
      chartData = get().getPointData(chartData, item);
      var chart = get().getBurnUpAndDown(chartData, childrenStats.totalPoints);
      return {
        burn: chart, donePoints: childrenStats.donePoints, priorityStats: childrenStats.priorityStats,
        totalPoints: childrenStats.totalPoints, stateStats: childrenStats.stateStats
      };
    }
    return {
      donePoints: childrenStats.donePoints, priorityStats: childrenStats.priorityStats,
      totalPoints: childrenStats.totalPoints, stateStats: childrenStats.stateStats
    }
  },
  getAllSprintsStats: (project: Projet) => {
    const sprintDataList: { sprintName: string, sprintData: Sprint_Data }[] = [];
    var sprintData: Sprint_Data;
    project.children.forEach(item => {
      if (item.type != nativeItemTypeEnum.Sprint) {
        return;
      }
      sprintData = get().getItemData(item) as Sprint_Data;
      sprintDataList.push({ sprintName: item.nom, sprintData: sprintData })
    });
    return sprintDataList;
  }
}));

