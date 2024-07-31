import React, { useCallback } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTreeStore } from "@/store/useTreeStore";
import { nativeStateEnum } from "@/app/model/projet/itemEnum";
import ColonneKanban from "./kanban-column";

export default function Kanban() {
  const { selectedItem, setSelectedItem, findItemInProject, editItemState } = useTreeStore();
  const [selectedItemsIds, setSelectedItemsIds] = React.useState<string[]>([])

  const onDragEnd = useCallback((result: any, itemsIds: string[]) => {
    if (result.reason === "DROP") {
      if (!result.destination || result.source.droppableId == result.destination.droppableId) {
        return;
      }
      if (itemsIds.length >= 2 && itemsIds.includes(result.draggableId)){
        itemsIds.forEach((itemId: string) => {
          editItemState(itemId, result.destination.droppableId)
        })
      } else {
        editItemState(result.draggableId, result.destination.droppableId)
      }
      if (selectedItem){
        setSelectedItem(findItemInProject(selectedItem.id ));
      }
    }
  }, []);

  return (
    <div className="flex flex-row w-full">
      <DragDropContext onDragEnd={(result) => onDragEnd(result, selectedItemsIds)}>
        <ColonneKanban selectedItem={selectedItem} statut={nativeStateEnum.A_Faire} selectedItemsIds={selectedItemsIds} setSelectedItemsIds={setSelectedItemsIds}/>
        <ColonneKanban selectedItem={selectedItem} statut={nativeStateEnum.En_Cours} selectedItemsIds={selectedItemsIds} setSelectedItemsIds={setSelectedItemsIds}/>
        <ColonneKanban selectedItem={selectedItem} statut={nativeStateEnum.Terminee} selectedItemsIds={selectedItemsIds} setSelectedItemsIds={setSelectedItemsIds}/>
      </DragDropContext>
    </div>
  );
};
