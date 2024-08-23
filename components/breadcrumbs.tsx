import React, {ReactElement} from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export function Breadcrumbs({routes = []}: {routes: string[]}) {
  let fullHref: string | undefined = undefined;
  const breadcrumbItems: ReactElement[] = [];
  let breadcrumbPage: ReactElement = (<></>);

  for(let i = 0; i < routes.length; i++) {
    const route = routes[i];
    
    let href;

    href = fullHref ? `${fullHref}/${route}` : `/${route}`
    fullHref = href

    if (i === routes.length-1) {
      breadcrumbPage = (
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold text-base">{route}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    } else {
      if (/^\D+$/.test(route) && route !== "current"){
        breadcrumbItems.push(
          <React.Fragment key={href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={href} className="text-black text-base">{route}</BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        )
      }
    }
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-black text-base">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbItems}
        <BreadcrumbSeparator />
        {breadcrumbPage}
      </BreadcrumbList>
    </Breadcrumb>
  )
}