import { Tag, Task } from "@/app/model/projet";
import BurnUp from "@/components/burn-down/burn-up";
import { DeleteItemButton } from "@/components/ui/delete-button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { deleteEstimation, getCausesEcart, getTask } from "@/components/utils/api";
import { getTaskToast } from "@/components/utils/toasts";
import { useProjectStore } from "@/store/useProjectStore";
import { format } from "date-fns";
import React from "react";
import { useTranslation } from "react-i18next";

export default function TaskDetails({projectId, sprintId, taskId}: {projectId: string, sprintId: string, taskId: string}) {
  const { t } = useTranslation();
  const {selectedTask, setSelectedTask} = useProjectStore();
  const [selectedTag, setSelectedTag] = React.useState<Tag>();
  const [listeEcart, setListeEcart] = React.useState<string[]>([]);

  async function updateCausesEcart(tag: Tag){
    setSelectedTag(tag);
    var response = await getCausesEcart(tag.id);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      return;
    }
    response.json().then((ecarts: string[]) => {
      setListeEcart(ecarts);
    })
  }

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
    <div className="flex flex-col p-4 gap-2 border rounded bg-white">
      <p className="text-2xl font-semibold self-center">{t("actions.details")}</p>
      <div className="flex gap-1"><p className="font-semibold">{t("global.nom")}:</p> {selectedTask.name}</div>
      <div className="flex gap-1">
        <p className="font-semibold">{t("global.description")}:</p> 
        <p className="overflow-auto max-h-40">{selectedTask.description}</p>
      </div>
      <div className="flex gap-1"><p className="font-semibold">{t("global.priorite")}:</p> {selectedTask.priority}</div>
      <div className="flex gap-1"><p className="font-semibold">{t("global.statut")}:</p> {selectedTask.state}</div>
      <div className="flex gap-1"><p className="font-semibold">{t("global.responsable")}:</p> {selectedTask.estimUser ? (selectedTask.estimUser.firstName +" "+ selectedTask.estimUser.lastName) : t("global.aucunResponsable")}</div>
      <div className="flex gap-2"><p className="font-semibold">{t("tache.tags")}:
        </p> {selectedTask.tags.length != 0 ? selectedTask.tags.map((tag) => 
        <button onClick={() => updateCausesEcart(tag)} className="border border-black rounded px-1"> {tag.name}</button>) 
        : t("tache.aucunTag")}
        </div>
        <p className="text-center text-xl font-semibold"> Historique des estimations</p>
      {selectedTask.estimationList.length != 0 ? (
        <Tabs
          defaultValue={""}
          className="border rounded-xl "
        >
          <TabsList className="flex flex-grow mb-2">
            {selectedTask.estimationList.map((estim, index) => (
              
              <TabsTrigger className="flex w-full" key={estim.id} value={estim.id}>
                {index + 1}
              </TabsTrigger>
              
            ))}
          </TabsList>
          {selectedTask.estimationList.map((estim) => (
            <TabsContent key={estim.id} value={estim.id} className="">
              <div className="flex flex-col gap-2 mt-0 p-2">
              <div className="flex gap-1"><p className="font-semibold">{t("global.date")}:</p> {format(estim.date, 'dd-MM-yyyy')}</div>
              <div className="flex gap-1"><p className="font-semibold">{t("estimation.consomme")}:</p> {estim.consomme}</div>
              <div className="flex gap-1"><p className="font-semibold">{t("estimation.resteAFaire")}:</p> {estim.resteAFaire}</div>
              <div className="flex gap-1"><p className="font-semibold">{t("estimation.causeEcart")}:</p> {estim.causeEcart || <p className="text-green-600">Pas d'écart</p>} </div>
              <div className="flex gap-1"><p className="font-semibold">{t("estimation.isEcartExceptionnel")}:</p> {estim.isEcartExceptionnel ? t("global.oui") : t("global.non")}</div>
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
    <div className="p-4 bg-white border rounded">
      <p className="text-2xl font-semibold w-max"> Raison écart tâches : {selectedTag?.name}</p>
      <div className="flex flex-col w-max gap-2">
        {listeEcart.length != 0 ? listeEcart.map((ecart) => <div className=" border p-1 rounded"> {ecart.split('/').map((txt) => <div className="w-max flex gap-1">{txt.replace('Task', 'Tâche').split(':').map((txt, index) => <p className={index == 0 ? "font-semibold": ""}>{txt}{index == 0 ? ": " : ""}</p>)}</div>)} </div>) : <p> {t("estimation.aucune")} </p>}
        </div>
    </div>
    {selectedTask.estimationList.length != 0 ? <BurnUp task={selectedTask}/> 
    : <div className="flex flex-grow justify-center items-center">{t("estimation.aucune")}</div>}
    </div>
  );
}

