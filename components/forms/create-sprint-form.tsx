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
import { Sprint, US } from "@/app/model/projet"
import { useTreeStore } from "@/components/store/useTreeStore"
import { createSprintFormSchema } from "@/schemas/forms/sprint"

export const CreateSprintForm = ({ defaultValues }: { defaultValues: Sprint }) => {

  const { selectedItem, editItem, setSelectedItem } = useTreeStore(); // Ajout de editItem


  const form = useForm({
    resolver: zodResolver(createSprintFormSchema),
    defaultValues: {
      nom: defaultValues.nom,
      description: defaultValues.description,
      us_etat: defaultValues.statut,
      date_range_estim: {
        from: new Date(),
        to: new Date(),
      },
      date_range_effective: {
        from: new Date(),
        to: new Date(),
      },
      commentaires: defaultValues.commentaires,
    },
  })

  //TODO: add types
  const onSubmit = (data: any) => {
    let editedItem = {
      nom: data.nom,
      description: data.description,
      id: selectedItem.id,
      statut: data.us_etat,
      datesEstimee: data.date_range_estim,
      datesEffectives: data.date_range_effective,
      children: selectedItem.children,
      commentaires: data.commentaires,
      type: "Sprint"
    } as Sprint;
    setSelectedItem(undefined)
    editItem(editedItem.id, editedItem)
  }

  function resetform() {
    form.reset({
      nom: selectedItem.nom,
      description: selectedItem.description,
      us_etat: selectedItem.statut,
      date_range_estim: {
        from: selectedItem.datesEstimee.from,
        to: selectedItem.datesEstimee.to,
      },
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <Input placeholder="Description User Story" {...field} />
              </FormControl>
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
              <Select onValueChange={field.onChange} value={field.value}>
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
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date_range_estim"
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
        />
        <FormField
          control={form.control}
          name="date_range_effective"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de lancement et fin effective</FormLabel>
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
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value.from ? (
                      field.value.to ? (
                        <div aria-label="dateLancementEffectiveFull">
                          {format(field.value.from, "LLL dd, y")} -{" "}
                          {format(field.value.to, "LLL dd, y")}
                        </div>
                      ) : (
                        <div aria-label="dateLancementEffectiveStart">
                          {format(field.value.from, "LLL dd, y")}
                        </div>
                      )
                    ) : (
                      <span aria-label="dateLancementEffectiveEmpty">Pick a date</span>
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
          Modifier US
        </Button>
      </form>
    </Form>
  )
}
