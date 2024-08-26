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
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "react-i18next"



export const SprintForm = ({projectId, sprintToEdit, setSprintList, closeForm}:{projectId: string, sprintToEdit: Sprint | undefined, setSprintList: any, closeForm: any}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createSprintFormSchema),
    defaultValues: sprintToEdit ? sprintToEdit : {
      name: "",
      description: "",
      state: undefined,
    },
  })

  const onSubmit = async (data: any) => {
    var sprintData: any = {
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
    response.json().then(async (newSprint) => {
      
      if (!response?.ok || newSprint == null) {
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

      closeForm();
    });
    
    sprintToEdit ? updateSprintToast(true) : postSprintToast(true);
  }

  const [displayCalendar, setDisplayCalendar] = React.useState(sprintToEdit?.state != nativeStateEnum.A_FAIRE);

  React.useEffect(() => {
    setDisplayCalendar(sprintToEdit?.state != nativeStateEnum.A_FAIRE);
  }, [sprintToEdit])


  return (
    <>
      <h1 className="font-bold mb-2">{sprintToEdit ? `${t("actions.modifier")} ${sprintToEdit.name}` : t("sprint.ajouterSprint") }</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="submitSprintForm"
          className="w-full overflow-y-auto"
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
                <FormLabel>{t("global.nom")} {createSprintFormSchema.shape['name'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder={t("sprint.nom")} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("global.description")} {createSprintFormSchema.shape['description'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Textarea
                    placeholder={t("sprint.description")}
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
                <FormLabel>{t("sprint.etat")} {createSprintFormSchema.shape['state'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <Select onValueChange={(value) => {
                  setDisplayCalendar(value != nativeStateEnum.A_FAIRE)
                  field.onChange(value)
                }}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("sprint.selectionnerEtat")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(nativeStateEnum).map((item) => {
                      return (
                        <SelectItem
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
        <Separator className="my-5"/>
         <div className="flex gap-2 mt-2"> 
          <Button
            type="submit"
            data-testid="SprintFormSubmitBtn"
            disabled={!form.formState.isValid}
          >
            {sprintToEdit ? t("actions.modifier") : t("actions.ajouter")}
          </Button>
         <Button variant={"outline"} onClick={closeForm}>{t("actions.annuler")}</Button>
          </div>
        </form>
      </Form>
    </>
  )
}
