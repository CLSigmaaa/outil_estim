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
import { ChevronDown, ChevronUp, EyeIcon } from "lucide-react"
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

const header = ({column, title, shrunkColumn}:{column: Column<EstimInfo, unknown>, title: string, shrunkColumn: boolean}) => {
  return (
    <Button
      variant="ghost"
      className={`h-fit px-0 ${shrunkColumn ? "w-24" : ""}`}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      <div className={`text-start text-wrap `}>
        {title}
      </div>
      {column.getIsSorted() === "asc" ? <ChevronUp height={20} width={20}/> : <ChevronDown height={20} width={20}/>}
    </Button>
  
  )
}

export function EstimAssignedColumns(submitEstimation: Function, t: Function): ColumnDef<EstimInfo>[] {
  const path = usePathname();
  var formDict: {
    [key: string]: UseFormReturn<
      { consommee: number; resteAFaire: number; causeEcart: string },
      any,
      undefined
    >;
  } = {};

  function DefineForm(taskId: string) {
    var newForm = useForm({
      // On ne peut appeler de Hook dans un bloc conditionnel
      resolver: zodResolver(createTaskEstimFormSchema),
      defaultValues: {
        consommee: "",
        resteAFaire: "",
        causeEcart: "",
      },
    });
    if (formDict[taskId] == undefined) {
      formDict[taskId] = newForm as any;
    }
  }

  return [
    {
      accessorKey: "nomTache",
      header: ({column}) => header({column, title: t("global.nom"), shrunkColumn: false}),
      cell: ({ row }) => (
        <div className="whitespace-pre-line overflow-auto max-h-16">
          {row.original.nomTache}
        </div>
      ),
    },
    {
      accessorKey: "estimationInitiale",
      header: ({column}) => header({column, title: `${t("estimation.estimationInitiale")} (j)`, shrunkColumn: true}),
    },
    {
      accessorKey: "consommee",
      header: ({column}) => header({column, title: `${t("estimation.consomme")} (j)`, shrunkColumn: true}),
    },
    {
      accessorKey: "resteAFaire",
      header: ({column}) => header({column, title: `${t("estimation.resteAFaire")} (j)`, shrunkColumn: true}),
    },
    {
      accessorKey: "newConsommee",
      header: () => <div className="w-24 text-wrap">{t("estimation.nouveauConsomme")} (j)</div>,
      cell: ({ row }) => {
        DefineForm(row.original.id);

        return (
          <div className="w-24 text-wrap">
          <Form {...formDict[row.original.id]}>
            <FormField
              control={formDict[row.original.id].control}
              name="consommee"
              render={({ field }) => (
                <FormItem className="w-24 mb-0">
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder={(row.original.consommee + 1).toString()}
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
      header: () => <div className="w-24 text-wrap">{t("estimation.nouveauResteAFaire")} (j)</div>,
      cell: ({ row }) => {
        DefineForm(row.original.id);

        return (
          <div >
          <Form {...formDict[row.original.id]}>
            <FormField
              control={formDict[row.original.id].control}
              name="resteAFaire"
              render={({ field }) => (
                <FormItem className="w-24 mb-0">
                  <FormMessage />
                  <FormControl>
                    <Input
                      placeholder={(row.original.resteAFaire - 1).toString()}
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
      header: () => t("estimation.causeEcart"),
      cell: ({ row }) => {
        DefineForm(row.original.id);

        return (
          
          <Form {...formDict[row.original.id]}>
            <FormField
              control={formDict[row.original.id].control}
              name="causeEcart"
              render={({ field }) => (
                <FormItem className="mb-0">
                  <FormMessage />
                  <FormControl>
                    <Textarea
                      placeholder={t("estimation.causeEcart")}
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
      header: () => <div className=" pe-2 flex justify-center ">{t("global.actions")}</div>,
      cell: ({ row }) => (
        <div className="flex justify-end items-center gap-4 px-8">
          <Form {...formDict[row.original.id]}>
          <Button
            type="submit"
            onClick={() => formDict[row.original.id].handleSubmit(submitEstimation(formDict[row.original.id], row.original.id))}
            disabled={!formDict[row.original.id] == undefined}
          >
            {t("actions.confirmer")}
          </Button>
          </Form>
          <Link href={`${path}/${row.original.id}`}>
          <Button  className="flex items-center gap-2"> <EyeIcon /> {t("actions.details")} </Button>
          </Link>
        </div>
      ),
    },
  ];
}
