"use client"
import { CreateEnsembleForm } from "./forms/create-ensemble-form"
import { CreateUserStoryForm } from "./forms/create-user-story-form"
import { useTreeStore } from "./store/useTreeStore"

export const RightPanel = () => {
  const { selectedItem } = useTreeStore();
  return (
    <div className="border-gray-300 border border-t-0 flex w-3/12 py-4 justify-center">
      {selectedItem == undefined ? "Sélectionnez un élément de l'aborescence" :
        <div>
          {selectedItem.type == "US" && <CreateUserStoryForm defaultValues={selectedItem} />}
          {selectedItem.type == "Ensemble" && <CreateEnsembleForm defaultValues={selectedItem} />}
          {selectedItem.type == "Sprint" && "Sprint"}
        </div>
      }

    </div>
  )
}
