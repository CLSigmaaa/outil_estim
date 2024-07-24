"use client"
import { nativeItemTypeEnum } from "@/app/model/projet/itemEnum"
import { CreateEnsembleForm } from "./forms/create-ensemble-form"
import { CreateSprintForm } from "./forms/create-sprint-form"
import { CreateUserStoryForm } from "./forms/create-user-story-form"
import { useTreeStore } from "./store/useTreeStore"


import { Grip } from 'lucide-react';

export const RightPanel = () => {
  const { selectedItem } = useTreeStore();

  interface EditForm {
    [nativeItemTypeEnum.US]: JSX.Element;
    [nativeItemTypeEnum.Ensemble]: JSX.Element;
    [nativeItemTypeEnum.Sprint]: JSX.Element;
  }

  const editForm: EditForm = {
    [nativeItemTypeEnum.US]: <CreateUserStoryForm defaultValues={selectedItem} />,
    [nativeItemTypeEnum.Ensemble]: <CreateEnsembleForm defaultValues={selectedItem} />,
    [nativeItemTypeEnum.Sprint]: <CreateSprintForm defaultValues={selectedItem} />
  }
  return (
    <div className="border-gray-300 border-0 p-5 overflow-y-auto">
      {selectedItem == undefined ? "Sélectionnez un élément de l'aborescence" :
        <div>
          {editForm[selectedItem.type as keyof EditForm]}
        </div>
      }
    </div>
  )
}
