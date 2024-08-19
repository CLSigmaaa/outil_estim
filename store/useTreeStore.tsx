import { create } from 'zustand';
import { Projet, Sprint, Task, Sprint_Data } from "@/app/model/projet/index";
import { nativeItemTypeEnum, nativePriorityEnum, nativeStateEnum } from '@/app/model/projet/itemEnum';
import { differenceInDays, addDays, format } from "date-fns"

export type Item = Task | Sprint ;

export interface TreeState {
  project: Projet;
  selectedItem: undefined | Item;
  expandedItems: string[];
  currentRoute: string;
  setProject: (newProject: Projet) => void;
  setCurrentRoute: (newRoute: string) => void;
  setSelectedItem: (newSelectedItem: any) => void;
  setExpandedItems: (newExpandedItems: string[]) => void;
  toggleExpandedItem: (itemId: any) => void;
  findItemInProject: (itemId: string) => Item | undefined;
  addItem: (parentId: string, newItem: Item) => void;
  deleteItem: (itemId: string) => void;
  editItem: (itemId: string, updatedProperties: Item) => void;
  editItemState: (itemId: string, updatedState: string) => void;
  getNewUS: (statut?: nativeStateEnum) => Task;
  getNewSprint: (statut?: string) => Sprint;
  getTimeData: (sprint: Sprint) => any;
  getPointData: (chartData: any, item: Sprint ) => any;
  getItemChildrenStats: (sprint: Item) => Ensemble_Data;
  getItemChildrenStatsAux: (itemList: Item[], acc: Ensemble_Data) => Ensemble_Data;
  getBurnUpAndDown: (data: any, totalPoints: number) => any;
  getItemData: (item: Item) => Sprint_Data | Ensemble_Data;
  getAllSprintsStats: (project: Projet) => { sprintName: string, sprintData: Sprint_Data }[]
}


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

    return findItemAux(get().project.sprints, itemId);
  },
  setSelectedItem: (newSelectedItem) => set({ selectedItem: newSelectedItem }),
  setExpandedItems: (newExpandedItems) => set({ expandedItems: newExpandedItems }),
  toggleExpandedItem: (itemId: any) => set((state) => {
    const isExpanded = state.expandedItems.includes(itemId);

    // if (isExpanded && state.selectedItem.id !== itemId) {
    //   return { expandedItems: state.expandedItems };
    // }

    return {
      expandedItems: isExpanded
        ? state.expandedItems.filter(id => id !== itemId)
        : [...state.expandedItems, itemId],
    };
  }),
  addItem: (parentId, newItem) => set((state) => {
    const findAndAddItem = (items: Item[], parentId: string, newItem: Item): Item[] => {
      return items.map(item => {
        if (item.id === parentId) {
          state.setSelectedItem({ ...item, children: [...item.children, newItem] })
          return { ...item, tasks: [...item.children, newItem] } as Item;
        } else if (item.children?.length > 0) { // Les taches ne possèdent pas d'enfant
          return { ...item, tasks: findAndAddItem(item.children, parentId, newItem) } as Item;
        }
        return item;
      });
    };
    return {
      project: {
        ...state.project,
        sprints: parentId ? findAndAddItem(state.project.sprints, parentId, newItem) : [...state.project.sprints, newItem],
        childNb: state.project.childNb + 1,
      }
    };
  }),
  deleteItem: (itemId) => set((state) => {
    const findAndDeleteItem = (items: Item[], itemId: string): Item[] => {
      return items?.filter(item => item.id !== itemId)
        .map(item => ({
          ...item,
          tasks: findAndDeleteItem(item.children, itemId)
        } as Item));
    };

    return {
      project: {
        ...state.project,
        sprints: findAndDeleteItem(state.project.sprints, itemId),
      },
    };
  }),
  editItem: (itemId, updatedProperties: any) => set((state) => {
    const findAndEditItem = (items: Item[], itemId: string): Item[] => {
      return items.map(item => {
        if (item.id === itemId) {
          return { ...item, ...updatedProperties };
        } else if (item.children?.length > 0) {
          return { ...item, tasks: findAndEditItem(item.children, itemId) } as Item;
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
        sprints: findAndEditItem(state.project.sprints, itemId),
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
          return { ...item, tasks: findAndEditItemState(item, itemId) } as Item;
        }
        return item;
      });
    };

    return {
      project: {
        ...state.project,
        sprints: findAndEditItemState(state.project, itemId),
      }
    };
  }),
  getNewUS: (statut = nativeStateEnum.A_Faire) => {
    var nextUSNb = get().project.childNb + 1;
    return {
      nom: nativeItemTypeEnum.Task + " " + nextUSNb,
      description: "Description" + nativeItemTypeEnum.Task + " " + nextUSNb,
      id: nativeItemTypeEnum.Task + nextUSNb,
      priorite: nativePriorityEnum.Mineure,
      statut: statut,
      version: "",
      estimation_initiale: 0,
      datesEffectives: statut == nativeStateEnum.Terminee ? { from: new Date(), to: new Date() } : nativeStateEnum.En_Cours ? { from: new Date(), to: "" } :{ from: "", to: "" },
      children: [],
      commentaires: "",
      type: nativeItemTypeEnum.Task,
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
    var startDate = new Date();
    return {
      nom: nativeItemTypeEnum.Sprint + " " + nextUSNb,
      description: "Description" + nativeItemTypeEnum.Sprint + " " + nextUSNb,
      id: nativeItemTypeEnum.Sprint + nextUSNb,
      statut: statut ? statut : nativeStateEnum.A_Faire,
      datesEffectives: { from: startDate, to: addDays(startDate, 30) },
      tasks: [],
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
    item.tasks?.forEach(child => {
      if (child.type == nativeItemTypeEnum.Task && (child as Task).statut == nativeStateEnum.Terminee) {
        chartData[format((child as Task).datesEffectives.to, "MMM-dd")] += (child as Task).estimation_initiale;
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
      if (item.type == nativeItemTypeEnum.Task) {
        acc.totalPoints += (item as Task).estimation_initiale;
        acc.stateStats[(item as Task).statut]++;
        if ((item as Task).statut == nativeStateEnum.Terminee) {
          acc.donePoints += (item as Task).estimation_initiale;
        }
        acc.priorityStats[(item as Task).priorite]++;
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
    project.sprints.forEach(item => {
      if (item.type != nativeItemTypeEnum.Sprint) {
        return;
      }
      sprintData = get().getItemData(item) as Sprint_Data;
      sprintDataList.push({ sprintName: item.nom, sprintData: sprintData })
    });
    return sprintDataList;
  }
}));

