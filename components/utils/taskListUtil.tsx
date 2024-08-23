import { Sprint, Task } from "@/app/model/projet";
import { assignTask, getSprint } from "@/components/utils/api";
import { getSprintToast, getTaskToast } from "@/components/utils/toasts";

export function sortTaskList(taskList: Task[]) {
    return taskList?.sort((a, b) => (a.state < b.state) ? -1 : (a.state > b.state) ? 1 : 0) || []
  }

export async function fetchSprint (projectId: string, sprintId: string) {
    var response = await getSprint(projectId, sprintId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getTaskToast(false);
      return;
    }
    var sprint = await response.json().then((updatedSprint: Sprint) => {
      return updatedSprint
    });
    return sprint;
  };

  export async function assignTaskUtil(projectId: string, sprintId: string, taskId: string, userId: string, setSelectedSprint: Function) {
    var response = await assignTask(taskId, userId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getTaskToast(false);
      return;
    }
    var sprint = await fetchSprint(projectId, sprintId);
    if (sprint == undefined) {
      getSprintToast(false);
      return;
    }
    setSelectedSprint(sprint);
  }

  export function setLists(updatedSprint: Sprint, userId: string, setUserTaskList: Function, setUnassignedTaskList: Function, setOthersTaskList: Function) {
    var userTasks: Task[] = [];
      var othersTasks: Task[] = [];
      var unassignedTasks: Task[] = [];
      updatedSprint.tasks.forEach((task: Task) => {
        if (task.estimUser == null) {
          unassignedTasks.push(task);
        } else if (task.estimUser.id == userId) {
          userTasks.push(task);
        } else {
          othersTasks.push(task);
        }
      });
      
      setUserTaskList(sortTaskList(userTasks));
      setOthersTaskList(sortTaskList(othersTasks));
      setUnassignedTaskList(sortTaskList(unassignedTasks));
  }
