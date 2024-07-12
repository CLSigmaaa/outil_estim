import { FileProperty } from "@/app/model/projet"
import * as React from "react"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"

export const FileCard = ({ fileProperty, onRemove }: {
  fileProperty: FileProperty,
  onRemove: () => void
}) => {
  return (
    <div className="flex items-center justify-between border border-slate-200 p-4 rounded-md overflow-hidden">
      <a
        href={fileProperty.url}
        download={fileProperty.nom}
        className="w-8/12 truncate "
      >
        <p className="truncate">{fileProperty.nom}</p>
      </a>
      <Button
        variant="destructive"
        onClick={onRemove}
        className="ml-4 flex-shrink-0"
        type="button"
      >
        <Trash2 />
      </Button>
    </div>
  )
}

