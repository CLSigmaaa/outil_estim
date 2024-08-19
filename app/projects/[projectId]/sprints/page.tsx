"use client"
import EditSprintList from "@/components/edit-panel/sprint-panel/edit-sprint-list";
import { useParams } from "next/navigation";

export default function Project() {
  const params = useParams();
  const { projectId } = params;

  return (
    <>
    {projectId == null ? <p>loading...</p> :
        <EditSprintList projectId={projectId} />
    }
    </>
  );
}