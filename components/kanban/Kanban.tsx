import React, { useCallback, useReducer } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useTreeStore } from "@/components/store/useTreeStore";
import ColonneKanban from "@/components/kanban/ColonneKanban";
import { nativeItemTypeEnum, nativeStateEnum } from "@/app/model/projet/itemEnum";

export default function Kanban({ isUSKanban }: { isUSKanban: boolean }) {
  const { selectedItem, editItemState } = useTreeStore();

  const itemType = isUSKanban ? nativeItemTypeEnum.Tache : nativeItemTypeEnum.US;

  const onDragEnd = useCallback((result: any) => {
    if (result.reason === "DROP") {
      if (!result.destination) {
        return;
      }
      editItemState(result.draggableId, result.destination.droppableId)
    }
  }, []);

  return (
    <div className="flex flex-row p-4 w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <ColonneKanban selectedItem={selectedItem} itemType={itemType} statut={nativeStateEnum.A_Faire} />
        <ColonneKanban selectedItem={selectedItem} itemType={itemType} statut={nativeStateEnum.En_Cours} />
        <ColonneKanban selectedItem={selectedItem} itemType={itemType} statut={nativeStateEnum.Terminee} />
      </DragDropContext>
    </div>
  );
};
