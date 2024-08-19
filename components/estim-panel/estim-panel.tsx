import EstimTaskList from "@/components/estim-panel/estim-task-list";
import React from "react";


export default function EstimPanel({projectId, sprintId}: {projectId: string, sprintId: string}) {
  return (
    <div className="flex flex-col">
     <p className="text-xl font-semibold"> Espace d'estimation </p>
     <p className="text-gray-600"> Saisissez une nouvelle estimation ou cliquez sur une tâche pour consulter ses informations</p>
     <EstimTaskList projectId={projectId} sprintId={sprintId} />

    </div>
  )
}
