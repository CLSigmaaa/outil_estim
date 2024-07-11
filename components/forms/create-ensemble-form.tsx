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
import { Textarea } from "@/components/ui/textarea"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTreeStore } from "../store/useTreeStore"
import { EnsembleUS } from "@/app/model/projet"
import { createEnsembleFormSchema } from "@/schemas/forms/ensemble-us"

export const CreateEnsembleForm = ({ defaultValues }: { defaultValues: EnsembleUS }) => {
    const { selectedItem, setSelectedItem, editItem } = useTreeStore(); // Ajout de editItem

    var form = useForm({
        resolver: zodResolver(createEnsembleFormSchema),
        defaultValues: {
            nom: defaultValues.nom,
            description: defaultValues.description,
            commentaires: defaultValues.commentaires,
        }
    })

    //TODO: add types
    const onSubmit = (data: any) => {
        let editedEnsemble = {
            nom: data.nom,
            description: data.description,
            id: defaultValues.id,
            children: defaultValues.children,
            type: "Ensemble"
        } as EnsembleUS;
        setSelectedItem(undefined)
        editItem(editedEnsemble.id, editedEnsemble)
    }

    function resetform() {
        form.reset({
            nom: selectedItem.nom,
            description: selectedItem.description,
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
                >
                    Modifier Ensemble
                </Button>
            </form>
        </Form>
    )
}
