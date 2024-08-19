import { Sprint } from "@/app/model/projet";

import { DataTable } from "@/components/ui/data-table";

import React from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  nativeStateEnum,
} from "@/app/model/projet/itemEnum";
import { deleteSprint, getProject } from "@/components/utils/api";
import { SprintForm } from "@/components/forms/sprint-form";
import { editSprintColumns } from "@/components/edit-panel/sprint-panel/edit-sprint-columns";
import { deleteTaskToast, getProjectToast, getSprintToast } from "@/components/utils/toasts";

export default function EditSprintList({projectId}: {projectId: string}) {
  const [sprintList, setSprintList] = React.useState<Sprint[]>([]);

  const [displayForm, setDisplayForm] = React.useState<boolean>(false);
  const [sprintToEdit, setSprintToEdit] = React.useState<Sprint | undefined>(
    undefined
  );


  function setSortedSprintList(SprintList: Sprint[]) {
    setSprintList(SprintList?.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)) || []);
  }
  // create a sample for SprintList
  React.useEffect(() => {
    fetchSprintList();
  }, []);

  const fetchSprintList = async () => {
    var response = await getProject(projectId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getSprintToast(false);
      return;
    }
    response.json().then((updatedProject) => {
      setSortedSprintList(updatedProject.sprints);
    });
  };

  function formatData(SprintList: Sprint[]) {
    return SprintList.map((Sprint) => {
      return {
        ...Sprint,
        name: Sprint.name,
        description: Sprint.description,
        state: nativeStateEnum[Sprint.state],
      };
    });
  }

  function editSprint(sprint: Sprint) {
    setSprintToEdit(sprint);
    setDisplayForm(true);
  }

  async function handleDelete(sprintId: string) {
    var response = await deleteSprint(projectId, sprintId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      deleteTaskToast(false);
      return;
    }
    fetchSprintList();
    deleteTaskToast(true);
  }

  function closeForm() {
    setSprintToEdit(undefined);
    setDisplayForm(false);
  }

  return (
    <div className="py-10">
      {displayForm ? (
        <SprintForm
          projectId={projectId}
          sprintToEdit={sprintToEdit}
          setSprintList={setSortedSprintList}
          closeForm={closeForm}
        />
      ) : (
        <div>
          <Button onClick={() => setDisplayForm(true)}>
            Ajouter un sprint
          </Button>
          <DataTable
            data={formatData(sprintList)}
            columns={editSprintColumns(editSprint, handleDelete)}
          />
        </div>
      )}
    </div>
  );
}
