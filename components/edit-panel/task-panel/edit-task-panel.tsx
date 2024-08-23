import React from "react";
import { Sprint, Task } from "@/app/model/projet";
import { nativePriorityEnum, nativeStateEnum } from "@/app/model/projet/itemEnum";
import { EditTableColumns } from "@/components/edit-panel/task-panel/edit-task-columns";
import { TaskForm } from "@/components/forms/task-form";
import { DataTable } from "@/components/ui/data-table";
import { deleteTask, unassignTask } from "@/components/utils/api";
import { fetchSprint, setLists, assignTaskUtil } from "@/components/utils/taskListUtil";
import { getSprintToast, deleteTaskToast, getTaskToast } from "@/components/utils/toasts";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronsUpDown } from "lucide-react";
import { useProjectStore } from "@/store/useProjectStore";
import { useTranslation } from "react-i18next";

export default function EditPanel({projectId, sprintId}: {projectId: string, sprintId: string}) {
  const { t } = useTranslation();
  const {selectedSprint, setSelectedSprint} = useProjectStore();
  const [userTaskList, setUserTaskList] = React.useState<Task[]>([]);
  const [othersTaskList, setOthersTaskList] = React.useState<Task[]>([]);
  const [unassignedTaskList, setUnassignedTaskList] = React.useState<Task[]>([]);
  const userId = "1";

  const [displayForm, setDisplayForm] = React.useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = React.useState<Task | undefined>(
    undefined
  );

  // create a sample for taskList
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
    if (sprintId == "current" && selectedSprint.id != undefined) { // Remplace "current" par l'id du sprint actuel
      sprintId = selectedSprint.id;
    }
    setLists(selectedSprint, userId, setUserTaskList, setUnassignedTaskList, setOthersTaskList);
  }

  function formatTaskList(taskList: Task[]) {
    return taskList.map((task) => {
      return {
        ...task,
        name: task.name,
        description: task.description,
        priority: task.priority,
        state: task.state,
      };
    });
  }

  function editTask(task: Task) {
    setTaskToEdit(task);
    setDisplayForm(true);
  }

  async function handleDeleteTask(taskId: string) {
    var response = await deleteTask(projectId, sprintId, taskId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      deleteTaskToast(false);
      return;
    }
    updateSprintInfos();
    deleteTaskToast(true);
  }

  function closeForm() {
    setTaskToEdit(undefined);
    setDisplayForm(false);
  }

  function handleAssignTask(taskId: string) {
    assignTaskUtil(projectId, sprintId, taskId, userId, setSelectedSprint);
    }

  async function handleUnassignTask(taskId: string) {
    var response = await unassignTask(taskId, userId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getTaskToast(false);
      return;
    }
    updateSprintInfos();
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 items-center">

     <p className="text-xl font-semibold"> {selectedSprint ? selectedSprint.name: "Chargement..."} </p>
     </div>
     <div className="py-5">
      {displayForm ? (
        <TaskForm
          taskToEdit={taskToEdit}
          updateSprintInfos={updateSprintInfos}
          closeForm={closeForm}
          projectId={projectId}
          userId={userId}
          sprint={selectedSprint}
        />
      ) : (
        <div>
          <Button className="mb-5" onClick={() => setDisplayForm(true)}>
          {t("tache.ajouterTache")}
          </Button>
          <Collapsible defaultOpen={true} className="flex flex-grow flex-col">
        <CollapsibleTrigger className="flex flex-grow justify-center gap-2 border border-black rounded bg-white p-2 mb-2">
              <p className="font-semibold"> {t("tache.mesTaches")} </p>
              <ChevronsUpDown />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <DataTable
                data={formatTaskList(userTaskList)}
                columns={EditTableColumns(editTask, handleDeleteTask, false, t, undefined, handleUnassignTask)} // On fournit t (i18n) pour resepecter les règles de hooks
              />
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className="flex flex-grow flex-col">
          <CollapsibleTrigger className="flex flex-grow justify-center gap-2 border border-black rounded bg-white p-2 mb-2">
              <p className="font-semibold"> {t("tache.nonAssignees")} </p>
              <ChevronsUpDown />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <DataTable
                data={formatTaskList(unassignedTaskList)}
                columns={EditTableColumns(editTask, handleDeleteTask, false, t, handleAssignTask, undefined)}
              />
            </CollapsibleContent>
          </Collapsible>
          <Collapsible className="flex flex-grow flex-col">
          <CollapsibleTrigger className="flex flex-grow justify-center gap-2 border border-black rounded bg-white p-2 mb-2">
              <p className="font-semibold"> {t("tache.assignees")} </p>
              <ChevronsUpDown />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <DataTable
                data={formatTaskList(othersTaskList)}
                columns={EditTableColumns(editTask, handleDeleteTask, true, t, handleAssignTask, undefined)}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}
    </div>
    </div>
  );
}