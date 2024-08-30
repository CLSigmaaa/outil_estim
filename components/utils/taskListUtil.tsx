import { Sprint, Tag, Task } from "@/app/model/projet";
import { assignTagsToTask, assignTask, getSprint, getSprintFilterUser } from "@/components/utils/api";
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
      getSprintToast(false);
      return;
    }
    var sprint = await response.json().then((updatedSprint: Sprint) => {
      return updatedSprint
    });
    return sprint;
  };

  export async function fetchSprintFilterUser (projectId: string, sprintId: string, userId: string) {
    var response = await getSprintFilterUser(projectId, sprintId, userId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getSprintToast(false);
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

  export async function addTagsToTask(selectedTags: Tag[], taskId: string) {
    var response = await assignTagsToTask(selectedTags, taskId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getTaskToast(false);
      return;
    }
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
