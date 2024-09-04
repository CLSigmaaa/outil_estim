import { Sprint } from "@/app/model/projet";

import { DataTable } from "@/components/ui/data-table";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  nativeStateEnum,
} from "@/app/model/projet/itemEnum";
import { deleteSprint, getProject } from "@/components/utils/api";
import { SprintForm } from "@/components/forms/sprint-form";
import { EditSprintColumns } from "@/components/edit-panel/sprint-panel/edit-sprint-columns";
import { deleteSprintToast, deleteTaskToast, getProjectToast, getSprintToast } from "@/components/utils/toasts";
import { useProjectStore } from "@/store/useProjectStore";
import { useTranslation } from "react-i18next";

export default function EditSprintPanel({projectId}: {projectId: string}) {
  const { t } = useTranslation();
  const {selectedProject, setSelectedProject} = useProjectStore();
  const [sprintList, setSprintList] = React.useState<Sprint[]>([]);

  const [displayForm, setDisplayForm] = React.useState<boolean>(false);
  const [sprintToEdit, setSprintToEdit] = React.useState<Sprint | undefined>(
    undefined
  );


  function setSortedSprintList(SprintList: Sprint[]) {
    setSprintList(SprintList?.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)) || []);
  }
  React.useEffect(() => {
    if (selectedProject == undefined) {
      return;
    }
    setSortedSprintList(selectedProject.sprints);
  }, [selectedProject]);

  async function fetchProject() {
    var response = await getProject(projectId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getProjectToast(false);
      return;
    }
    response.json().then((project) => {
      setSelectedProject(project);
    });
  }
  

  function formatData(sprintList: Sprint[]) {
    return sprintList.map((sprint) => {
      return {
        ...sprint,
        name: sprint.name,
        description: sprint.description,
        state: sprint.state,
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
      deleteSprintToast(false);
      return;
    }
    fetchProject();
    deleteSprintToast(true);
  }

  function closeForm() {
    setSprintToEdit(undefined);
    setDisplayForm(false);
  }

  return (
    <div className="py-10">
       <p className="text-xl font-semibold">{selectedProject ? selectedProject.name : t("global.chargement")} </p>
      <div className="py-5">
        {displayForm ? (
        <SprintForm
          projectId={projectId}
          sprintToEdit={sprintToEdit}
          setSprintList={setSortedSprintList}
          closeForm={closeForm}
        />
      ) : (
        <div>
          <Button className="mb-5" onClick={() => setDisplayForm(true)}>
          {t("sprint.ajouterSprint")}
          </Button>
          <DataTable
            data={formatData(sprintList)}
            columns={EditSprintColumns(editSprint, handleDelete, t)}
          />
        </div>
      )}
      </div>
      </div>
  );
}
