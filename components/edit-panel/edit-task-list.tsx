import { Sprint, Task } from "@/app/model/projet";

import { DataTable } from "@/components/ui/data-table";
import { editTableColumns } from "@/components/edit-panel/edit-task-columns";

import React from "react";
import { TaskForm } from "@/components/forms/task-form";
import { toast } from "@/components/ui/use-toast";
import { deleteTask, getSprint } from "@/components/utils/api";
import { Button } from "@/components/ui/button";
import {
  nativePriorityEnum,
  nativeStateEnum,
} from "@/app/model/projet/itemEnum";
import { deleteTaskToast, getSprintToast, getTaskToast } from "@/components/utils/toasts";

export default function EditTaskList({ projectId, sprintId }: { projectId: string, sprintId: string }) {
  const [taskList, setTaskList] = React.useState<Task[]>([]);

  const [displayForm, setDisplayForm] = React.useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = React.useState<Task | undefined>(
    undefined
  );

  function setSortedTaskList(taskList: Task[]) {
    setTaskList(taskList?.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)) || []);
  }
  // create a sample for taskList
  React.useEffect(() => {
    fetchTaskList(sprintId);
  }, []);

  const fetchTaskList = async (sprintId: string) => {
    var response = await getSprint(projectId, sprintId);
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
  };

  function formatData(taskList: Task[]) {
    return taskList.map((task) => {
      return {
        ...task,
        name: task.name,
        description: task.description,
        priority: nativePriorityEnum[task.priority],
        state: nativeStateEnum[task.state],
      };
    });
  }

  function editTask(task: Task) {
    setTaskToEdit(task);
    setDisplayForm(true);
  }

  async function handleDelete(taskId: string) {
    var response = await deleteTask(projectId, sprintId, taskId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
     deleteTaskToast(false);
      return;
    }
    fetchTaskList(sprintId);
    deleteTaskToast(true);
  }

  function closeForm() {
    setTaskToEdit(undefined);
    setDisplayForm(false);
  }

  return (
    <div className="py-10">
      {displayForm ? (
        <TaskForm
          taskToEdit={taskToEdit}
          setTaskList={setSortedTaskList}
          closeForm={closeForm}
          projectId={projectId}
          sprintId={sprintId}
        />
      ) : (
        <div>
          <Button onClick={() => setDisplayForm(true)}>
            Ajouter une tâche
          </Button>
          <DataTable
            data={formatData(taskList)}
            columns={editTableColumns(editTask, handleDelete)}
          />
        </div>
      )}
    </div>
  );
}
