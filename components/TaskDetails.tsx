import { Task } from "@/app/model/projet";
import BurnUp from "@/components/burn-down/burn-up";
import { Button } from "@/components/ui/button";
import { DeleteItemButton } from "@/components/ui/delete-button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { deleteEstimation, getTask } from "@/components/utils/api";
import { deleteEstimationToast, getTaskToast } from "@/components/utils/toasts";
import React from "react";

export default function TaskDetails({projectId, sprintId, taskId}: {projectId: string, sprintId: string, taskId: string}) {
  const [displayedTask, setDisplayedTask] = React.useState<Task | undefined>(undefined);
  React.useEffect( () => {
    fetchTask(taskId);
  }, []);

  const fetchTask = async (taskId: string) => {
    var response = await getTask(projectId, sprintId, taskId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getTaskToast(false);
      return;
    }
    response.json().then((task) => {
      task.estimationList = task.estimationList.map((estim: any) => {
        return {
          ...estim,
          date: new Date(estim.date),
        };
      });
      setDisplayedTask(task);
      deleteEstimationToast(true);
    });
  };

  function handleDelete(sprintId: string, taskId: string, estimationId: string) {
    deleteEstimation(projectId, sprintId, taskId, estimationId).then(() => {
      fetchTask(taskId);
    });
  }

  if (displayedTask === undefined || displayedTask === {} as Task) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex w-full">
    <div className="flex flex-col justify-center w-1/2 items-center">
      <p className="text-2xl font-semibold">TaskDetails</p>
      <p>Nom: {displayedTask?.name}</p>
      <p>Description: {displayedTask?.description}</p>
      <p>Priorité: {displayedTask?.priority}</p>
      <p>Statut: {displayedTask?.state}</p>
      {displayedTask.estimationList.length != 0 ? (
        <Tabs
          defaultValue={displayedTask?.estimationList[displayedTask.estimationList.length - 1].id}
          className="w-[400px]"
        >
          <TabsList className="flex w-full justify-between">
            {displayedTask?.estimationList.map((estim, index) => (
              <TabsTrigger key={estim.id} value={estim.id}>{index}</TabsTrigger>
            ))}
          </TabsList>
          {displayedTask?.estimationList.map((estim) => (
            <TabsContent key={estim.id} value={estim.id}>
              <p>Date: {estim.date.toString()}</p>
              <p>Consommée: {estim.consommee}</p>
              <p>Reste à faire: {estim.resteAFaire}</p>
              <p>Cause écart: {estim.causeEcart}</p>
            <DeleteItemButton handleClick={() => handleDelete(sprintId, taskId, estim.id)}/>
            </TabsContent>
            
          ))}
        </Tabs>
      ) : (
        <p>Pas d'estimation</p>
      )}
    </div>
    {displayedTask.estimationList.length != 0 ? <BurnUp task={displayedTask}/> : "Pas d'estimations saisies"}
    </div>
  );
}

