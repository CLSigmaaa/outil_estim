"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"

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



import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { nativeItemTypeEnum, nativeStateEnum } from "@/app/model/projet/itemEnum"
import { Sprint, SprintData } from "@/app/model/projet"
import { getProject, postSprint, updateSprint, } from "@/components/utils/api"
import { createSprintFormSchema } from "@/schemas/forms/sprint"
import {  getProjectToast, getSprintToast, postSprintToast, updateSprintToast } from "@/components/utils/toasts"



export const SprintForm = ({projectId, sprintToEdit, setSprintList, closeForm}:{projectId: string, sprintToEdit: Sprint | undefined, setSprintList: any, closeForm: any}) => {
  const form = useForm({
    resolver: zodResolver(createSprintFormSchema),
    defaultValues: sprintToEdit ? sprintToEdit : {
      name: "",
      description: "",
      state: undefined,
    },
  })

    
    

  const onSubmit = async (data: any) => {
    var sprintData: SprintData = {
      name: data.name,
      description: data.description,
      state: data.state,
      type: nativeItemTypeEnum.SPRINT,
    }
    var response = sprintToEdit ? await updateSprint(projectId, sprintToEdit.id, sprintData) : await postSprint(projectId, sprintData);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      sprintToEdit ? updateSprintToast(false) : postSprintToast(false);
      return;
    }
    response.json().then(async (newSprint) => { // UpdateSprint return the updated Sprint and postSprint return the sprint
      
      if (!response.ok || newSprint == null) {
        sprintToEdit ? updateSprintToast(false) : postSprintToast(false);
        return;
      }
      response = await getProject(projectId);
      if (response == undefined) {
        return;
      }
      if (!response.ok) {
        getSprintToast(false);
        return;
      }
      response.json().then((updatedProject) => {
        setSprintList(updatedProject.sprints);
      });

      // setSprintList((prev: Sprint[]) => [...prev, newSprint]);
      closeForm();
    });
    
    sprintToEdit ? updateSprintToast(true) : postSprintToast(true);
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

  const [displayCalendar, setDisplayCalendar] = React.useState(sprintToEdit?.state != nativeStateEnum.A_FAIRE);

  React.useEffect(() => {
    // resetform(); 
    setDisplayCalendar(sprintToEdit?.state != nativeStateEnum.A_FAIRE);
  }, [sprintToEdit])


  return (
    <>
      <h1 className="font-bold mb-2 p-1">{sprintToEdit ? `Modifier ${sprintToEdit.name}` : "Ajouter un sprint" }</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="submitSprintForm"
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
                <FormLabel>Nom {createSprintFormSchema.shape['name'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder="Nom du sprint" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description {createSprintFormSchema.shape['description'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Textarea
                    placeholder="Description du sprint"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>État du sprint {createSprintFormSchema.shape['state'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <Select onValueChange={(value) => {
                  setDisplayCalendar(value != nativeStateEnum.A_FAIRE)
                  field.onChange(value)
                }}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un état pour le sprint" />
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
            data-testid="SprintFormSubmitBtn"
            disabled={!form.formState.isValid}
          >
            {sprintToEdit ? "Modifier" : "Ajouter"}
          </Button>
        </form>
      </Form>
    </>
  )
}
