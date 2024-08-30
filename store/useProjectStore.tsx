import { create } from "zustand";
import { Project, Sprint, Task } from "@/app/model/projet/index";

export type Item = Task | Sprint;

export interface ProjectStore {
  selectedProject: undefined | Project;
  selectedSprint: undefined | Sprint;
  selectedTask: undefined | Task;
  taskToEdit: undefined | Task;
  setSelectedProject: (newProject: Project) => void;
  setSelectedSprint: (newSprint: Sprint) => void;
  setSelectedTask: (newTask: Task) => void;
  setTaskToEdit: (newTask: Task) => void;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  selectedProject: undefined,
  selectedSprint: undefined,
  selectedTask: undefined,
  taskToEdit: undefined,
  setSelectedProject: (newProject: Project) => {
    set({ selectedProject: newProject });
  },
  setSelectedSprint: (newSprint: Sprint) => {
    set({ selectedSprint: newSprint });
  },
  setSelectedTask: (newTask: Task) => {
    set({ selectedTask: newTask });
  },
  setTaskToEdit: (newTask: Task) => {
    set({ taskToEdit: newTask });
  },
}));
