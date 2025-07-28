const home = () => "/";
const tickets = () => "/tickets";
const ticketById = (id: string) => `/tickets/${id}`;
const ticketEdit = (id: string) => `/tickets/${id}/edit`;

const signInPath = () => "/sign-in";
const signUpPath = () => "/sign-up";
const passwordForgotPath = () => "/password-forgot";
const resetPasswordPath = () => "/reset-password";

const accProfilePath = () => "/account/profile";
const accPasswordPath = () => "/account/password";

const emailVerificationPath = () => "/email-verification";
const organizationsPath = () => "/organizations";
const organizationCreatePath = () => "/organizations/create";
const onboardingPath = () => "/onboarding";
const selectActiveOrganizationPath = () =>
  "/onboarding/select-active-organization";

export {
  accPasswordPath,
  accProfilePath,
  emailVerificationPath,
  home,
  onboardingPath,
  organizationCreatePath,
  organizationsPath,
  passwordForgotPath,
  resetPasswordPath,
  selectActiveOrganizationPath,
  signInPath,
  signUpPath,
  ticketById,
  ticketEdit,
  tickets,
};
