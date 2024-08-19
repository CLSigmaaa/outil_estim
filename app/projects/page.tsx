"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProjectList() {
  const pathname = usePathname();

  const projetId = "1";
  const lastSprintId = "1";
  return (
    <div>
      <h1>Projets</h1>
      <p>Choisissez un projet</p>
      <div className="flex justify-start gap-10 items-center p-2 border">
        <p> Projet 1</p>
      <Link href={`${pathname}/${projetId}/sprints`}><Button> Modifier </Button></Link>
      <Link href={`${pathname}/${projetId}/sprints/current/tasks`}><Button> Saisir Estimation </Button></Link>
    </div>
    </div>
  )
}