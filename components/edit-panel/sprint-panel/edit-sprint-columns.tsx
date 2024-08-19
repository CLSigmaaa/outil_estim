import { Column, ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react"
import { Sprint } from "@/app/model/projet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DeleteItemButton } from "@/components/ui/delete-button";


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

export function editSprintColumns(editSprint: any, handleDelete: any): ColumnDef<Sprint>[] {
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
              editSprint(row.original)}}
          >
            Modifier
          </Button>
          
          <Link href={`${path}/${row.original.id}/tasks`}>
            <Button> Estimation </Button>
          </Link>
           <DeleteItemButton handleClick={() => handleDelete(row.original.id)}/>
        </div>
      ),
    },
  ];
}
