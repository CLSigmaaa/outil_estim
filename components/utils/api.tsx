import { Task, Sprint, TaskData, SprintData } from "@/app/model/projet";
import { toast } from "@/components/ui/use-toast";
import { error } from "console";

export async function postTask(projectId: string, sprintId: string, task: TaskData){
    return fetch(`http://localhost:8080/projects/${projectId}/sprints/${sprintId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
}

export async function getTask (projectId: string, sprintId: string, taskId: string) {
      return fetch(`http://localhost:8080/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });

  }
  export async function deleteTask(projectId: string, sprintId: string, taskId: string) {
    return fetch(`http://localhost:8080/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function updateTask(projectId: string, sprintId: string, taskId: string, task: TaskData) {
    return fetch(`http://localhost:8080/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });

  }

  export async function postEstimation(projectId: string, sprintId: string, taskId: string, estimation: any)  {
    return fetch(
      `http://localhost:8080/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}/estimations?` +
        new URLSearchParams({
          taskId: taskId,
        }).toString(),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(estimation),
      }
    ).catch((error) => {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: "Erreur lors de l'appel à l'API.",
      });
    }); 
  }

  export async function deleteEstimation(projectId: string, sprintId: string, taskId: string, estimationId: string) {
    return fetch(
      `http://localhost:8080/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}/estimations/${estimationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).catch((error) => {
      toast({
        variant: "destructive",
        title: "Erreur !",
        description: "Erreur lors de l'appel à l'API.",
      });
    });
  }

  export async function getSprint (projectId: string, sprintId: string) {
     return fetch(`http://localhost:8080/projects/${projectId}/sprints/${sprintId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (!response.ok) {
          toast({
            variant: "destructive",
            title: "Erreur !",
            description: response.headers.get("error"),
          });
          return;
        }
        return response;
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function postSprint(projectId: string, sprint: SprintData) {
    return fetch(`http://localhost:8080/projects/${projectId}/sprints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sprint),
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function updateSprint(projectId: string, sprintId: string, sprint: SprintData) {
    return fetch(`http://localhost:8080/projects/${projectId}/sprints/${sprintId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sprint),
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function deleteSprint(projectId: string, sprintId: string) {
    return fetch(`http://localhost:8080/projects/${projectId}/sprints/${sprintId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function getProject (projectId: string) {
    return fetch(`http://localhost:8080/projects/${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }