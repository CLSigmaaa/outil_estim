
import React from "react";
import '../app/globals.css';
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
    <div className="flex justify-center gap-4">
    <a href={`/projects`}> <Button> Login? </Button></a>
     </div>
    </>
  )
}

