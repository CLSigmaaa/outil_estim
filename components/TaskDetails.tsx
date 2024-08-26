import { Task } from "@/app/model/projet";
import { nativePriorityEnum, nativeStateEnum } from "@/app/model/projet/itemEnum";
import BurnUp from "@/components/burn-down/burn-up";
import { Button } from "@/components/ui/button";
import { DeleteItemButton } from "@/components/ui/delete-button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { deleteEstimation, getTask } from "@/components/utils/api";
import { deleteEstimationToast, getEstimationToast, getTaskToast } from "@/components/utils/toasts";
import { useProjectStore } from "@/store/useProjectStore";
import { format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TaskDetails({projectId, sprintId, taskId}: {projectId: string, sprintId: string, taskId: string}) {
  const { t } = useTranslation();
  const {selectedTask, setSelectedTask} = useProjectStore();
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
      setSelectedTask(task);
    });
  };

  function handleDelete(sprintId: string, taskId: string, estimationId: string) {
    deleteEstimation(projectId, sprintId, taskId, estimationId).then(() => {
      fetchTask(taskId);
    });
  }

  if (selectedTask === undefined || selectedTask === {} as Task) {
    return <div>{t("global.chargement")}</div>;
  }

  return (
    <div className="flex w-full gap-2">
    <div className="flex flex-col w-1/2 p-4 gap-2 border rounded bg-white">
      <p className="text-2xl font-semibold self-center">{t("actions.details")}</p>
      <div className="flex gap-1"><p className="font-semibold">{t("global.nom")}:</p> {selectedTask.name}</div>
      <div className="flex gap-1">
        <p className="font-semibold">{t("global.description")}:</p> 
        <p className="overflow-auto max-h-40">{selectedTask.description}</p>
      </div>
      <div className="flex gap-1"><p className="font-semibold">{t("global.priorite")}:</p> {selectedTask.priority}</div>
      <div className="flex gap-1"><p className="font-semibold">{t("global.statut")}:</p> {selectedTask.state}</div>
      <div className="flex gap-1"><p className="font-semibold">{t("global.responsable")}:</p> {selectedTask.estimUser?.firstName +" "+ selectedTask.estimUser?.lastName  || t("global.aucunReponsable")}</div>
      {selectedTask.estimationList.length != 0 ? (
        <Tabs
          defaultValue={""}
          className="border rounded-xl "
        >
          <TabsList className="flex flex-grow mb-2">
            {selectedTask.estimationList.map((estim, index) => (
              <TabsTrigger className="flex flex-grow" key={estim.id} value={estim.id}>{index}</TabsTrigger>
            ))}
          </TabsList>
          {selectedTask.estimationList.map((estim) => (
            <TabsContent key={estim.id} value={estim.id} className="">
              <div className="flex flex-col gap-2 mt-0 p-2">
              <div className="flex gap-1"><p className="font-semibold">{t("global.date")}:</p> {format(estim.date, 'dd-MM-yyyy')}</div>
              <div className="flex gap-1"><p className="font-semibold">{t("estimation.consomme")}:</p> {estim.consommee}</div>
              <div className="flex gap-1"><p className="font-semibold">{t("estimation.resteAFaire")}:</p> {estim.resteAFaire}</div>
              <div className="flex gap-1"><p className="font-semibold">{t("estimation.causeEcart")}:</p> {estim.causeEcart || <p className="text-green-600">Pas d'écart</p>} </div>
              </div>
              <Separator className="mt-4"/>
            <div className="flex justify-center items-center p-3"><DeleteItemButton text={"Supprimer estimation"} handleClick={() => handleDelete(sprintId, taskId, estim.id)}/></div>
            </TabsContent>
            
          ))}
        </Tabs>
      ) : (
        <p>{t("estimation.aucune")}</p>
      )}
    </div>
    {selectedTask.estimationList.length != 0 ? <BurnUp task={selectedTask}/> 
    : <div className="flex flex-grow justify-center items-center">{t("estimation.aucune")}</div>}
    </div>
  );
}

