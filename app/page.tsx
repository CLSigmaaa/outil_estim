import { promises as fs } from "fs";

import { DataTable } from "@/components/data-table";

export default function TaskPage() {
  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <DataTable />
    </main>
  )
}
