import { Task, Item } from "@/app/model/projet";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import Divider from "@mui/material/Divider";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useTreeStore } from "../../store/useTreeStore";
import { TaskEstimForm } from "@/components/forms/create-us-estim-form";
import { nativeItemTypeEnum, nativeStateEnum } from "@/app/model/projet/itemEnum";
import React from "react";
import { Button } from "@/components/ui/button";



export default function ColonneKanban({
  selectedItem,
  selectedItemsIds,
  setSelectedItemsIds,
  statut,
}: {
  selectedItem: any;
  selectedItemsIds: string[],
  setSelectedItemsIds: React.Dispatch<React.SetStateAction<string[]>>,
  statut: nativeStateEnum;
}) {
  const styles = {
    dragger: `px-2 py-2 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg filter drop-shadow-usCard hover:bg-gray-100`,
    dropper: "px-4 flex flex-col w-full h-full overflow-auto rounded",
    draggerContent: `flex justify-evenly items-center space-x-3 text-base`,
    draggerIcon: `inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700`,
    dragging: `bg-gray-300`,
    dropOver: `bg-gray-100`,
    selected: `border border-black`,
  };

  const { addItem, getNewUS } = useTreeStore();

  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

  const primaryButton = 0;

  function addItemInColumn() {
    addItem(
      selectedItem.id,
      getNewUS(statut)
    );
  }

  function getAllChildren(item: Item): Task[] {
    var acc: Task[] = [];
    item?.children.forEach((child: Item) => {
      if (child.children && child.children.length > 0) {
        acc = acc.concat(getAllChildren(child));
      } else if (child.type == nativeItemTypeEnum.Task) {
        acc.push(child as Task);
      }
    })
    return acc
  }
  // Inspired by https://github.com/hello-pangea/dnd/blob/main/docs/patterns/multi-drag.md
  function selectUS(event: MouseEvent, item: Item) {
    if (event.defaultPrevented || event.button !== primaryButton) {
      return;
    }
    performAction(event, item);
  };

  function wasPressingMultiSelectKey(event: MouseEvent | KeyboardEvent) {
    const isUsingWindows = navigator.platform.indexOf('Win') >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  function toggleSelectionInGroup(ItemId: string): void {
    const itemIds: string[] = selectedItemsIds;
    const index: number = itemIds.indexOf(ItemId);

    // Ajoute l'item s'il n'est pas déjà sélectionné
    if (index === -1) {
      setSelectedItemsIds([...itemIds, ItemId]);
      return;
    }

    // Enlève l'item si déjà sélectionné
    const shallow: string[] = [...itemIds];
    shallow.splice(index, 1);
    setSelectedItemsIds(shallow);
  };

  function performAction(event: MouseEvent | KeyboardEvent, item: Item) {
    if (wasPressingMultiSelectKey(event)) {
      event.preventDefault(); // Empêche le délenchement du PopOver
      toggleSelectionInGroup(item.id);
      return;
    }
    setSelectedItemsIds([]);
  };
  // Inspired by https://github.com/hello-pangea/dnd/blob/main/docs/patterns/multi-drag.md

  return (
    <div className="px-4 flex flex-col w-full max-h-96">
      <div className="flex text-xl font-semibold justify-center mb-2">
        {statut}
      </div>
      <Divider />
      <Button variant="outline" className="mt-2 mb-2" onClick={addItemInColumn}>
        Ajouter une US
      </Button>
      <Droppable droppableId={statut} type={nativeItemTypeEnum.Task}>
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${styles.dropper} ${snapshot.isDraggingOver ? styles.dropOver : ""
                } bg-neutral-100`}
            >
              {getAllChildren(selectedItem)
                .filter((item: Task) => item.statut == statut)
                .map((item: Task, index: number) => {
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => {
                        return (
                          <Popover >
                            <PopoverTrigger>
                              <div
                                className={`${styles.dragger} ${snapshot.isDragging ? styles.dragging : ""
                                  } ${selectedItemsIds.includes(item.id) ? styles.selected : ""}`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                onClick={(event: MouseEvent) => selectUS(event, item)}
                              >
                                <div className={styles.draggerContent}>
                                  <div className="font-medium overflow-hidden text-ellipsis leading-6 max-h-12">{item.nom}</div>
                                </div>
                              </div>
                            </PopoverTrigger>
                            <PopoverContent className="max-w-[20rem] z-10">
                              <TaskEstimForm defaultValues={item} popoverClose={setIsPopoverOpen} />
                            </PopoverContent>
                          </Popover>
                        );
                      }}
                    </Draggable>
                  );
                })}

              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
