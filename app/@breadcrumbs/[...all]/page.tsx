"use client"
import { Breadcrumbs } from "@/components/breadcrumbs";
import { usePathname } from "next/navigation";

export default function BreadcrumbSlot() {
  const pathName = usePathname();
  const routes = pathName.split('/').filter(route => route !== '');
  console.log("rendering in @breadcrumbs", routes)
  return <Breadcrumbs routes={routes} />
}