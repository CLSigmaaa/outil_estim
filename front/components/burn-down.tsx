"use client"

import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type TData = {
  day: string,
  sumRemainingTasks: number,
  sumConsumedTime: number
}

export const BurnDown = ({ data }: { data: TData[] }) => {
  return (
    <ResponsiveContainer width={1200} height={500}>
      <ComposedChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis name="jours" dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar
          name="Reste à faire"
          dataKey="sumRemainingTime"
          fill="#82ca9d"
        />
        <Line
          name="Reste à faire idéal"
          dataKey="idealRemainingTime"
          stroke="#8884d8"
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
