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

export {
  accPasswordPath,
  accProfilePath,
  emailVerificationPath,
  home,
  passwordForgotPath,
  resetPasswordPath,
  signInPath,
  signUpPath,
  ticketById,
  ticketEdit,
  tickets,
};
