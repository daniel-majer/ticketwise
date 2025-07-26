import React from "react";

import { format } from "date-fns";

import { getOrganizations } from "../actions/get-organizations";

const OrganizationList = async () => {
  const orgranizations = await getOrganizations();

  return (
    <div className="animate-navbar">
      {orgranizations.map((org) => {
        return (
          <div key={org.id}>
            <div>Name: {org.name}</div>
            <div>
              Joined At: {format(org.membershipByUser.joinedAt, "dd/MM/yyyy")}
            </div>
            <div>Members: {org._count.memberships}</div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};

export default OrganizationList;
