"use client"
import { CreateUserStoryForm } from "./forms/create-user-story-form"
import { useTreeStore } from "./store/useTreeStore"

export const RightPanel = () => {
  const { selectedItem } = useTreeStore();
  return (
    <div className="border-gray-300 border border-t-0 flex w-3/12 p-4 justify-center">
      {selectedItem ? (
        <CreateUserStoryForm />
      ): ""}
    </div>
  )
}
