
import { Column, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronDown, ChevronUp, EditIcon, EyeIcon, MinusIcon, PlusIcon } from "lucide-react"
import { Task } from "@/app/model/projet";
import { DeleteItemButton } from "@/components/ui/delete-button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "react-i18next";


const header = ({column, title}:{column: Column<Task, unknown>, title: string}) => {
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

export function EditTableColumns(editTask: Function, handleDeleteTask: Function, isOtherAssigned: boolean, t: Function, handleAssignTask?: Function, handleUnassignTask?: Function): ColumnDef<Task>[] {
  // On fournit t (i18n) pour resepecter les règles de hooks
  const path = usePathname();
  return [
    {
      accessorKey: "name",
      header: ({column}: {column: Column<Task, unknown>}) => header({column, title: t("global.nom")}),
      cell: ({ row } : {row : any}) => (
        <div className="whitespace-pre-line overflow-auto max-h-16">
          {row.original.name}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: ({column}: {column: Column<Task, unknown>}) => header({column, title: t("global.description")}),
      cell: ({ row } : {row : any}) => (
        <div className="whitespace-pre-line overflow-auto max-h-16">
          {row.original.description}
        </div>
      ),
    },
    {
      accessorKey: "priority",
      header: ({column}: {column: Column<Task, unknown>}) => header({column, title: t("global.priorite")}),
    },
    {
      accessorKey: "state",
      header: ({column}: {column: Column<Task, unknown>}) => header({column, title: t("global.statut")}),
    }].concat(isOtherAssigned ? [
    
    {
      accessorKey: "estimUser.firstName",
      header: ({column}: {column: Column<Task, unknown>}) => header({column, title: t("global.responsable")}),
    }
    ] : []).concat([
    {
      accessorKey: "actions",
      header: () => <div className="pe-2 flex justify-center">{t("global.actions")}</div>,
      cell: ({ row } : {row : any}) => (
        <div className="flex justify-end items-center gap-4 px-8">
          {handleUnassignTask !== undefined ? (
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                handleUnassignTask(row.original.id)}}>
                  <MinusIcon />
                  {t("tache.desaffecter")}
            </Button> ) 
            : "" }
          {handleAssignTask !== undefined ? (
            <Button
             className="flex items-center gap-2"
              disabled={isOtherAssigned}
              onClick={() => {
                handleAssignTask(row.original.id)}}>
                  <PlusIcon />
                  {t("tache.sAffecterTache")}
            </Button> ) 
            : "" }
          <Button
           className="flex items-center gap-2"
            type="submit"
            onClick={() => {
              editTask(row.original)}}
          >
            <EditIcon />
            {t("actions.modifier")}
          </Button>
          <Link href={`${path}/${row.original.id}`}>
          <Button  className="flex items-center gap-2"> <EyeIcon/> {t("actions.details")} </Button>
          </Link>
          <DeleteItemButton text="Supprimer" handleClick={() => handleDeleteTask(row.original.id)}/>
        </div>
      ),
    },
  ]);
}
