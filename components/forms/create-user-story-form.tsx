"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

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
import { nativePriorityEnum } from "@/schemas/forms/user-story"
import { nativeComplexityEnum } from "@/schemas/forms/user-story"
import { nativeUserStoryStateEnum } from "@/schemas/forms/user-story"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useSelectedItemStore } from "../store/selectedItem"
import { US } from "@/app/model/projet"

export const CreateUserStoryForm = () => {
  const selectedItemState = useSelectedItemStore((state) => state);

  const form = useForm({
    resolver: zodResolver(createUserStoryFormSchema),
    defaultValues: {
      nom: "",
      description: "",
      priorite: "",
      us_etat: "",
      technologies: "",
      complexite: undefined,
      estimation_initiale: 0,
      date_range_estim: {
        from: new Date(),
        to: new Date(),
      },
      date_range_effective: {
        from: new Date(),
        to: new Date(),
      },
      commentaires: "",
    }
  })

  //TODO: add types
  const onSubmit = (data: any) => {
    console.log(selectedItemState)
    console.log(data)
    let editedItem = {
      nom: data.nom,
      description: data.description,
      id: "ID-US" ,
      priorite: data.priorite,
      statut: data.us_etat,
      technologies: data.technologies,
      complexite: data.complexite,
      estimation: data.estimation_initiale,
      datesEstimee: data.date_range_estim,
      datesEffectives: data.date_range_effective,
      children: [],
      type: "US"
    } as US
    selectedItemState.selectedItem.nom = editedItem.nom;
  }

  
  // For debug purposes
  //const { errors } = form.formState
  //console.log(errors)
  //const fields = form.watch()
  //console.log(fields)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Nom User Story" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description User Story" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priorite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priorité</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
          name="us_etat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>États des US</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un état pour l'US" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(nativeUserStoryStateEnum).map((item) => {
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
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technologies</FormLabel>
              <FormControl>
                <Input placeholder="Technologies utilisées" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="complexite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complexité</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un niveau de complexité" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(nativeComplexityEnum).map((item) => {
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
          name="estimation_initiale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimation Initiale</FormLabel>
              <FormControl>
                <Input placeholder="20 Points" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_range_estim"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de lancement et de fin estimée</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, "LLL dd, y")} -{" "}
                          {format(field.value.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(field.value.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_range_effective"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de lancement et fin effective</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value.from ? (
                      field.value.to ? (
                        <>
                          {format(field.value.from, "LLL dd, y")} -{" "}
                          {format(field.value.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(field.value.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
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
              <FormMessage />
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
          type="submit"
        >
          Créer US
        </Button>
      </form>
    </Form>
  )
}
