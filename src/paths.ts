const home = () => "/";
const tickets = () => "/tickets";
const ticketById = (id: string) => `/tickets/${id}`;
const ticketEdit = (id: string) => `/tickets/${id}/edit`;

const signInPath = () => "/signin";
const signUpPath = () => "/signup";

export { home, signInPath, signUpPath, ticketById, ticketEdit, tickets };
