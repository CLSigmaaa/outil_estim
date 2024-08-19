import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createTaskEstimFormSchema } from "@/schemas/forms/task-estim";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react"
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type EstimInfo = {
  nomTache: string;
  estimationInitiale: number;
  consommee: number;
  resteAFaire: number;
  newConsommee: number;
  newResteAFaire: number;
  causeEcart: string;
  id: string;
};

const header = ({column, title}:{column: Column<EstimInfo, unknown>, title: string}) => {
  return (
    <Button
      variant="ghost"
      className="h-fit px-0"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      <div className="text-start text-wrap">
        {title}
      </div>
      {column.getIsSorted() === "asc" ? <ChevronUp height={20} width={20}/> : <ChevronDown height={20} width={20}/>}
    </Button>
  
  )
}

export function estimTableColumns(submitEstimation: any): ColumnDef<EstimInfo>[] {
  const path = usePathname(); 

  var formDict: {
    [key: string]: UseFormReturn<
      { consommee: number; resteAFaire: number; causeEcart: string },
      any,
      undefined
    >;
  } = {};

  function defineForm(rowId: string) {
    if (formDict[rowId] === undefined) {
      formDict[rowId] = useForm({
        resolver: zodResolver(createTaskEstimFormSchema),
        defaultValues: {
          consommee: "",
          resteAFaire: "",
          causeEcart: "",
        },
      });
    }
  }

  return [
    {
      accessorKey: "nomTache",
      header: ({column}) => header({column, title: "Nom"}),
    },
    {
      accessorKey: "estimationInitiale",
      header: ({column}) => header({column, title: "Estimation initiale"}),
    },
    {
      accessorKey: "consommee",
      header: ({column}) => header({column, title: "Consommée"}),
    },
    {
      accessorKey: "resteAFaire",
      header: ({column}) => header({column, title: "Dernier reste à faire"}),
    },
    {
      accessorKey: "newConsommee",
      header: () => "Nouveau consommée",
      cell: ({ row }) => {
        defineForm(row.id);

        return (
          <div className="flex flex-grow">
          <Form {...formDict[row.id]}>
            <FormField
              control={formDict[row.id].control}
              name="consommee"
              render={({ field }) => (
                <FormItem className="flex flex-grow mb-0 w-min ">
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Nouveau consommée"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
          </div>
        );
      },
    },
    {
      accessorKey: "newResteAFaire",
      header: () => "Nouveau reste à faire",
      cell: ({ row }) => {
        defineForm(row.id);

        return (
          <div className="flex flex-grow">
          <Form {...formDict[row.id]}>
            <FormField
              control={formDict[row.id].control}
              name="resteAFaire"
              render={({ field }) => (
                <FormItem className="flex flex-grow mb-0 w-min">
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder="Nouveau reste à faire"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
          </div>
        );
      },
    },
    {
      accessorKey: "causeEcart",
      header: () => <div className="">Cause de l'écart</div>,
      cell: ({ row }) => {
        defineForm(row.id);

        return (
          
          <Form {...formDict[row.id]}>
            <FormField
              control={formDict[row.id].control}
              name="causeEcart"
              render={({ field }) => (
                <FormItem className="mb-0">
                  <FormMessage />
                  <FormControl>
                    <Textarea
                      placeholder="Cause de l'écart"
                      className="resize-none min-h-min px-0"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </Form>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => <div className=" pe-2 flex justify-center ">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-4 ">
          <Form {...formDict[row.id]}>
          <Button
            type="submit"
            onClick={() => formDict[row.id].handleSubmit(submitEstimation(formDict[row.id], row.id))}
            disabled={!formDict[row.id] == undefined}
          >
            Sauvegarder
          </Button>
          </Form>
          <Link href={`${path}/${row.original.id}`}>
          <Button > Aperçu </Button>
          </Link>
        </div>
      ),
    },
  ];
}
