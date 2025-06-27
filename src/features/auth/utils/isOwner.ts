import { User } from "@prisma/client";

type Entity = {
  userId: string | null;
};

export const isOwner = (authUser?: User | null, entity?: Entity | null) => {
  if (!authUser || !entity) return false;

  if (!entity.userId) return false;

  if (authUser.id !== entity.userId) {
    return false;
  } else {
    return true;
  }
};
