import { Project, Sprint } from "@/app/model/projet";

import { DataTable } from "@/components/ui/data-table";

import React from "react";
import { Button } from "@/components/ui/button";
import { deleteProject, deleteSprint, getProject, getProjects } from "@/components/utils/api";
import { deleteProjectToast, deleteTaskToast, getProjectToast, getSprintToast } from "@/components/utils/toasts";
import { EditProjectColumns } from "@/components/edit-panel/projects-panel/edit-project-columns";
import { ProjectForm } from "@/components/forms/project-form";
import { useTranslation } from "react-i18next";

export default function EditSprintPanel() {
  const { t } = useTranslation();
  const [projectList, setProjectList] = React.useState<Project[]>([]);

  const [displayForm, setDisplayForm] = React.useState<boolean>(false);
  const [projectToEdit, setProjectToEdit] = React.useState<Project | undefined>(
    undefined
  );
  
  function setSortedProjectList(projectList: Project[]) {
    setProjectList(projectList?.sort((a, b) => parseFloat(a.id) - parseFloat(b.id)) || []);
  }

  React.useEffect(() => {
   fetchProjectList();
  }, []);

  async function fetchProjectList() {
    var response = await getProjects();
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      getProjectToast(false);
      return;
    }
    response.json().then((projects) => {
      setSortedProjectList(projects);
    });
  }

  function editProject(project: Project) {
    setProjectToEdit(project);
    setDisplayForm(true);
  }

  async function handleDelete(projectId: string) {
    var response = await deleteProject(projectId);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      deleteProjectToast(false);
      return;
    }
    fetchProjectList();
    deleteProjectToast(true);
  }

  function closeForm() {
    setProjectToEdit(undefined);
    setDisplayForm(false);
  }

  return (
    <div>
        <p>{t("projet.listeProjet")}</p>
      <div className="py-5">
        {displayForm ? (
        <ProjectForm
          projectToEdit={projectToEdit}
          setProjectList={setSortedProjectList}
          closeForm={closeForm}
        />
      ) : (
        <div>
          <Button className="mb-5" onClick={() => setDisplayForm(true)}>
          {t("projet.ajouterProjet")}
          </Button>
          <DataTable
            data={projectList}
            columns={EditProjectColumns(editProject, handleDelete, t)}
          />
        </div>
      )}
      </div>
      </div>
  );
}
