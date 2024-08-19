"use client"

import TaskDetails from "@/components/TaskDetails";
import { useParams } from "next/navigation";

export default function Estimation() {
  const params = useParams();
  const { projectId, sprintId, taskId, estimationid } = params;

  return (
    <>
    {projectId == null || sprintId == null || taskId == null || estimationid == null ? <p>loading...</p> :
    "TODO"
  }
  </>
  );
}