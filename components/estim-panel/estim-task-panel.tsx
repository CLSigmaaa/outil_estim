import { Sprint, Task } from "@/app/model/projet";
import { nativeStateEnum } from "@/app/model/projet/itemEnum";
import { EstimInfo, EstimAssignedColumns } from "@/components/estim-panel/estim-assigned-columns";
import { DataTable } from "@/components/ui/data-table";
import { postEstimation, getSprint } from "@/components/utils/api";
import { fetchSprint, sortTaskList, assignTaskUtil, setLists } from "@/components/utils/taskListUtil";
import { postEstimationToast, getTaskToast, getSprintToast } from "@/components/utils/toasts";
import { useProjectStore } from "@/store/useProjectStore";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@radix-ui/react-collapsible";
import { ChevronsUpDown } from "lucide-react";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";


export default function EstimPanel({projectId, sprintId}: {projectId: string, sprintId: string}) {
  const {t} = useTranslation();

  const {selectedSprint, setSelectedSprint} = useProjectStore();
  const [doneTaskList, setDoneTaskList] = React.useState<Task[]>([]);
  const [inProgressTaskList, setInProgressTaskList] = React.useState<Task[]>([]);
  const [toDoTaskList, setToDoTaskList] = React.useState<Task[]>(
    []
  );
  const userId = "1";

  React.useEffect(() => {
    refreshLists();
    
  }, [selectedSprint]);

  async function updateSprintInfos() {
    var sprint = await fetchSprint(projectId, sprintId);
    if (sprint == undefined) {
      getSprintToast(false);
      return;
    }
    setSelectedSprint(sprint);
  }


  function refreshLists() {
    if (selectedSprint == undefined) {
      return;
    }
    var doneTasks: Task[] = [];
    var inProgressTasks: Task[] = [];
    var toDoTasks: Task[] = [];
    selectedSprint.tasks.filter(task => task.estimUser?.id == userId).forEach((task: Task) => {
      switch (task.state) {
        case nativeStateEnum.TERMINEE:
          doneTasks.push(task);
          break;
        case nativeStateEnum.EN_COURS:
          inProgressTasks.push(task);
          break;
        case nativeStateEnum.A_FAIRE:
          toDoTasks.push(task);
          break;
        default:
          alert("Etat de tâche inconnu!" + task.state)
          break;
      }
    });
    
    setDoneTaskList(sortTaskList(doneTasks));
    setInProgressTaskList(sortTaskList(inProgressTasks));
    setToDoTaskList(sortTaskList(toDoTasks));
  }

  const submitEstimation = async (
    form: UseFormReturn<
      { consommee: number; resteAFaire: number; causeEcart: string },
      any,
      undefined
    >,
    taskId: string
  ) => {
    var formValues = form.getValues();
    var newEstim = {
      date: new Date().toISOString(),
      consommee: formValues.consommee,
      resteAFaire: formValues.resteAFaire,
      causeEcart: formValues.causeEcart,
    };
    console.log(newEstim);

    var response = await postEstimation(projectId, sprintId, taskId, newEstim);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      postEstimationToast(false);
      return;
    }
    response.json().then(async (newTask) => {
      if (newTask == null) {
        postEstimationToast(false);
        return;
      }
      updateSprintInfos();
      postEstimationToast(true);
    });
  };

  function formatTaskList(taskList: Task[]): EstimInfo[] {
    if (!taskList) {
      return [];
    }
    return taskList.map((task) => {
      var lastEstimation = task.estimationList[task.estimationList.length - 1];
      return {
        nomTache: task.name,
        estimationInitiale: task.estimationList[0]?.resteAFaire || 0,
        consommee: lastEstimation?.consommee || 0,
        resteAFaire: lastEstimation?.resteAFaire || 0,
        newConsommee: 0,
        newResteAFaire: 0,
        causeEcart: "",
        id: task.id,
      } as EstimInfo;
    });
  }
  return (
    <div className="flex flex-col">
     <p className="text-xl font-semibold">{selectedSprint ? selectedSprint.name : t("global.chargement")} </p>
     <div className="py-5">
      <p className="text-lg font-medium"> {t("tache.mesTaches")} </p>
      <Collapsible defaultOpen={true} className="flex flex-grow flex-col">
        <CollapsibleTrigger className="flex flex-grow justify-center gap-2 border border-black rounded bg-white p-2 mb-2">
          <div className="flex gap-1 font-semibold"> {t("tache.taches")} <p className="text-red-600">{t("tache.enCours")}</p></div>
          <ChevronsUpDown />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <DataTable
            data={formatTaskList(inProgressTaskList)}
            columns={EstimAssignedColumns(submitEstimation, t)}
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible className="flex flex-grow flex-col">
        <CollapsibleTrigger className="flex flex-grow justify-center gap-2 border border-black rounded bg-white p-2 mb-2">
          <p className="font-semibold"> {t("tache.taches")} {t("tache.aFaire")}</p>
          <ChevronsUpDown />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <DataTable
            data={formatTaskList(toDoTaskList)}
            columns={EstimAssignedColumns(submitEstimation, t)}
          />
        </CollapsibleContent>
      </Collapsible>

      
      <Collapsible className="flex flex-grow flex-col">
        <CollapsibleTrigger className="flex flex-grow justify-center gap-2 border border-black rounded bg-white p-2 mb-2">
        <div className="flex gap-1 font-semibold"> {t("tache.taches")} <p className="text-green-600"> {t("tache.terminees")} </p></div>
          <ChevronsUpDown />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <DataTable
            data={formatTaskList(doneTaskList)}
            columns={EstimAssignedColumns(submitEstimation, t)}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
    </div>
  )
}
