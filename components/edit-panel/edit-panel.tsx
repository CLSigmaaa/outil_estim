import EditTaskList from "@/components/edit-panel/edit-task-list";
import React from "react";

export default function EditPanel({projectId, sprintId}: {projectId: string, sprintId: string}) {
  return (
    <div className="flex flex-col">
     <p className="text-xl font-semibold"> Espace de modification </p>
     <EditTaskList projectId={projectId} sprintId={sprintId}/>
     

    </div>
  );
}