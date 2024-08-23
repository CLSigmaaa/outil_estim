"use client";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function BreadcrumbSlot() {
  const pathname = usePathname();
  const routes = pathname.split("/").filter((route) => route !== "");

  function getPreviousRoute() {
    var newRoutes = pathname.split("/").filter((route) => route !== "");
    var route;
    do {
      if (newRoutes.length === 0) {
        return "/";
      }
      route = newRoutes.pop();
    } while (isNaN(parseFloat(route || "")) && route !== "current");
    
    return "/"+newRoutes.join("/");
  }
  return (
    <div className="flex items-center gap-4">
      <Link
        className="flex gap-2 px-2 py-1 rounded border border-black"
        href={getPreviousRoute()}
      >
        <ArrowLeft /> Précédent
      </Link>
      <Breadcrumbs routes={routes} />
    </div>
  );
}
