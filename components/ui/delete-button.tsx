import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

export const DeleteItemButton = ({ handleClick }: { handleClick: any }) => {
    const [isPopOverOpen, setIsPopOverOpen] = React.useState(false);
  
    return (
      <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
        <PopoverTrigger className={cn(
          "cursor-pointer flex items-center justify-between"
        )}>
          <Trash2
            size={24}
            className={cn(
              "font-light text-red-700",
            )} />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-y-2">
          <span className="font-medium">Êtes-vous sûr de vouloir supprimer cet élément ?</span>
          <div className="flex gap-x-2">
            <Button
              onClick={handleClick}
            >
              Oui
            </Button>
            <Button
              onClick={() => setIsPopOverOpen(false)}
            >
              Non, ne pas supprimer
            </Button>
          </div>
        </PopoverContent>
      </Popover >
    )
  }