import { DataTable } from "@/components/data-table";
import { ModeToggle } from "@/components/dark-mode-toggle";

export default function TaskPage() {
  return (
    <main className="w-screen h-screen relative flex flex-col justify-center items-center">
      <DataTable />
    </main>
  )
}
