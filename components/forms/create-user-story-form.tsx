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

import { Trash2 } from "lucide-react"

import { createUserStoryFormSchema } from "@/schemas/forms/user-story"
import { nativePriorityEnum } from "@/schemas/forms/user-story"
import { nativeComplexityEnum } from "@/schemas/forms/user-story"
import { nativeUserStoryStateEnum } from "@/schemas/forms/user-story"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { US } from "@/app/model/projet"
import { useTreeStore } from "@/components/store/useTreeStore"
import { Separator } from "../ui/separator"

import { FileCard } from "@/components/file-card"

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
      us_etat: defaultValues.statut,
      technologies: defaultValues.technologies,
      complexite: defaultValues.complexite,
      estimation_initiale: defaultValues.estimation ? parseInt(defaultValues.estimation) : 0,
      date_range_estim: {
        from: new Date(),
        to: new Date(),
      },
      date_range_effective: {
        from: new Date(),
        to: new Date(),
      },
      commentaires: defaultValues.commentaires,
      new_attachments: defaultValues.new_attachments,
      existing_attachments: defaultValues.existing_attachments,
    },
  })

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control: form.control,
    name: "new_attachments",
  });

  console.log(form.getValues())


  // Fonction pour gérer la suppression d'une pièce jointe existante
  const handleRemoveExistingAttachment = (index) => {
    // Filtrer la pièce jointe à supprimer
    const updatedAttachments = selectedItem.existing_attachments.filter((_, i) => i !== index);

    // Mettre à jour l'état avec la nouvelle liste de pièces jointes
    setSelectedItem({
      ...selectedItem,
      existing_attachments: updatedAttachments,
    });
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("id", data.id);

    if (data.new_attachments) {
      Array.from(data.new_attachments).forEach((file: File, index: number) => {
        formData.append(`new_attachments`, file);
      });
    }
    formData.append("nom", data.nom);
    formData.append("id", data.id);

    const editedItem: US = {
      ...selectedItem,
      nom: data.nom,
      description: data.description,
      priorite: data.priorite,
      statut: data.us_etat,
      technologies: data.technologies,
      complexite: data.complexite,
      estimation: data.estimation_initiale,
      datesEstimee: data.date_range_estim,
      datesEffectives: data.date_range_effective,
      commentaires: data.commentaires,
      existing_attachments: data.new_attachments?.map((file: any) => {
        return {
          nom: file.name,
          url: `http://localhost:3000/${selectedItem.id}/${file.name}`,
          extension: file.type,
        }
      }),
      new_attachments: []
    };
    const res = await upload(formData)
    setSelectedItem(undefined)
    editItem(editedItem.id, editedItem)

    if (res) {
      console.log("File uploaded successfully")
    } else {
      console.log("Failed to upload file")
    }
  }

  function resetform() {
    form.reset({
      nom: selectedItem.nom,
      id: selectedItem.id,
      description: selectedItem.description,
      priorite: selectedItem.priorite,
      us_etat: selectedItem.statut,
      technologies: selectedItem.technologies,
      complexite: selectedItem.complexite,
      estimation_initiale: selectedItem.estimation ? parseInt(selectedItem.estimation) : 0,
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

  const isUserStoryFinished = form.watch("us_etat") === "Terminée" // TODO: add conditions for date inputs

  return (
    <>
      <h1 className="font-bold mb-2">Informations sur {defaultValues.nom}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          aria-label="submitUSForm"
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
                  <Input placeholder="Description User Story" {...field} />
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
            name="us_etat"
            render={({ field }) => (
              <FormItem>
                <FormLabel>États des US {createUserStoryFormSchema.shape['us_etat'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
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
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies {createUserStoryFormSchema.shape['technologies'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <FormMessage />
                <FormControl>
                  <Input placeholder="Technologies utilisées" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complexite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complexité {createUserStoryFormSchema.shape['complexite'].isOptional() ? "" : <span className="text-red-500">*</span>}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_range_effective"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormMessage />
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
                      aria-label="dateLancementEffective"
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

          <Separator className="mt-6" />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold mt-2">Pièces Jointes</h1>
            <h2 className="font-semibold">Existantes :</h2>

            {selectedItem.existing_attachments?.length > 0 ? selectedItem.existing_attachments.map((attachment, index) => (
              <FileCard
                key={index}
                fileProperty={attachment}
                onRemove={() => handleRemoveExistingAttachment(index)} />
            )) : "Aucune pièce jointe existante."}

            <h2 className="font-semibold">Nouvelles :</h2>
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`new_attachments.${index}`}
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input placeholder="Attachment" type="file" {...fieldProps} onChange={(event) => testHandle(event, onChange)} />
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="destructive"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            ))}
            <Button
              type="button"
              onClick={() => append({})}
            >
              Ajouter une pièce jointe
            </Button>
          </div>
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
