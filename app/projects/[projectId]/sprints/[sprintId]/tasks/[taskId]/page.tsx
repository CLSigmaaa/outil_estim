"use client"
import TaskDetails from "@/components/TaskDetails";
import { useParams } from "next/navigation";

export default function Sprint() {
  const params = useParams();
  const { projectId, sprintId, taskId } = params;

  return (
    <>
    {projectId == null || sprintId == null || taskId == null ? <p>loading...</p> :
    <TaskDetails projectId={projectId} sprintId={sprintId} taskId={taskId}/>
  }
  </>
  );
}