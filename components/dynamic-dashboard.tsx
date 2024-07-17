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

import { useResizableWidth } from '@/hooks/use-resizable';

import { Scaling } from 'lucide-react';
import { cn } from '@/lib/utils';

type DashboardCaseProps = {
  title: string;
  children?: React.ReactNode;
  resizable?: boolean;
  width?: number;
}

export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

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

export const PlaceholderChart: React.FC = ({ chartConfig, chartData }: any) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
        <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
      </BarChart>
    </ChartContainer>
  )
}


export const BaseDashboardCase: React.FC<DashboardCaseProps> = ({ title, children, resizable = false, width = 500 }) => {
  const { currentWidth, startResizing } = useResizableWidth(width, resizable);

  return (
    <div
      style={{ width: `${currentWidth / 16}rem`, minWidth: '20rem' }}
      className={cn(
        "select-none",
        !resizable && "flex-grow",
      )}
    >
      <Card className="w-full h-full relative">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {resizable && (
          <span className="cursor-w-resize">
            <Scaling
              className="w-4 h-4 absolute bottom-2 right-2"
              onMouseDown={startResizing}
            />
          </span>
        )}
      </Card>
    </div>
  );
}

export const AnalyticsDashboardCase: React.FC<DashboardCaseProps> = ({ title, children, resizable = false }) => {
  return (
    <BaseDashboardCase title={title} resizable={resizable}>
      <div className="flex flex-col gap-4 select-none">
        {children}
      </div>
    </BaseDashboardCase>
  );
}

export const ChartDashboardCase: React.FC<DashboardCaseProps> = ({ title, children, resizable = false }) => {
  return (
    <BaseDashboardCase title={title} resizable={resizable}>
      {children}
    </BaseDashboardCase>
  );
}

export const DynamicDashboard = ({ children }: any) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center p-3 w-full">
      {children}
    </div>
  )
}
