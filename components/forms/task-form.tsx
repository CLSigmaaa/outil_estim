"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

import { toast } from "@/components/ui/use-toast"

import {
  Form,
  FormControl,
  FormDescription,
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
import { Task, TaskData } from "@/app/model/projet"
import { getSprint, getTask, postTask, updateTask } from "@/components/utils/api"
import { getSprintToast, getTaskToast, postTaskToast, updateTaskToast } from "@/components/utils/toasts"


export const TaskForm = ({taskToEdit, setTaskList, closeForm, projectId, sprintId }:{taskToEdit: Task | undefined, setTaskList: any, closeForm: any, projectId: string, sprintId: string}) => {
  const form = useForm({
    resolver: zodResolver(createTaskFormSchema),
    defaultValues: taskToEdit ? taskToEdit : {
      name: "",
      description: "",
      priority: undefined,
      state: undefined,
    },
  })

    
    

  const onSubmit = async (data: any) => {
    var taskData: TaskData = {
      name: data.name,
      description: data.description,
      priority: data.priority,
      state: data.state,
      estimationList: [],
      effectiveDates: { from: new Date(), to: new Date() },
      type: nativeItemTypeEnum.TASK,
    }
    var response = taskToEdit ? await updateTask(projectId, sprintId, taskToEdit.id, taskData) : await postTask(projectId, sprintId, taskData);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      taskToEdit ? updateTaskToast(false) : postTaskToast(false);
      return;
    }
    response.json().then(async (newTask) => { // UpdateTask return the updated task and postTask return the sprint
      
      if (newTask == null) {
        taskToEdit ? updateTaskToast(false) : postTaskToast(false);
        return;
      }
      response = await getSprint(projectId, sprintId);
      if (response == undefined) {
        return;
      }
      if (!response.ok) {
        getTaskToast(false);
        return;
      }
      response.json().then((updatedSprint) => {
        setTaskList(updatedSprint.tasks);
        taskToEdit ? updateTaskToast(true) : postTaskToast(true);
      });

      
      closeForm();
    });
    
    updateTaskToast(true);
  }

  // function resetform() {
  //   form.reset({
  //     name: selectedItem.nom,
  //     id: selectedItem.id,
  //     description: selectedItem.description,
  //     priorite: selectedItem.priorite,
  //     statut: selectedItem.statut,
  //     datesEffectives: {
  //       from: selectedItem.datesEffectives.from,
  //       to: selectedItem.datesEffectives.to,
  //     },
  //     version: selectedItem.version,
  //     estimation_initiale: selectedItem.estimation || 0,
  //     commentaires: selectedItem.commentaires,
  //   })
  // }

  const [displayCalendar, setDisplayCalendar] = React.useState(taskToEdit?.state != nativeStateEnum.A_FAIRE);

  React.useEffect(() => {
    // resetform(); 
    setDisplayCalendar(taskToEdit?.state != nativeStateEnum.A_FAIRE);
  }, [taskToEdit])


  return (
    <>
      <h1 className="font-bold mb-2 p-1">{taskToEdit ? `Informations sur ${taskToEdit.name}` : "Ajouter une tâche" }</h1>
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
                <FormLabel>Nom {createTaskFormSchema.shape['name'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder="Nom tâche" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description {createTaskFormSchema.shape['description'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Textarea
                    placeholder="Description de la tâche"
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
                <FormLabel>Priorité {createTaskFormSchema.shape['priority'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une priorité" />
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
                <FormLabel>État des US {createTaskFormSchema.shape['state'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <Select onValueChange={(value) => {
                  setDisplayCalendar(value != nativeStateEnum.A_FAIRE)
                  field.onChange(value)
                }}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un état pour la tâche" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(nativeStateEnum).map((item) => {
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
              </FormItem>
            )}
          />
          {/* {displayCalendar ?
            <FormField
              control={form.control}
              name="datesEffectives"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date de lancement et de fin estimée</FormLabel>
                  <FormMessage />
                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value.from && "text-muted-foreground"
                        )}
                        aria-label="dateLancementEstimee"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value.from ? (
                          field.value.to ? (
                            <div aria-label="dateLancementEstimeeFull">
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </div>
                          ) : (
                            <div aria-label="dateLancementEstimeeStart">
                              {format(field.value.from, "LLL dd, y")}
                            </div>
                          )
                        ) : (
                          <span aria-label="dateLancementEstimeeEmpty">Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={field.value.from}
                        selected={{
                          from: field.value.from!,
                          to: field.value.to,
                        }}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            /> : ""} */}
         
         <Button className="mt-2" onClick={closeForm}>Annuler</Button>
          <Button
            className="mt-2"
            type="submit"
            data-testid="TaskFormSubmitBtn"
            disabled={!form.formState.isValid}
          >
            {taskToEdit ? "Modifier" : "Ajouter"}
          </Button>
        </form>
      </Form>
    </>
  )
}
