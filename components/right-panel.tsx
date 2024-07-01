"use client"
import { CreateUserStoryForm } from "./forms/create-user-story-form"

export const RightPanel = () => {
  return (
    <div className="border-gray-300 border border-t-0 flex w-3/12 py-4 justify-center">
      <CreateUserStoryForm />
    </div>
  )
}
