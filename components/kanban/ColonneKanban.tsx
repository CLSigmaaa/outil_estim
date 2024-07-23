import { US, Item } from "@/app/model/projet";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import Divider from "@mui/material/Divider";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useTreeStore } from "../store/useTreeStore";
import { nativeItemTypeEnum, nativeStateEnum } from "@/app/model/projet/itemEnum";


export default function ColonneKanban({
  selectedItem,
  statut,
}: {
  selectedItem: any;
  statut: nativeStateEnum;
}) {
  const styles = {
    dragger: `px-2 py-2 my-2 transition-colors duration-150 ease-in-out bg-white rounded-lg shadow hover:bg-gray-100`,
    dropper: "px-4 flex flex-col w-full h-96 overflow-auto",
    draggerContent: `flex justify-evenly items-center space-x-3 text-base`,
    draggerIcon: `inline-flex items-center justify-center rounded-full p-1.5 text-white bg-teal-100 text-teal-700`,
    dragging: `bg-gray-300`,
    dropOver: `bg-gray-100`,
  };

  const { addItem, getNewUS} = useTreeStore();

  function addItemInColum() {
    addItem(
      selectedItem.id,
      getNewUS(statut)
    );
  }

  function getAllChildren(item: Item): US[]{
    var acc: US[] = [];
    item?.children.forEach((child: Item) => {
      if (child.children && child.children.length > 0){
        acc = acc.concat(getAllChildren(child));
      } else if (child.type == nativeItemTypeEnum.US){
        acc.push(child as US);
      }
    })
    return acc
  }

  return (
    <div className="px-4 flex flex-col w-full">
    <div className="flex text-xl font-semibold justify-center">
              {statut}
            </div>
            <Divider />
            <button onClick={addItemInColum}>
              Ajouter une US
            </button>
    <Droppable droppableId={statut} type={nativeItemTypeEnum.US}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`${styles.dropper} ${snapshot.isDraggingOver ? styles.dropOver : ""
              }` }
          >
            
            {getAllChildren(selectedItem)
              .filter((item: US ) => item.statut == statut)
              .map((item: US , index: number) => {
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
                                <div className="overflow-hidden text-ellipsis leading-6 max-h-12">{item.nom}</div>
                              </div>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent>
                            
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
