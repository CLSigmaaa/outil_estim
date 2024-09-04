"use client"
import EditSprintPanel from "@/components/edit-panel/sprint-panel/edit-sprint-panel";
import { getProject } from "@/components/utils/api";
import { useProjectStore } from "@/store/useProjectStore";
import { useParams } from "next/navigation";
import React from "react";
import { useTranslation, I18nextProvider } from "react-i18next";
import i18n from "@/app/i18n";

export default function Project() {
  const { t } = useTranslation();
  const params = useParams();
  const { projectId } = params as {projectId: string};// Pas de catchAll segment n'est utilisé, le paramètre est toujours un string

  const {setSelectedProject} = useProjectStore();

  async function init() {
  getProject(projectId).then((response) => { 
    if (!response?.ok) {
      return;
    }
    response.json().then((project) => {
      setSelectedProject(project);
    });
  });
}

React.useEffect(() => {
  init();
}
, []);

  return (
    <>
    <I18nextProvider i18n={i18n}>
    {projectId == null ? <p>{t("global.chargement")}</p> :
        <EditSprintPanel projectId={projectId} />
    }
    </I18nextProvider>
    </>
  );
}