"use client"
import { CreateEnsembleForm } from "./forms/create-ensemble-form"
import { CreateSprintForm } from "./forms/create-sprint-form"
import { CreateUserStoryForm } from "./forms/create-user-story-form"
import { useTreeStore } from "./store/useTreeStore"

export const RightPanel = () => {
  const { selectedItem } = useTreeStore();

  interface EditForm {
    US: JSX.Element;
    Ensemble: JSX.Element;
    Sprint: JSX.Element;
  }

  const editForm:EditForm = {
    US:  <CreateUserStoryForm defaultValues={selectedItem} />,
    Ensemble: <CreateEnsembleForm defaultValues={selectedItem} />,
    Sprint: <CreateSprintForm defaultValues={selectedItem}/>
  }
  return (
    <div className="border-gray-300 border border-t-0 flex w-3/12 py-4 justify-center">
      {selectedItem == undefined ? "Sélectionnez un élément de l'aborescence" :
        <div>
          {editForm[selectedItem.type as keyof EditForm]}
        </div>
      }

    </div>
  )
}
