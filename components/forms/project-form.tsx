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
import { Project, Sprint, SprintData } from "@/app/model/projet"
import { getProject, getProjects, postProject, postSprint, updateProject, updateSprint, } from "@/components/utils/api"
import { createSprintFormSchema } from "@/schemas/forms/sprint"
import {  getProjectToast, getSprintToast, postProjectToast, postSprintToast, updateProjectToast, updateSprintToast } from "@/components/utils/toasts"
import { Separator } from "@/components/ui/separator"
import { createProjectFormSchema } from "@/schemas/forms/project"
import { useTranslation } from "react-i18next"



export const ProjectForm = ({projectToEdit, setProjectList, closeForm}:{projectToEdit: Project | undefined, setProjectList: Function, closeForm: Function}) => {
  const { t } = useTranslation();
  const form = useForm({
    resolver: zodResolver(createProjectFormSchema),
    defaultValues: projectToEdit ? projectToEdit : {
      name: "",
      description: "",
    },
  })

    
    

  const onSubmit = async (data: any) => {
    var projectData: any = {
      name: data.name,
      description: data.description,
    }
    var response = projectToEdit ? await updateProject(projectToEdit.id, projectData) : await postProject(projectData);
    if (response == undefined) {
      return;
    }
    if (!response.ok) {
      projectToEdit ? updateProjectToast(false) : postProjectToast(false);
      return;
    }
    response.json().then(async (newProject) => {
      
      if (!response?.ok || newProject == null) {
        projectToEdit ? updateProjectToast(false) : postProjectToast(false);
        return;
      }
      response = await getProjects();
      if (response == undefined) {
        return;
      }
      if (!response.ok) {
        getSprintToast(false);
        return;
      }
      response.json().then((updatedProjects) => {
        setProjectList(updatedProjects);
      });

      closeForm();
    });
    
    projectToEdit ? updateProjectToast(true) : postProjectToast(true);
  }

  return (
    <>
      <h1 className="font-bold mb-2">{projectToEdit ? `${t("actions.modifier")} ${projectToEdit.name}` : t("projet.ajouterProjet") }</h1>
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
                  <Input placeholder={t("projet.nom")} {...field} />
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
                    placeholder={t("projet.description")}
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        <Separator className="my-5"/>
         <div className="flex gap-2 mt-2"> 
         <Button variant={"outline"} onClick={closeForm as React.MouseEventHandler<HTMLButtonElement>}>Annuler</Button>
          <Button
            type="submit"
            data-testid="ProjectFormSubmitBtn"
            disabled={!form.formState.isValid}
          >
            {projectToEdit ? t("actions.modifier") : t("actions.ajouter")}
          </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
