import {
  FormField,
  FormItem,
  FormMessage,
  FormControl,
  Form,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { FormState, useForm, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createTaskEstimFormSchema } from "@/schemas/forms/task-estim";
import React from "react";
import { ChevronDown, ChevronUp, EyeIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

export type EstimInfo = {
  nomTache: string;
  estimationInitiale: number;
  consomme: number;
  resteAFaire: number;
  newConsomme: number;
  newResteAFaire: number;
  causeEcart: string;
  isEcartExceptionnel: boolean;
  id: string;
};

const header = ({column, title, shrunkColumn}:{column: Column<EstimInfo, unknown>, title: string, shrunkColumn: boolean}) => {
  return (
    <Button
      variant="ghost"
      className={`h-fit px-0 ${shrunkColumn ? "w-min" : ""}`}
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
  const [error, setError] = React.useState<{consomme: string, resteAFaire: string, estimation: string}>({consomme: "", resteAFaire: "", estimation: ""});
  var formDict: {
    [key: string]: UseFormReturn<{
      newConsomme: string;
      newResteAFaire: string;
      causeEcart: string;
      isEcartExceptionnel: boolean;
  }, any, undefined>;
  } = {};

  function validateAndSubmit(form: UseFormReturn<{newConsomme: string; newResteAFaire: string; causeEcart: string; isEcartExceptionnel: boolean; }, any, undefined>, 
    rowId: string, consomme: number, resteAFaire: number) {
    const formValues = form.getValues();
    var emptyError = {consomme: "", resteAFaire: "", estimation: ""}; 
    if (formValues.newConsomme == "" || parseFloat(formValues.newConsomme) < 0) {
      setError({...emptyError, consomme: t("erreurs.nombrePosRequis")});
      return;
    } else if (formValues.newResteAFaire == "" || parseFloat(formValues.newResteAFaire) < 0) {
      setError({...emptyError, resteAFaire: t("erreurs.nombrePosRequis")});
      return;
    } else if (consomme + resteAFaire != 0 && formValues.causeEcart == "") {
      if (parseFloat(formValues.newConsomme) + parseFloat(formValues.newResteAFaire) > consomme + resteAFaire) {
        setError({...emptyError, estimation: t("erreurs.estimationSuperieure")});
        return;
      } else if (parseFloat(formValues.newConsomme) + parseFloat(formValues.newResteAFaire) < consomme + resteAFaire) {
        setError({...emptyError, estimation: t("erreurs.estimationInferieure")});
        return;
      }
    }
    setError(emptyError);
    submitEstimation(form, rowId)
  }

  function DefineForm(row: EstimInfo) {
    const formState = useForm({
      // On ne peut appeler de Hook dans un bloc conditionnel
      resolver: zodResolver(createTaskEstimFormSchema(row.estimationInitiale, row.consomme, row.resteAFaire)),
      defaultValues: {
        newConsomme: "",
        newResteAFaire: "",
        causeEcart: "",
        isEcartExceptionnel: true,
      },
    });
    if (formDict[row.id] == undefined) {
      formDict[row.id] = formState;
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
      accessorKey: "consomme",
      header: ({column}) => header({column, title: `${t("estimation.consomme")} (j)`, shrunkColumn: true}),
    },
    {
      accessorKey: "resteAFaire",
      header: ({column}) => header({column, title: `${t("estimation.resteAFaire")} (j)`, shrunkColumn: true}),
    },
    {
      accessorKey: "newConsomme",
      header: () => <div className="w-24 text-wrap">{t("estimation.nouveauConsomme")} (j)</div>,
      cell: ({ row }) => {
        DefineForm(row.original);

        return (
          <div className="w-24 text-wrap">
          <Form {...formDict[row.original.id]}>
            <FormField
              control={formDict[row.original.id].control}
              name="newConsomme"
              render={({ field }) => (
                <FormItem className="w-24 mb-0">
                  {error.consomme !== "" && <FormMessage>{error.consomme}</FormMessage>}
                  <FormControl>
                    <Input
                      placeholder={(row.original.consomme + 1).toString()}
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
        DefineForm(row.original);

        return (
          <div >
          <Form {...formDict[row.original.id]}>
            <FormField
              control={formDict[row.original.id].control}
              name="newResteAFaire"
              render={({ field }) => (
                <FormItem className="w-24 mb-0">
                  {error.resteAFaire !== "" && <FormMessage>{error.resteAFaire}</FormMessage>}
                  <FormControl>
                    <Input
                      placeholder={(row.original.resteAFaire  - 1 <= 0 ? 0 : row.original.resteAFaire - 1).toString()}
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
        DefineForm(row.original);

        return (
          <Form {...formDict[row.original.id]}>
            <FormField
              control={formDict[row.original.id].control}
              name="causeEcart"
              render={({ field }) => (
                <FormItem className="mb-0">
                  {error.estimation !== "" && <FormMessage>{error.estimation}</FormMessage>}
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
    {accessorKey: "isEcartExceptionnel",
    header:({column}) => header({column, title: t("estimation.ecartExceptionnel"), shrunkColumn: true}),
    cell: ({ row }) => {
      return (
        <Form {...formDict[row.original.id]}>
        <FormField
          control={formDict[row.original.id].control}
          name="isEcartExceptionnel"
          render={({ field }) => (
            <FormItem className="flex mb-0">
              <FormControl>
                <Switch
                  checked={field.value.valueOf()}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="flex items-center pl-1">
                {field.value.valueOf() ? t("global.oui") : t("global.non")}
                </FormLabel>
              </FormItem>
              )}
            />
          </Form>
          )}
      },
    {
      accessorKey: "actions",
      header: () => <div className=" pe-2 flex justify-center ">{t("global.actions")}</div>,
      cell: ({ row }) => (
        <div className="flex justify-end items-center gap-4 px-2">
          <Form {...formDict[row.original.id]}>
          <Button
            type="submit"
            onClick={() => validateAndSubmit(formDict[row.original.id], row.original.id, row.original.consomme, row.original.resteAFaire)}
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
