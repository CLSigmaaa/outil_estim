"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ColumnDef, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Check, Pencil, Plus, X } from "lucide-react"
import { Input } from "./ui/input"
import { DataTablePagination } from "./data-table-pagination"
import { ConfirmDeleteRow } from "./confirm-delete-row"
import { DataTableToolbar } from "./data-table-toolbar"

export type TData = {
  id?: string,
  task: string,
  status: 'backlog' | 'in-progress' | 'done',
  initialEstimate: number,
  consumedTime: number,
  remainingTime: number,
  tempData: Partial<Omit<TData, 'id' | 'initialEstimate' | 'consumedTime' | 'remainingTime'> & {
    newConsumedTime: number,
    newRemainingTime: number
  }>
}

const SelectInputCell = (props: any) => {
  const updateTempData = props.table.options.meta.updateTempData
  console.log("props", props.row.id)

  return (
    <Select defaultValue={props.defaultValues} onValueChange={(status) => updateTempData(props.row.id, 'status', status)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem
            value="backlog"
          >
            backlog
          </SelectItem>
          <SelectItem
            value="in-progress"
          >
            in-progress
          </SelectItem>
          <SelectItem
            value="done"
          >
            done
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const TextInputCell = (props: any) => {
  const isRowSelected = props.row.getIsSelected()
  const updateTempData = props.table.options.meta.updateTempData

  const [value, setValue] = useState("")

  useEffect(() => {
    if (isRowSelected) {
      setValue(props.defaultValue === "" ? "" : props.defaultValue);
    }
  }, [isRowSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTempData(props.row.id, props.column.id, e.target.value);
    setValue(e.target.value);
  };

  return (
    <Input
      placeholder={props.placeholder}
      value={value}
      onChange={handleChange}
      disabled={!isRowSelected}
    />
  )
}

const EstimateInputCell = (props: any) => {
  const isRowSelected = props.row.getIsSelected()
  const updateTempData = props.table.options.meta.updateTempData

  const [value, setValue] = useState("")

  useEffect(() => {
    if (!isRowSelected) {
      setValue("");
    }
  }, [isRowSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTempData(props.row.id, props.column.id, e.target.value);
    setValue(e.target.value);
  };

  return (
    <Input
      placeholder={props.placeholder}
      value={value}
      onChange={handleChange}
      disabled={!isRowSelected}
    />
  )
}

const ActionCell = (props: any) => {
  const row = props.row

  return (
    <div className="flex items-center gap-2">
      <Button onClick={row.getToggleSelectedHandler()}>
        <Pencil size={18} />
      </Button>
      <ConfirmDeleteRow onConfirm={props.table.options.meta.removeRow} rowId={row.id} />
    </div>
  )
}

const EditedActionCell = (props: any) => {
  const row = props.row

  const handleSave = () => {
    const tempData = row.original.tempData

    const newConsumedTime = isNaN(parseInt(tempData.newConsumedTime)) ? 0 : parseInt(tempData.newConsumedTime)
    const newRemainingTime = isNaN(parseInt(tempData.newRemainingTime)) ? 0 : parseInt(tempData.newRemainingTime)

    const updatedConsumedTime = isNaN(row.original.consumedTime) ? 0 : row.original.consumedTime + newConsumedTime
    const updatedRemainingTime = newRemainingTime

    const updatedStatus = tempData.status || row.original.status

    const updatedTaskName = tempData.task || row.original.task

    props.table.options.meta.updateData(row.id, {
      consumedTime: updatedConsumedTime,
      remainingTime: updatedRemainingTime,
      status: updatedStatus,
      task: updatedTaskName
    })

    props.table.options.meta.updateTempData(row.id, 'newConsumedTime', 0)
    props.table.options.meta.updateTempData(row.id, 'newRemainingTime', 0)

    row.toggleSelected(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Button onClick={handleSave}>
        <Check size={18} />
      </Button>
      <Button variant="secondary" onClick={row.getToggleSelectedHandler()}>
        <X size={18} />
      </Button>
    </div>
  )
}

const defaultData: TData[] = [
  {
    task: 'Task 1',
    status: 'backlog',
    initialEstimate: 10,
    consumedTime: 0,
    remainingTime: 10,
    tempData: {}
  },
  {
    task: 'Task 2',
    status: 'in-progress',
    initialEstimate: 10,
    consumedTime: 5,
    remainingTime: 5,
    tempData: {}
  },
  {
    task: 'Task 3',
    status: 'done',
    initialEstimate: 10,
    consumedTime: 10,
    remainingTime: 0,
    tempData: {}
  },
  {
    task: 'Task 4',
    status: 'backlog',
    initialEstimate: 10,
    consumedTime: 0,
    remainingTime: 10,
    tempData: {}
  },
  {
    task: 'Task 5',
    status: 'in-progress',
    initialEstimate: 10,
    consumedTime: 5,
    remainingTime: 5,
    tempData: {}
  },
  {
    task: 'Task 6',
    status: 'done',
    initialEstimate: 10,
    consumedTime: 10,
    remainingTime: 0,
    tempData: {}
  },
  {
    task: 'Task 7',
    status: 'backlog',
    initialEstimate: 10,
    consumedTime: 0,
    remainingTime: 10,
    tempData: {}
  },
  {
    task: 'Task 8',
    status: 'in-progress',
    initialEstimate: 10,
    consumedTime: 5,
    remainingTime: 5,
    tempData: {}
  },
  {
    task: 'Task 9',
    status: 'done',
    initialEstimate: 10,
    consumedTime: 10,
    remainingTime: 0,
    tempData: {}
  },
  {
    task: 'Task 10',
    status: 'backlog',
    initialEstimate: 10,
    consumedTime: 0,
    remainingTime: 10,
    tempData: {}
  },
  {
    task: 'Task 11',
    status: 'in-progress',
    initialEstimate: 10,
    consumedTime: 5,
    remainingTime: 5,
    tempData: {}
  },
  {
    task: 'Task 12',
    status: 'done',
    initialEstimate: 10,
    consumedTime: 10,
    remainingTime: 0,
    tempData: {}
  }
]

const columns: ColumnDef<TData>[] = [
  {
    accessorKey: 'task',
    header: 'Task',
    size: 180,
    enableResizing: false,
    cell: (props: any) => (
      props.row.getIsSelected() ? <TextInputCell placeholder="Task" defaultValue={props.getValue()} {...props} /> : <p>{props.getValue()}</p>
    )
  },
  {
    accessorKey: 'initialEstimate',
    header: 'Initial Estimate',
    cell: (props: any) => (
      props.row.getIsSelected() ? <TextInputCell placeholder="0" defaultValue={props.getValue()} {...props} /> : <p>{props.getValue()}</p>
    )

  },
  {
    accessorKey: 'consumedTime',
    header: 'Consumed Time',
    cell: (props: any) => (
      <p>{props.getValue()}</p>
    )
  },
  {
    accessorKey: 'remainingTime',
    header: 'Remaining Time',
    cell: (props: any) => (
      <p>{props.getValue()}</p>
    )
  },
  {
    accessorKey: 'newConsumedTime',
    header: 'New Consumed Time',
    cell: (props: any) => <EstimateInputCell placeholder="New Consumed Time" {...props} />
  },
  {
    accessorKey: 'newRemainingTime',
    header: 'New Remaining Time',
    cell: (props: any) => <EstimateInputCell placeholder="New Remaining Time" {...props} />
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableResizing: false,
    size: 180,
    minSize: 180,
    maxSize: 180,
    filterFn: 'arrIncludesSome',
    cell: (props: any) => (
      props.row.getIsSelected() ? <SelectInputCell defaultValues={props.getValue()} {...props} /> : <Badge variant="secondary" className="cursor-pointer select-none">{props.getValue()}</Badge>
    )
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: (props: any) => (
      props.row.getIsSelected() ? <EditedActionCell {...props} /> : <ActionCell {...props} />
    )
  }
]

export const DataTable = () => {
  const [data, setData] = useState<TData[]>(defaultData)
  const [rowSelection, setRowSelection] = useState<any>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      rowSelection,
      pagination
    },
    meta: {
      updateData: (rowId: string, updatedData: any) => {
        setData((prev) =>
          prev.map((row, index) => {
            if (index.toString() === rowId) {
              return {
                ...row,
                ...updatedData
              }
            }
            return row
          })
        )
      },
      updateTempData: (rowId: string, columnId: string, value: any) => {
        setData((prev) =>
          prev.map((row, index) => {
            if (index.toString() === rowId) {
              return {
                ...row,
                tempData: {
                  ...row.tempData,
                  [columnId]: value
                }
              }
            }
            return row
          })
        )
      },
      removeRow: (rowId: string) => {
        setData((prev) => prev.filter((_, index) => index.toString() !== rowId))
      },
      insertRow: () => {
        setData((prev) => [
          {
            task: 'New Task',
            status: 'backlog',
            initialEstimate: 0,
            consumedTime: 0,
            remainingTime: 0,
            tempData: {}
          },
          ...prev
        ])
      }
    }
  })

  console.log("table", table)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col justify-start">
        <DataTableToolbar table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((column: any) => (
                  <TableHead
                    key={column.id}
                    style={{ width: `${column.getSize()}px`, minWidth: `${column.getSize()}px`, maxWidth: `${column.getSize()}px` }}
                  >
                    {column.column.columnDef.header}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: any) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell: any) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={columns.length} className="h-24 text-center">No data</TableCell>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
