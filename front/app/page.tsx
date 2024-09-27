import { TaskTable } from "@/components/data-table";

import { Table2 } from 'lucide-react';

import { ModeToggle } from "@/components/dark-mode-toggle";

import { BurnDown } from "@/components/burn-down";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default async function TaskPage() {
  const data = await fetch('http://localhost:8080/tasks/history?days=4', {
    cache: 'no-cache',
  }).then(res => res.json())

  return (
    <main className="w-screen h-screen relative flex flex-col justify-center items-center">
      <Tabs defaultValue="tableau">
        <TabsList>
          <TabsTrigger value="tableau">Liste</TabsTrigger>
          <TabsTrigger value="graphique">Graphiques</TabsTrigger>
        </TabsList>
        <TabsContent value="tableau">
          <div className="relative">
            <div className="absolute top-[-113px] right-0" >
              <ModeToggle />
            </div>
            <TaskTable />
          </div>
        </TabsContent>
        <TabsContent value="graphique">
          <BurnDown data={data} />
        </TabsContent>
      </Tabs>
    </main>
  )
}