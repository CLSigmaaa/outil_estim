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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Sprint } from "@/app/model/projet"
import { useTreeStore } from "@/components/store/useTreeStore"
import { createSprintFormSchema } from "@/schemas/forms/sprint"
import { nativeItemTypeEnum, nativeStateEnum } from "@/app/model/projet/itemEnum"

export const CreateSprintForm = ({ defaultValues }: { defaultValues: Sprint }) => {

  const { selectedItem, editItem, setSelectedItem } = useTreeStore(); // Ajout de editItem


  const form = useForm({
    resolver: zodResolver(createSprintFormSchema),
    defaultValues: {
      nom: defaultValues.nom,
      description: defaultValues.description,
      statut: defaultValues.statut,
      date_range_effective: {
        from: new Date(),
        to: new Date(),
      },
      commentaires: defaultValues.commentaires,
    },
  })
  
  //TODO: add types
  const onSubmit = (data: any) => {
    var editedItem = {
      ...selectedItem,
      nom: data.nom,
      description: data.description,
      statut: data.statut,
      commentaires: data.commentaires,
      datesEffectives: datesEffectives,
    } as Sprint;
    setSelectedItem(undefined)
    editItem(editedItem.id, editedItem)
  }

  function resetform() {
    form.reset({
      nom: selectedItem.nom,
      description: selectedItem.description,
      statut: selectedItem.statut,
      date_range_effective: {
        from: selectedItem.datesEffectives.from,
        to: selectedItem.datesEffectives.to,
      },
      commentaires: selectedItem.commentaires,
    })
  }

  React.useEffect(resetform, [defaultValues])

  // For debug purposes
  //const { errors } = form.formState
  //console.log(errors)
  //const fields = form.watch()
  //console.log(fields)

  return (
    <>
    <h1 className="font-bold mb-2">Informations sur {defaultValues.nom}</h1>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full overflow-y-auto px-1">
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
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
              <FormLabel>Description</FormLabel>
              <FormMessage />
              <FormControl>
              <Textarea
                   placeholder="Description du Sprint"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="statut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>État du Sprint</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un état pour le Sprint" />
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
          name="commentaires"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commentaires</FormLabel>
              <FormMessage />
              <FormControl>
                <Textarea
                  placeholder="Cette US est mal estimée car ..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          name="submitSprintForm"
        >
          Modifier Sprint
        </Button>
      </form>
    </Form>
  </>
  )
}
