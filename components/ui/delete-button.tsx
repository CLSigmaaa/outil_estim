import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export const DeleteItemButton = ({ text, handleClick, className }: { text: string, handleClick: any, className?: string }) => {
    const { t } = useTranslation();
    const [isPopOverOpen, setIsPopOverOpen] = React.useState(false);
  
    return (
      <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
        <PopoverTrigger className={cn(
          "cursor-pointer flex items-center gap-2 p-2 border rounded w-fit", className
        )}>
          <Trash2
            size={24}
            className={cn(
              "font-light text-red-700",
            )} />
            {text ? <p className="font-semibold text-red-700">{text}</p> : ""}
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-y-2">
          <span className="font-medium">{t("actions.supprimer.confirmation")}</span>
          <div className="flex gap-x-2">
            <Button
            variant={"destructive"}
              onClick={handleClick}
            >
              {t("global.oui")}
            </Button>
            <Button
              onClick={() => setIsPopOverOpen(false)}
            >
              {t("actions.supprimer.nePasSupprimer")}
            </Button>
          </div>
        </PopoverContent>
      </Popover >
    )
  }