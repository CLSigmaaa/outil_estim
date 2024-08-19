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

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useTreeStore } from "../../store/useTreeStore"
import { estimation, Task } from "@/app/model/projet"
import { Separator } from "@/components/ui/separator"

import { useToast } from "@/components/ui/use-toast"
import { createTaskEstimFormSchema } from "@/schemas/forms/task-estim"

export const TaskEstimForm = (/*{ defaultValues, popoverClose }: { defaultValues: estimation, popoverClose: any }*/) => {
    const { selectedItem, setSelectedItem, editItem } = useTreeStore(); // Ajout de editItem
    const { toast } = useToast()
    var form = useForm({
        resolver: zodResolver(createTaskEstimFormSchema),
        defaultValues: {
            consommée: "defaultValues.consommee",
            reste_a_faire: "defaultValues.reste_a_faire",
            cause_ecart: "defaultValues.cause"
        }
    })

    //TODO: add types
    const onSubmit = (data: any) => {
        var newEstim = {
            date: new Date().toISOString(),
            consommee: data.consommée,
            reste_a_faire: data.reste_a_faire,
            cause: data.cause_ecart
        }
        toast({ variant: "success", title: "Succès !", description: "L'US a bien été modifiée." })
    }

    return (
        <div className="flex w-full gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center flex-grow">
                    <FormField
                            control={form.control}
                            name="consommée"
                            render={({ field }) => (
                                <FormItem className="flex mb-0">
                                    <FormMessage />
                                    <FormControl>
                                        <Input
                                            placeholder="Estimation en points"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="reste_a_faire"
                            render={({ field }) => (
                                <FormItem className="flex mb-0">
                                    <FormMessage />
                                    <FormControl>
                                        <Input
                                            placeholder="Estimation en jours"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cause_ecart"
                            render={({ field }) => (
                                <FormItem className="flex mb-0">
                                    <FormMessage />
                                    <FormControl>
                                        <Input
                                            placeholder="Estimation en points"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="flex justify-center">
                            Modifier
                        </Button>
                    </form>
                </Form>
                <Button onClick={() => {console.log("apercu")}}>Aperçu</Button>
            </div>  
    )
}
