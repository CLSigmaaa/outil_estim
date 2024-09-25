"use client"

import { Trash2 } from "lucide-react"

import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

import { useState } from "react"

import { Table } from "@tanstack/react-table"
import { TData } from "./data-table"


export const ConfirmDeleteRow = ({ onDelete, rowId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleDelete = () => {
    onDelete(rowId)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="destructive">
          <Trash2 size={18} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-2 text-sm">Are you sure you want to delete this row?</div>
        <div className="flex justify-start gap-2 p-2">
          <Button variant="secondary" onClick={handleDelete}>Yes</Button>
          <Button onClick={() => setIsOpen(false)}>No</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
