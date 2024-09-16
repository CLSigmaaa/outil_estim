import { DataTable } from "@/components/data-table";
import { ModeToggle } from "@/components/dark-mode-toggle";

export default function TaskPage() {
  return (
    <main className="w-screen h-screen relative flex flex-col justify-center items-center">
      <div className="relative">
        <div className="absolute top-[-113px] right-0" >
          <ModeToggle />
        </div>
        <DataTable />
      </div>
    </main>
  )
}
