import { prisma } from "@/lib/prisma";
import { emailInvitationLink } from "@/paths";
import { generateRandomToken, hashToken } from "@/utils/crypto";
import { baseUrl } from "@/utils/url";

export const generateInviteLink = async (
  invitedByUserId: string,
  organizationId: string,
  email: string,
) => {
  await prisma.invitation.deleteMany({
    where: {
      organizationId,
      email,
    },
  });

  const tokenId = generateRandomToken();
  const tokenHash = hashToken(tokenId);

  await prisma.invitation.create({
    data: {
      organizationId,
      invitedByUserId,
      email,
      tokenHash,
    },
  });

  const pageUrl = baseUrl() + emailInvitationLink();
  const inviteLink = pageUrl + `/${tokenId}`;

  return inviteLink;
};
