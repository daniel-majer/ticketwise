import React, { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Crumbs = {
  title: string;
  href?: string;
};

type CrumbsProps = {
  breadcrumbs: Crumbs[];
};

const Breadcrumbs = ({ breadcrumbs }: CrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, i) => {
          let breadcrumbItem = (
            <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
          );

          if (!crumb.href)
            breadcrumbItem = <BreadcrumbPage>{crumb.title}</BreadcrumbPage>;
          return (
            <Fragment key={crumb.title}>
              <BreadcrumbItem>{breadcrumbItem}</BreadcrumbItem>
              {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
