import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Bar, BarChart, XAxis } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

import { cn } from '@/lib/utils';

interface DashboardCaseProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  footer?: string;
}

interface DashboardRowProps {
  children: React.ReactNode;
  className?: string;
}

interface BaseDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export const DashboardCase: React.FC<DashboardCaseProps> = ({ children, className, title, description, footer }) => {
  return (
    <Card
      className={className}
    >
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

export const DashboardRow: React.FC<DashboardRowProps> = ({ children, className }) => {
  return <div className={cn("flex flex-row w-full", className ? className : "gap-x-4")}>{children}</div>
}

export const BaseDashboardLayout: React.FC<BaseDashboardLayoutProps> = ({ children, className }) => {
  return <div className={cn("flex flex-col w-full", className ? className : "gap-y-4 p-4")}>{children}</div>
}
