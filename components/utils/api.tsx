import { Task, Sprint, TaskData, SprintData, Tag } from "@/app/model/projet";
import { toast } from "@/components/ui/use-toast";

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

  export async function assignTask(taskId: string, userId: string) {
    return fetch(`http://localhost:8080/users/${userId}/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskId),
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function unassignTask(taskId: string, userId: string) {
    return fetch(`http://localhost:8080/users/${userId}/assign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskId),
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

  export async function getCausesEcart(tagId: string) {
    return fetch(`http://localhost:8080/causesEcarts/${tagId}`, {
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

  export async function getSprintFilterTaskName(projectId: string, sprintId: string, filter: string) {
    return fetch(`http://localhost:8080/projects/${projectId}/sprints/${sprintId}/filterName?filterName=${filter}`, {
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
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function getSprintFilterUser(projectId: string, sprintId: string, userId: string) {
    return fetch(`http://localhost:8080/projects/${projectId}/sprints/${sprintId}/filterUser?userId=${userId}`, {
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
      }).catch((error) => {
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

  export async function getProjects () {
    return fetch(`http://localhost:8080/projects`, {
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

  export async function postProject(project: any) {
    return fetch(`http://localhost:8080/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function updateProject(projectId: string, project: any) {
    return fetch(`http://localhost:8080/projects/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function deleteProject(projectId: string) {
    return fetch(`http://localhost:8080/projects/${projectId}`, {
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

  export async function getTagList() {
    return fetch(`http://localhost:8080/tags`, {
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

  export async function postTag(tagName: string) {
    const data = new URLSearchParams();
    data.append("tagName", tagName);
    return fetch(`http://localhost:8080/tags`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }

  export async function deleteTag(tagId: string) {
    return fetch(`http://localhost:8080/tags/${tagId}`, {
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


  export async function assignTagsToTask(tags: Tag[], taskId: string) {
    return fetch(`http://localhost:8080/tags/assignTags/${taskId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tags),
      }).catch((error) => {
        toast({
          variant: "destructive",
          title: "Erreur !",
          description: "Erreur lors de l'appel à l'API.",
        });
      });
  }