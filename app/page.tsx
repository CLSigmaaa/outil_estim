'use client'
import Image from "next/image";
import Arborescence from "@/components/ui/arborescence/Arborescence";


export default function Home() {
  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center justify-start ">
      <div className="h-10"> HEADER </div>
      <div className=" flex flex-row items-start justify-between z-10 w-full flex-grow">
        <Arborescence/>
        <div className="flex h-48 ">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            
          </a>
        </div>
      </div>


      <div className="">
        FOOTER
      </div>


    </main>
  );
}
