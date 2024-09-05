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
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Check, Pencil, Trash2, X } from "lucide-react"
import { Input } from "./ui/input"

type TData = {
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

const InputCell = (props: any) => {
  const isRowSelected = props.row.getIsSelected()
  const updateTempData = props.table.options.meta.updateTempData
  const [value, setValue] = useState("")

  //console.log("Row Input Cell", props.row)
  //console.log("Column Input Cell", props.column)
  //console.log("Table data", props.table.options.data)

  useEffect(() => {
    if (!isRowSelected) {
      setValue("");
    }
  }, [isRowSelected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTempData(props.row.id, props.column.id, e.target.value);
    setValue(e.target.value);
    console.log(props.row.id)
    console.log(props.row.index)
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
      <Button variant="secondary">
        <Trash2 size={18} />
      </Button>
    </div>
  )
}

const EditedActionCell = (props: any) => {
  const row = props.row

  const handleSave = () => {
    row.getToggleSelectedHandler()
    const updatedConsumedTime = row.getValue('consumedTime') + parseInt(row.getValue('newConsumedTime'))
    const updatedRemainingTime = parseInt(row.getValue('newConsumedTime'))

    console.log("updatedConsumedTime", updatedConsumedTime)
    console.log("updatedRemainingTime", updatedRemainingTime)

    console.log("row", row)

    props.table.options.meta.updateData(row.id, 'consumedTime', updatedConsumedTime)
    props.table.options.meta.updateData(row.id, 'remainingTime', updatedRemainingTime)
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
  }
]

const columns: ColumnDef<TData>[] = [
  {
    accessorKey: 'task',
    header: 'Task',
    cell: (props: any) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'initialEstimate',
    header: 'Initial Estimate',
    cell: (props: any) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'consumedTime',
    header: 'Consumed Time',
    cell: (props: any) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'remainingTime',
    header: 'Remaining Time',
    cell: (props: any) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'newConsumedTime',
    header: 'New Consumed Time',
    cell: (props: any) => <InputCell placeholder="New Consumed Time" {...props} />
  },
  {
    accessorKey: 'newRemainingTime',
    header: 'New Remaining Time',
    cell: (props: any) => <InputCell placeholder="New Remaining Time" {...props} />
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (props: any) => <Badge variant="secondary" className="cursor-pointer select-none">{props.getValue()}</Badge>
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: true,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    },
    meta: {
      updateData: (rowId: string, columnId: string, value: any) => {
        const updatedData = data.map((row) => {
          if (row.id === rowId) {
            return {
              ...row,
              [columnId]: value
            }
          }
          return row
        })
        setData(updatedData)
      },
      updateTempData: (rowId: string, columnId: string, value: any) => {
        setData((prev) =>
          prev.map((row) => {
            if (row.id === rowId) {
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
      }
    }
  })
  console.log("table", table.options.data)

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup: any) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((column: any) => (
              <TableHead key={column.id}>{column.column.columnDef.header}</TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row: any) => (
            <TableRow key={row.id}>
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
  )
}
