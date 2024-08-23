import { Column, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronDown, ChevronUp, EditIcon } from "lucide-react"
import { Project } from "@/app/model/projet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DeleteItemButton } from "@/components/ui/delete-button";
import { getSprint } from "@/components/utils/api";
import { useTranslation } from "react-i18next";

const header = ({column, title}:{column: Column<Project, unknown>, title: string}) => {
  return (
    <Button
      variant="ghost"
      className="h-fit px-0"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      <div className="text-start text-wrap w-min">
        {title}
      </div>
      {column.getIsSorted() === "asc" ? <ChevronUp height={20} width={20}/> : <ChevronDown height={20} width={20}/>}
    </Button>
  
  )
}

async function goToCurrentSprint(projectId: string, pathname: string, router: any) {
  var response = await getSprint(projectId, "current");
  
  if (response == undefined || !response.ok) {
    return;
  }
  response.json().then((sprint) => {
    router.push(`${pathname}/${projectId}/sprints/${sprint.id}/tasks`);
  });
  

}

export function EditProjectColumns(editProject: Function, handleDelete: Function, t: Function): ColumnDef<Project>[] {
  const pathname = usePathname();
  const router = useRouter();
  return [
    {
      accessorKey: "name",
      header: ({column}) => header({column, title: t("global.nom")}),
    },
    {
      accessorKey: "description",
      header: ({column}) => header({column, title: t("global.description")}),
    },
    {
      accessorKey: "actions",
      header: () => <div className=" pe-2 flex justify-center ">{t("global.actions")}</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-4 ">
          
      <Button onClick={() => goToCurrentSprint(row.original.id, pathname, router)}> {t("sprint.sprintEnCours")} </Button>
      <Link href={`${pathname}/${row.original.id}/sprints`}><Button> {t("sprint.sprints")} </Button></Link>
          <Button
          className="flex items-center gap-2"
            type="submit"
            onClick={() => {
              editProject(row.original)}}
          >
            <EditIcon />
            {t("actions.modifier")}
          </Button>
           <DeleteItemButton text={t("actions.supprimer.titre")} handleClick={() => handleDelete(row.original.id)}/>
        </div>
      ),
    },
  ];
}
