"use client"

import i18n from "@/app/i18n";
import EditPanel from "@/components/edit-panel/task-panel/edit-task-panel";
import EstimPanel from "@/components/estim-panel/estim-task-panel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getSprint } from "@/components/utils/api";
import { useProjectStore } from "@/store/useProjectStore";
import { useParams } from "next/navigation";
import React from "react";
import { I18nextProvider, useTranslation } from "react-i18next";

export default function Sprint() {
  const { t } = useTranslation();
  const params = useParams();
  const { projectId , sprintId } = params as {projectId: string, sprintId: string}; // Pas de catchAll segment n'est utilisé, le paramètre est toujours un string

  const {setSelectedSprint} = useProjectStore();
  
  async function init() {
  getSprint(projectId, sprintId).then((response) => {
    if (!response?.ok) {
      return;
    }
    response.json().then((sprint) => {
      setSelectedSprint(sprint);
    });
  });
}

React.useEffect(() => {
  init();
}
, []);
  return (
    <I18nextProvider i18n={i18n}>
    <div>
       <Tabs
          defaultValue={"estimation"}
        >
          <TabsList className="flex flex-grow">
              <TabsTrigger className="flex flex-grow text-lg" key={"estimation"} value={"estimation"}>{t("global.estimation")}</TabsTrigger>
              <TabsTrigger className="flex flex-grow text-lg" key={"edition"} value={"edition"}>{t("global.edition")}</TabsTrigger>
          </TabsList>
          
            <TabsContent key={"estimation"} value={"estimation"}>
              <EstimPanel projectId={projectId} sprintId={sprintId} />
            </TabsContent>
            <TabsContent key={"edition"} value={"edition"}>
              <EditPanel projectId={projectId} sprintId={sprintId} />
            </TabsContent>
            
     
        </Tabs>
    </div>
    </I18nextProvider>
  );
}
