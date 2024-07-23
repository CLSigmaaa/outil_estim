import React, { useCallback } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTreeStore } from "@/components/store/useTreeStore";
import ColonneKanban from "@/components/kanban/ColonneKanban";
import { nativeStateEnum } from "@/app/model/projet/itemEnum";

export default function Kanban() {
  const { selectedItem, setSelectedItem, findItemInProject, editItemState } = useTreeStore();

  const onDragEnd = useCallback((result: any) => {
    if (result.reason === "DROP") {
      if (!result.destination || result.source.droppableId == result.destination.droppableId) {
        return;
      }

      editItemState(result.draggableId, result.destination.droppableId)
      if (selectedItem){
        setSelectedItem(findItemInProject(selectedItem.id ));
      }
    }
  }, []);

  return (
    <div className="flex flex-row w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <ColonneKanban selectedItem={selectedItem} statut={nativeStateEnum.A_Faire} />
        <ColonneKanban selectedItem={selectedItem} statut={nativeStateEnum.En_Cours} />
        <ColonneKanban selectedItem={selectedItem} statut={nativeStateEnum.Terminee} />
      </DragDropContext>
    </div>
  );
};
