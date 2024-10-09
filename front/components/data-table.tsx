"use client"

import { Textarea } from "@/components/ui/textarea"
import { createPortal } from "react-dom"

import { useRef } from "react"

import useTasks from "@/hooks/use-tasks"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { ColumnDef, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { forwardRef, useEffect, useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ChartLine, Check, ScrollText } from "lucide-react"
import { Input } from "./ui/input"
import { DataTablePagination } from "./data-table-pagination"
import { ConfirmDeleteRow } from "./confirm-delete-row"
import { DataTableToolbar } from "./data-table-toolbar"

import { CheckCircledIcon, CrossCircledIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { CircleAlert } from 'lucide-react';

import { TaskStatus } from "@/utils/enums"
import { nullableNumericSchema, nonNullabeNumericSchema } from "@/utils/schemas"
import { cn } from "@/lib/utils"

export type TData = {
  id?: string,
  taskName: string,
  taskType: string,
  status: TaskStatus,
  initialEstimation: number,
  consumedTime: number,
  remainingTime: number,
  tempData: Partial<Omit<TData, 'id' | 'consumedTime' | 'remainingTime'> & {
    newConsumedTime: number,
    newRemainingTime: number
  }>
}

interface EditableCellBasicInputProps {
  className?: string;
  getValue: () => string | number;
  row: any;
  column: any;
  table: any;
  placeholder?: string;
  type: 'text' | 'number';
  useHoverCard?: boolean;
}

const EditableCellBasicInput: React.FC<EditableCellBasicInputProps> = ({
  className,
  getValue,
  row,
  column,
  table,
  placeholder,
  type,
  useHoverCard = false,
}) => {
  const options = table.options.meta;
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | number>(getValue());
  const [isHovered, setIsHovered] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const updateTempData = options.updateTempData;

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const inputType = type === "number" ? "number" : "text";

    let inputValue = inputType === "number" ? parseFloat(e.target.value) : e.target.value;

    const textFields = ["taskName"];
    const nonNullabeNumericFields = ["initialEstimation"];
    const nullableNumericFields = ["newConsumedTime", "newRemainingTime"];

    let typeValidator: any;

    if (textFields.includes(column.id)) {
      typeValidator = undefined;
    } else if (nonNullabeNumericFields.includes(column.id)) {
      typeValidator = nonNullabeNumericSchema;
    } else if (nullableNumericFields.includes(column.id)) {
      typeValidator = nullableNumericSchema;
    }

    const isValid = e.target.value ? typeValidator?.safeParse(inputValue) : { success: true };

    if (!isValid?.success) {
      setIsValid(false);
      setErrorMessages(isValid.error?.errors.map((error: any) => error.message) || []);
    } else {
      setIsValid(true);
      setErrorMessages([]);
    }

    setValue(e.target.value);
    updateTempData(row.original.id, column.id, e.target.value);

    const currentTempData = options.getTempData(row.original.id);

    if (e.target.value === "" && Object.values(currentTempData).every((value) => value === "")) {
      options.resetTempData(row.original.id);
    }
  };

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => setIsHovered(true), 300); // Délai de 300ms
    setHoverTimeout(timeout);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsHovered(false);
  };

  const handleFocus = () => {
    const timeout = setTimeout(() => setIsHovered(true), 300); // Délai de 300ms
    setHoverTimeout(timeout);
  };

  const handleBlur = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setIsHovered(false);
    if (isValid) {
      return;
    } else {
      setValue(getValue());
      setIsValid(true);
    }
  };

  const inputElement = (
    <Input
      ref={inputRef}
      type={type}
      step={type === "number" ? "0.25" : undefined}
      className={className}
      max={type === "number" ? "2" : undefined}
      min={type === "number" ? "0" : undefined}
      value={value ?? ""}
      onChange={handleOnChange}
      placeholder={placeholder ? placeholder : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );

  if (useHoverCard) {
    return (
      <HoverCard open={isHovered}>
        <HoverCardTrigger asChild>
          {inputElement}
        </HoverCardTrigger>
        <HoverCardContent>
          <p>{value}</p>
        </HoverCardContent>
      </HoverCard>
    );
  }

  return (
    <div className="relative">
      {inputElement}
      {!isValid && createPortal(
        <div
          className={cn(
            "text-red-500 text-xs font-bold",
            "absolute mt-[0.3rem]",
            "bg-red-100 p-3 w-full rounded-md z-50 shadow-md border border-gray-200",
          )}
          style={{
            top: inputRef.current
              ? `${inputRef.current.getBoundingClientRect().bottom + window.scrollY}px`
              : '0',
            left: inputRef.current
              ? `${inputRef.current.getBoundingClientRect().left + window.scrollX}px`
              : '0',
            width: inputRef.current ? `${inputRef.current.offsetWidth}px` : '0',
          }}
        >
          <CircleAlert size={16} />
          <span>
            {
              errorMessages.map((message, index) => (
                <p key={index}>{message}</p>
              ))
            }
          </span>
        </div>,
        document.body)}
    </div>
  );
};

EditableCellBasicInput.displayName = 'EditableCellBasicInput';;


const ActionCell = (props: any) => {
  const row = props.row
  const isDisabled = props.table.options.meta.tempData.find((data: any) => data.rowId === row.original.id) ? false : true

  const handleSaveRow = () => {
    const tempData = props.table.options.meta.tempData.find((data: any) => data.rowId === row.original.id)?.data

    let dataToSend = {}

    if (tempData.newConsumedTime) {
      dataToSend.consumedTime = parseFloat(tempData.newConsumedTime).toFixed(2)
      delete tempData.newConsumedTime
    }
    if (tempData.newRemainingTime) {
      dataToSend.remainingTime = parseFloat(tempData.newRemainingTime).toFixed(2)
      delete tempData.newRemainingTime
    }
    if (tempData.initialEstimation) {
      dataToSend.initialEstimation = parseFloat(tempData.initialEstimation).toFixed(2)
      delete tempData.initialEstimation
    }

    dataToSend = { ...tempData, ...dataToSend }

    props.table.options.meta.setTempData((old: any) => old.filter((data: any) => data.rowId !== row.original.id))

    props.table.options.meta.updateRow(row.original.id, dataToSend)
  }



  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleSaveRow}
        disabled={isDisabled}
      >
        <Check size={18} />
      </Button>
      <ConfirmDeleteRow
        rowId={row.original.id}
        onDelete={props.table.options.meta.removeRow}
      />
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

const columns: ColumnDef<TData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
    enableHiding: true,
    enableResizing: false,
    cell: (props: any) => <p>{props.getValue()}</p>
  },
  {
    accessorKey: 'taskName',
    header: 'Tâche',
    size: 180,
    enableResizing: false,
    cell: (props: any) => (
      <EditableCellBasicInput useHoverCard={true} {...props} />
    )
  },
  {
    accessorKey: 'initialEstimation',
    header: 'Estimation initiale (jours)',
    cell: (props: any) => <EditableCellBasicInput placeholder="0" type="number" {...props} />

  },
  {
    accessorKey: 'consumedTime',
    header: 'Temps consommé total (jours)',
    cell: (props: any) => (
      <p>{props.getValue()}</p>
    )
  },
  {
    accessorKey: 'remainingTime',
    header: 'Reste à faire (jours)',
    cell: (props: any) => (
      <p>{props.getValue()}</p>
    )
  },
  {
    accessorKey: 'newConsumedTime',
    header: 'Nouveau temps consommé',
    cell: (props: any) => <EditableCellBasicInput placeholder="0" type="number" {...props} />
  },
  {
    accessorKey: 'newRemainingTime',
    header: 'Nouveau reste à faire',
    cell: (props: any) => <EditableCellBasicInput placeholder="0" type="number" {...props} />
  },
  {
    accessorKey: 'status',
    header: 'Statut',
    enableResizing: false,
    size: 145,
    minSize: 145,
    maxSize: 145,
    filterFn: 'arrIncludesSome',
    cell: (props: any) => {
      const badgeColors: Record<string, any> = {
        'BACKLOG': 'destructive',
        'IN_PROGRESS': 'warning',
        'DONE': 'success',
      }
      return (
        <Badge
          variant={badgeColors[props.getValue()]}
          className="cursor-pointer select-none"
        >
          {props.getValue()}
        </Badge>
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
  const { data: originalData, isValidating, isLoading, updateRow, addRow, deleteRow } = useTasks()
  const [data, setData] = useState<TData[]>([])
  const [tempData, setTempData] = useState<any[]>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });
  const [columnFilters, setColumnFilters] = useState<any[]>([
    {
      id: 'status',
      value: ['BACKLOG', 'IN_PROGRESS']
    }
  ])

  useEffect(() => {
    if (isValidating || isLoading) return;
    setData([...originalData])
  }, [isValidating, isLoading, originalData])


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
    initialState: {
      sorting: [
        //{
        //  id: 'id',
        //  desc: true
        //}
      ],
      columnVisibility: {
        id: false,
      }
    },
    state: {
      pagination,
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    meta: {
      tempData,
      setTempData,
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
      updateTempData: (rowId: string, columnId: string, value: any) => {
        setTempData((old) => {
          const tempData = old.find((data) => data.rowId === rowId) || { rowId, data: {} };
          tempData.data[columnId] = value;
          return [...old.filter((data) => data.rowId !== rowId), tempData];
        });
      },
      getTempData: (rowId: string) => {
        return tempData.find((data) => data.rowId === rowId)?.data;
      },
      resetTempData: (rowId: string) => {
        setTempData((old) => old.filter((data) => data.rowId !== rowId));
      },
      deleteKeyFromTempData: (rowId: string, key: string) => {
        setTempData((old) => {
          const tempData = old.find((data) => data.rowId === rowId) || { rowId, data: {} };
          delete tempData.data[key];
          return [...old.filter((data) => data.rowId !== rowId), tempData];
        });
      },
      insertRow: () => {
        addRow();
      },
      removeRow: (rowId: string) => {
        deleteRow(rowId);
      }
    }
  })

  console.log("table", table)

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col justify-start">
        <DataTableToolbar table={table} />
      </div>
      <div className="rounded-md border w-[1352px] overflow-x-auto">
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
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucune donnée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
