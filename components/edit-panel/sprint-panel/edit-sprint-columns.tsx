import { Column, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronDown, ChevronUp, EditIcon } from "lucide-react"
import { Sprint } from "@/app/model/projet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DeleteItemButton } from "@/components/ui/delete-button";
import { useTranslation } from "react-i18next";


const header = ({column, title}:{column: Column<Sprint, unknown>, title: string}) => {
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

export function EditSprintColumns(editSprint: Function, handleDelete: Function, t: Function): ColumnDef<Sprint>[] {
  const path = usePathname();

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
      accessorKey: "state",
      header: ({column}) => header({column, title: t("global.statut")}),
    },
    {
      accessorKey: "actions",
      header: () => <div className=" pe-2 flex justify-center ">{t("global.actions")}</div>,
      cell: ({ row }) => (
        <div className="flex justify-end items-center gap-4 px-8">
          <Link href={`${path}/${row.original.id}/tasks`}>
            <Button> {t("actions.estimer")}  </Button>
          </Link>
          <Button
          className="flex items-center gap-2"
            type="submit"
            onClick={() => {
              editSprint(row.original)}}
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
