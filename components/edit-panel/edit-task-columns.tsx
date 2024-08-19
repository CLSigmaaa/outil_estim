
import { Column, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react"
import { Task } from "@/app/model/projet";
import { DeleteItemButton } from "@/components/ui/delete-button";
import { usePathname } from "next/navigation";
import Link from "next/link";


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

export function editTableColumns(editTask: any, handleDelete: any): ColumnDef<Task>[] {
  const path = usePathname();
  return [
    {
      accessorKey: "name",
      header: ({column}) => header({column, title: "Nom"}),
    },
    {
      accessorKey: "description",
      header: ({column}) => header({column, title: "Description"}),
    },
    {
      accessorKey: "priority",
      header: ({column}) => header({column, title: "Priorité"}),
    },
    {
      accessorKey: "state",
      header: ({column}) => header({column, title: "Statut"}),
    },
    {
      accessorKey: "actions",
      header: () => <div className=" pe-2 flex justify-center ">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-4 ">
          <Button
            type="submit"
            onClick={() => {
              editTask(row.original)}}
          >
            Modifier
          </Button>
          <Link href={`${path}/${row.original.id}`}>
          <Button > Aperçu </Button>
          </Link>
          <DeleteItemButton handleClick={() => handleDelete(row.original.id)}/>
        </div>
      ),
    },
  ];
}
