"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "@/components/ui/textarea"

import { createTaskFormSchema } from "@/schemas/forms/task"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { nativeItemTypeEnum, nativePriorityEnum, nativeStateEnum } from "@/app/model/projet/itemEnum"
import { Sprint, Tag, Task, TaskData } from "@/app/model/projet"
import { postTask, updateTask } from "@/components/utils/api"
import { getSprintToast, postTaskToast, updateTaskToast } from "@/components/utils/toasts"
import { Checkbox } from "@/components/ui/checkbox"
import { addTagsToTask, assignTaskUtil } from "@/components/utils/taskListUtil"
import { useProjectStore } from "@/store/useProjectStore"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "react-i18next"
import { TagComboBoxResponsive } from "@/components/ui/tag-combobox"


export const TaskForm = ({taskToEdit, closeForm, projectId, userId, sprint, updateSprintInfos }:{taskToEdit: Task | undefined, closeForm: Function, projectId: string, userId: string, sprint: Sprint | undefined, updateSprintInfos: Function}) => {
  const { t } = useTranslation();
  const { setSelectedSprint } = useProjectStore();
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>(taskToEdit ? taskToEdit.tags : []);
  
  const form = useForm({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: taskToEdit ? {...taskToEdit, assignTask: false} : {
      name: "",
      description: "",
      priority: undefined,
      state: undefined,
      assignTask: false,
      tags:[]
    },
  })

  const onSubmit = async (data: any) => {
    if (sprint == undefined) {
      getSprintToast(false);
      return;
    }
    var taskData: TaskData = {
      name: data.name,
      description: data.description,
      priority: data.priority,
      state: data.state,
      estimationList: [],
      effectiveDates: { from: new Date(), to: new Date() },
      type: nativeItemTypeEnum.TASK,
    }
    var response = taskToEdit ? await updateTask(projectId, sprint.id, taskToEdit.id, taskData) : await postTask(projectId, sprint.id, taskData);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      taskToEdit ? updateTaskToast(false) : postTaskToast(false);
      return;
    }
    response.json().then(async (newTask) => { 
      
      if (newTask == null) {
        taskToEdit ? updateTaskToast(false) : postTaskToast(false);
        return;
      }
      if (data.assignTask) {
        await assignTaskUtil(projectId, sprint.id, newTask.id, userId, setSelectedSprint);
      }
      if (selectedTags.length != 0) {
        await addTagsToTask(selectedTags, newTask.id);
      }

      updateSprintInfos();
      taskToEdit ? updateTaskToast(true) : postTaskToast(true);
      closeForm();
    });
    
    updateTaskToast(true);
  }

  React.useEffect(() => {
  }, [taskToEdit])


  return (
    <>
    <div className="flex">
      <div className="w-1/2">
      <h1 className="font-bold mb-2 p-1">{taskToEdit ? `${t("actions.modifier")} ${taskToEdit.name}` : t("tache.ajouterTache") }</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="submitTaskForm"
          className="w-full overflow-y-auto px-1"
        >
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("global.nom")} {createTaskFormSchema.shape['name'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder={t("tache.nom")} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("global.description")} {createTaskFormSchema.shape['description'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Textarea
                    placeholder={t("tache.description")}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("global.priorite")} {createTaskFormSchema.shape['priority'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("actions.selectionnerPriorite")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(nativePriorityEnum).map((item) => {
                      return (
                        <SelectItem
                          key={item}
                          value={item}>
                          {item}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("tache.etat")} {createTaskFormSchema.shape['state'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger defaultValue={nativeStateEnum.A_FAIRE}>
                      <SelectValue placeholder={t("tache.selectionnerEtat")}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(nativeStateEnum).map((item) => {
                      return (
                        <SelectItem
                        defaultChecked={item == nativeStateEnum.A_FAIRE}
                          key={item}
                          value={item}>
                          <div className={item == nativeStateEnum.EN_COURS ? "text-red-600" : (item == nativeStateEnum.TERMINEE ? "text-green-600" : "")}>{item}</div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
            <TagComboBoxResponsive
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          {taskToEdit ? "" :<FormField
          control={form.control}
          name="assignTask"
          render={({ field }) => (
            <FormItem className="flex gap-2 ml-1 mt-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                {t("tache.sAffecterTache")}
                </FormLabel>
              </div>
            </FormItem>
          )}
        /> }
        <Separator className="my-5"/>
        <div className="flex gap-2 mt-2">
          <Button
            type="submit"
            data-testid="TaskFormSubmitBtn"
            disabled={!form.formState.isValid}
          >
            {taskToEdit ? t("actions.modifier") : t("actions.ajouter")}
          </Button>
        <Button variant={"outline"} onClick={closeForm as React.MouseEventHandler<HTMLButtonElement>}>Annuler</Button>
          </div>
        </form>
      </Form>
      </div>
      
      </div>
    </>
  )
}
