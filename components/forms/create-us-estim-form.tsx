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
import { useTreeStore } from "../store/useTreeStore"
import { US } from "@/app/model/projet"
import { createUserStoryEstimFormSchema } from "@/schemas/forms/user-story"
import { Separator } from "@/components/ui/separator"

import { useToast } from "@/components/ui/use-toast"

export const CreateUSEstimForm = ({ defaultValues, popoverClose }: { defaultValues: US, popoverClose: any }) => {
    const { selectedItem, setSelectedItem, editItem } = useTreeStore(); // Ajout de editItem
    const { toast } = useToast()
    var form = useForm({
        resolver: zodResolver(createUserStoryEstimFormSchema),
        defaultValues: {
            estimation_initiale: defaultValues.estimation || 0,
            id: defaultValues.id,
        }
    })

    //TODO: add types
    const onSubmit = (data: any) => {
        var editedUSEstim = {
            ...defaultValues,
            estimation: data.estimation_initiale
        } as US;
        editItem(editedUSEstim.id, editedUSEstim);
        setSelectedItem({ ...selectedItem, children: selectedItem.children.map((us: US) => us.id == editedUSEstim.id ? editedUSEstim : us) })
        toast({ variant: "success", title: "Succès !", description: "L'US a bien été modifiée." })
        popoverClose(false);
    }

    return (
        <Card className="w-[350px] shadow-2xl">
            <CardHeader>
                <CardTitle>{defaultValues.nom}</CardTitle>
                <CardDescription>{defaultValues.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full items-center gap-4 p-6">
                        <FormField
                            control={form.control}
                            name="estimation_initiale"
                            render={({ field }) => (
                                <FormItem className="flex gap-y-2 flex-col">
                                    <FormLabel>Estimation:</FormLabel>
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
                            Modifier estimation
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
