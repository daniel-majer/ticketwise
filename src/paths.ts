const home = () => "/";
const tickets = () => "/tickets";
const ticketById = (id: string) => `/tickets/${id}`;
const ticketEdit = (id: string) => `/tickets/${id}/edit`;

const signInPath = () => "/sign-in";
const signUpPath = () => "/sign-up";

const accProfilePath = () => "/account/profile";
const accPasswordPath = () => "/account/password";

export {
  accPasswordPath,
  accProfilePath,
  home,
  signInPath,
  signUpPath,
  ticketById,
  ticketEdit,
  tickets,
};
