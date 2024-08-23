"use client"
import i18n from "@/app/i18n";
import TaskDetails from "@/components/TaskDetails";
import { getTask } from "@/components/utils/api";
import { useProjectStore } from "@/store/useProjectStore";
import { useParams } from "next/navigation";
import React from "react";
import { I18nextProvider } from "react-i18next";

export default function Sprint() {
  const params = useParams();
  const { projectId, sprintId, taskId} = params as {projectId: string, sprintId: string, taskId: string}; // Pas de catchAll segment n'est utilisé, le paramètre est toujours un string

  const {setSelectedTask} = useProjectStore();
  
  async function init() {
  getTask(projectId, sprintId, taskId).then((response) => {
    if (!response?.ok) {
      return;
    }
    response.json().then((task) => {
      task.estimationList = task.estimationList.map((estim: any) => {
        return {
          ...estim,
          date: new Date(estim.date),
        };
      });
      setSelectedTask(task);
    });
  });
}
React.useEffect(() => {
  init();
}
, []);

  return (
    <>
    <I18nextProvider i18n={i18n}>
    {projectId == null || sprintId == null || taskId == null ? <p>loading...</p> :
    <TaskDetails projectId={projectId} sprintId={sprintId} taskId={taskId}/>
  }
  </I18nextProvider>
  </>
  );
}