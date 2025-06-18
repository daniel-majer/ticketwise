const home = () => "/";
const tickets = () => "/tickets";
const ticketById = (id: string) => `/tickets/${id}`;
const ticketEdit = (id: string) => `/tickets/${id}/edit`;

export { home, ticketById, ticketEdit, tickets };
