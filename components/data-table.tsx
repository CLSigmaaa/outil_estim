"use client"

import { useDebounce } from "use-debounce"

import useTasks from "@/hooks/use-tasks"

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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { ColumnDef, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ChartLine, ScrollText } from "lucide-react"
import { Input } from "./ui/input"
import { DataTablePagination } from "./data-table-pagination"
import { ConfirmDeleteRow } from "./confirm-delete-row"
import { DataTableToolbar } from "./data-table-toolbar"

export type TData = {
  id?: string,
  taskName: string,
  status: 'backlog' | 'in-progress' | 'done' | 'created',
  initialEstimation: number,
  consumedTime: number,
  remainingTime: number,
}

interface EditableCellProps {
  getValue: () => any;
  row: {
    original: {
      id: string;
    }
  };
  column: {
    id: string;
  };
  table: {
    options: {
      meta: {
        updateRow: (id: string, data: Record<string, any>) => void;
      };
    };
  };
  placeholder?: string;
  type?: string;
}

const EditableCell: React.FC<EditableCellProps> = ({ getValue, row, column, table, placeholder, type }) => {
  const initialValue = getValue()

  const options = table.options.meta

  const [value, setValue] = useState(initialValue)
  const [debouncedValue] = useDebounce(value, 500)
  const specialFields = ['newConsumedTime', 'newRemainingTime']

  useEffect(() => {
    if (debouncedValue) {
      console.log("debouncedValue", debouncedValue)
      console.log("row.original.id", row.original.id)
      if (specialFields.includes(column.id)) {
        if (column.id === 'newConsumedTime') {
          options.updateRow(row.original.id, { consumedTime: parseInt(debouncedValue) })
          return;
        }
        if (column.id === 'newRemainingTime') {
          options.updateRow(row.original.id, { remainingTime: parseInt(debouncedValue) })
          return;
        }

        options.updateRow(row.original.id, { [column.id]: debouncedValue })
        return;
      }
    }
  }, [debouncedValue])

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder ? placeholder : undefined}
      type={type ? type : 'text'}
      onBlur={() => {
        setValue("")
      }}
    />
  )
}

const ActionCell = (props: any) => {
  const row = props.row

  return (
    <div className="flex items-center gap-2">
      <ActionCell.HistoryDialog />
      <ActionCell.DetailedGraphsDialog />

      <ConfirmDeleteRow onConfirm={props.table.options.meta.removeRow} rowId={row.id} />
    </div>
  )
}

const HistoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ScrollText size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>History</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>History of changes</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
ActionCell.HistoryDialog = HistoryDialog

const DetailedGraphsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ChartLine size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detailed Graphs</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p>Graphs</p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
ActionCell.DetailedGraphsDialog = DetailedGraphsDialog

const columns: ColumnDef<TData>[] = [
  {
    accessorKey: 'taskName',
    header: 'Task',
    size: 180,
    enableResizing: false,
    cell: (props: any) => <EditableCell {...props} />
  },
  {
    accessorKey: 'initialEstimation',
    header: 'Initial Estimate',
    cell: (props: any) => <EditableCell {...props} />

  },
  {
    accessorKey: 'consumedTime',
    header: 'Total Consumed Time (days)',
    cell: (props: any) => (
      <p>{props.getValue()}</p>
    )
  },
  {
    accessorKey: 'remainingTime',
    header: 'Remaining Time (days)',
    cell: (props: any) => (
      <p>{props.getValue()}</p>
    )
  },
  {
    accessorKey: 'newConsumedTime',
    header: 'New Consumed Time',
    cell: (props: any) => <EditableCell {...props} placeholder="0" type="number" />
  },
  {
    accessorKey: 'newRemainingTime',
    header: 'New Remaining Time',
    cell: (props: any) => <EditableCell {...props} placeholder="0" type="number" />
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableResizing: false,
    size: 180,
    minSize: 180,
    maxSize: 180,
    filterFn: 'arrIncludesSome',
    cell: (props: any) => {
      const badgeColors: Record<string, any> = {
        'BACKLOG': 'destructive',
        'IN_PROGRESS': 'warning',
        'DONE': 'success',
      }
      return (
        <Badge variant={badgeColors[props.getValue()]} className="cursor-pointer select-none">{props.getValue()}</Badge>
      )
    }
  },
  {
    accessorKey: 'actions',
    header: 'Actions',
    cell: (props: any) => (
      <ActionCell {...props} />
    )
  }
]

export const TaskTable = () => {
  const { data: originalData, isValidating, updateRow, addRow, deleteRow } = useTasks()
  const [data, setData] = useState<TData[]>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    if (isValidating) return;
    setData([...originalData])
  }, [isValidating])


  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      pagination
    },
    meta: {
      revertData: (rowIndex: number) => {
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? originalData[rowIndex] : row
          )
        );
      },
      updateRow: (rowIndex: number, putData: any) => {
        console.log("rowIndex", rowIndex)
        updateRow(rowIndex, putData);
      },
      addRow: () => {
        //const newRow: TData = {
        //};
        //addRow(newRow);
      },
      removeRow: (rowIndex: number) => {
        deleteRow(data[rowIndex].id);
      },
      removeSelectedRows: (selectedRows: number[]) => {
        selectedRows.forEach((rowIndex) => {
          deleteRow(data[rowIndex].id);
        });
      },
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
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
