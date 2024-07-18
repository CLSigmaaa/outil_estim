import { US, Item, Tache } from "@/app/model/projet";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import Divider from "@mui/material/Divider";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useTreeStore } from "../store/useTreeStore";
import { CreateTacheForm } from "../forms/create-tache-form";
import { nativeItemTypeEnum } from "@/app/model/projet/itemEnum";
export default function ColonneKanban({
  selectedItem,
  statut,
  itemType,
}: {
  selectedItem: any;
  statut: string;
  itemType: string;
}) {
  const styles = {
    dragger: `px-4 py-4 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100`,
    dropper: "px-4 flex flex-col w-full h-full",
    draggerContent: `flex flex-col items-center space-x-3 text-base`,
    draggerIcon: `inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700`,
    dragging: `bg-gray-300`,
    dropOver: `bg-gray-100`,
  };

  const { addItem, getNewUS, getNewTache } = useTreeStore();

  function addItemInColum() {
    addItem(
      selectedItem.id,
      itemType == nativeItemTypeEnum.US ? getNewUS(statut) : getNewTache(statut)
    );
  }
  return (
    <div className="px-4 flex flex-col w-full ">
    <div className="flex text-xl font-semibold justify-center">
              {statut}
            </div>
            <Divider />
            <button onClick={addItemInColum}>
              Ajouter une {itemType.toLowerCase()}
            </button>
    <Droppable droppableId={statut} type={itemType}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.dropper} ${snapshot.isDraggingOver ? styles.dropOver : ""
              }` }
          >
            
            {selectedItem.children
              .filter((item: US | Tache) => item.statut == statut)
              .map((item: US | Tache, index: number) => {
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <Popover>
                          <PopoverTrigger>
                            <div
                              className={`${styles.dragger} ${snapshot.isDragging ? styles.dragging : ""
                                }`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className={styles.draggerContent}>
                                <div className="font-semibold">{item.nom}</div>
                                <div>{item.description}</div>
                              </div>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent>
                            {itemType == nativeItemTypeEnum.Tache ? <CreateTacheForm defaultValues={item} /> : ""}
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
