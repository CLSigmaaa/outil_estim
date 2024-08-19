import { Sprint, Task } from "@/app/model/projet";
import { DataTable } from "@/components/ui/data-table";
import {
  EstimInfo,
  estimTableColumns,
} from "@/components/estim-panel/estim-task-columns";

import { toast } from "@/components/ui/use-toast";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { getSprint, postEstimation } from "@/components/utils/api";
import { getSprintToast, getTaskToast, postEstimationToast } from "@/components/utils/toasts";

export default function EstimTaskList({ projectId, sprintId }: { projectId: string, sprintId: string }) {
  const [taskList, setTaskList] = React.useState<Task[]>([]);

function setSortedTaskList(taskList: Task[]) {
    setTaskList(taskList?.sort((a, b) => parseFloat(a.id) - parseFloat(b.id) ));
  }


  React.useEffect(() => {
      fetchTaskList();
  }, []);

  const fetchTaskList = async () => {
    var response =  await getSprint(projectId, sprintId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getTaskToast(false)
      return;
    }
    response.json().then((updatedSprint) => {
      debugger;
      setSortedTaskList(updatedSprint.tasks);
    });
  };

  const submitEstimation = async (
    form: UseFormReturn<{ consommee: number; resteAFaire: number; causeEcart: string },any, undefined>,
    rowId: string ) => {
    var formValues = form.getValues();
    var newEstim = {
      date: new Date().toISOString(),
      consommee: formValues.consommee,
      resteAFaire: formValues.resteAFaire,
      causeEcart: formValues.causeEcart,
    };
    var taskId = taskList[parseInt(rowId)].id;

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
      response = await getSprint(projectId, sprintId);
      if (response == undefined) {
        return;
      }
      if (!response.ok) {
        getTaskToast(false);
        return;
      }
      response.json().then((updatedSprint) => {
        setSortedTaskList(updatedSprint.tasks);
      });
     postEstimationToast(true);
    });
  };
  
  const data = formatTaskList();

  function formatTaskList(): EstimInfo[] {
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
        id: task.id
      } as EstimInfo;
    });
  }

  return (
    <div className="py-10">
      <DataTable columns={estimTableColumns(submitEstimation)} data={data} />
    </div>
  );
}
