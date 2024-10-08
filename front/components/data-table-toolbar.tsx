"use client"

import { CheckCircledIcon, Cross2Icon, CrossCircledIcon, QuestionMarkCircledIcon, StopwatchIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { Plus } from "lucide-react"

const taskTypes = [
  {
    value: "BUG",
    label: "Bug",
    icon: CrossCircledIcon,
  },
  {
    value: "FEATURE",
    label: "Feature",
    icon: CheckCircledIcon,
  },
  {
    value: "ENHANCEMENT",
    label: "Enhancement",
    icon: CheckCircledIcon,
  },
  {
    value: "REFACTOR",
    label: "Refactor",
    icon: CheckCircledIcon,
  },
  {
    value: "RESEARCH",
    label: "Research",
    icon: CheckCircledIcon,
  },
  {
    value: "TEST",
    label: "Test",
    icon: CheckCircledIcon,
  },
  {
    value: "OTHER",
    label: "Other",
    icon: CheckCircledIcon,
  }
]

const statuses = [
  {
    value: "BACKLOG",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "IN_PROGRESS",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "DONE",
    label: "Done",
    icon: CheckCircledIcon,
  },
]

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleAddTask = () => {
    table.options.meta.insertRow()
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrer par nom..."
          value={(table.getColumn("taskName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("taskName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Statut"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Réinitialiser
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex justify-end gap-4">
        <Button className="w-full gap-4" onClick={handleAddTask} disabled={table.getIsSomeRowsSelected()}>
          <Plus />
          Ajouter une tâche
        </Button>
      </div>
    </div>
  )
}
