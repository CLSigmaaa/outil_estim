"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import upload from "@/actions/upload"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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

import { createUserStoryFormSchema } from "@/schemas/forms/user-story"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { US } from "@/app/model/projet"
import { useTreeStore } from "@/components/store/useTreeStore"

import { nativePriorityEnum, nativeStateEnum, nativeMasteryEnum } from "@/app/model/projet/itemEnum"

const testHandle = (event: any, onChange: any) => {
  console.log(event.target.files && event.target.files[0])
  onChange(event.target.files && event.target.files[0])
}

export const CreateUserStoryForm = ({ defaultValues }: { defaultValues: US }) => {

  const { selectedItem, editItem, setSelectedItem } = useTreeStore(); // Ajout de editItem
  const form = useForm({
    resolver: zodResolver(createUserStoryFormSchema),
    defaultValues: {
      nom: defaultValues.nom,
      id: defaultValues.id,
      description: defaultValues.description,
      priorite: defaultValues.priorite,
      statut: defaultValues.statut,
      version: defaultValues.version,
      estimation_initiale: defaultValues.estimation || 0,
      commentaires: defaultValues.commentaires,
    },
  })


  const onSubmit = async (data: any) => {
    const formData = new FormData();
    
    formData.append("nom", data.nom);
    formData.append("id", data.id);
    
    const editedItem: US = {
      ...selectedItem,
      nom: data.nom,
      description: data.description,
      priorite: data.priorite,
      statut: data.statut,
      version: data.version,
      estimation: data.estimation_initiale,
      commentaires: data.commentaires,
    };
    setSelectedItem(undefined)
    editItem(editedItem.id, editedItem)

  }

  function resetform() {
    form.reset({
      nom: selectedItem.nom,
      id: selectedItem.id,
      description: selectedItem.description,
      priorite: selectedItem.priorite,
      statut: selectedItem.statut,
      version: selectedItem.version,
      estimation_initiale: selectedItem.estimation || 0,
      commentaires: selectedItem.commentaires,
    })
  }

  React.useEffect(resetform, [defaultValues])

  return (
    <>
      <h1 className="font-bold mb-2 p-1">Informations sur {defaultValues.nom}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="submitUSForm"
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
            name="nom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom {createUserStoryFormSchema.shape['nom'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder="Nom User Story" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description {createUserStoryFormSchema.shape['description'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Textarea
                      placeholder="Description de l'User Story"
                      className="resize-none"
                      {...field}
                    />
              </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priorite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priorité {createUserStoryFormSchema.shape['priorite'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une priorité" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(nativePriorityEnum).map((item) => {
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
            name="statut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>État des US {createUserStoryFormSchema.shape['statut'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un état pour l'US" />
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
          <FormField
            control={form.control}
            name="estimation_initiale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimation Initiale {createUserStoryFormSchema.shape['estimation_initiale'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder="20 Points" type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Version {createUserStoryFormSchema.shape['version'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder="Version cible" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="commentaires"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commentaires</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cette US est mal estimée car ..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="mt-2"
            type="submit"
            data-testid="USFormSubmitBtn"
          >
            Modifier US
          </Button>
        </form>
      </Form>
    </>
  )
}
