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
import { Textarea } from "@/components/ui/textarea"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTreeStore } from "../store/useTreeStore"
import { Tache } from "@/app/model/projet"
import { nativeItemTypeEnum } from "@/app/model/projet/itemEnum"
import { createTacheFormSchema } from "@/schemas/forms/tache"

export const CreateTacheForm = ({ defaultValues }: { defaultValues: Tache }) => {
    const { selectedItem, setSelectedItem, editItem } = useTreeStore(); // Ajout de editItem

    var form = useForm({
        resolver: zodResolver(createTacheFormSchema),
        defaultValues: {
            nom: defaultValues.nom,
            description: defaultValues.description,
            statut: defaultValues.statut,
            id: defaultValues.id,
        }
    })

    //TODO: add types
    const onSubmit = (data: any) => {
        var editedTache = {
            nom: data.nom,
            description: data.description,
            statut: defaultValues.statut,
            id: defaultValues.id,
            type: nativeItemTypeEnum.Tache
        } as Tache;
        editItem(editedTache.id, editedTache);
        setSelectedItem({...selectedItem, children: selectedItem.children.map((tache: Tache) => tache.id == editedTache.id ? editedTache : tache)})
    }

    return (
        <div className="bg-white p-4 border rounded border-black">
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
                                <Input placeholder="Nom de la tâche" {...field} />
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
                                    placeholder="Description de la tâche"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
               
                <Button type="submit">
                    Modifier tâche
                </Button>
            </form>
        </Form>
    </div>
    )
}
