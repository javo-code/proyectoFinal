import fs from "fs";

export default class TicketFSDao {
  constructor(path) {
    this.path = path;
  }
  async getTickets() {
    try {
      if (fs.existsSync(this.path)) {
        const ticketsJSON = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(ticketsJSON);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  async #getMaxId() {
    let maxId = 0;
    const tickets = await this.getTickets();
    tickets.map((ticket) => {
      if (ticket.id > maxId) maxId = ticket.id;
    });
    return maxId;
  }

  //CREAR PRODUCTO.
  async createTicket(prod) {
    try {
      const ticket = {
        id: (await this.#getMaxId()) + 1,
        status: true,
        ...prod
      };
      const tickets = await this.getTickets();
      tickets.push(ticket);
      await fs.promises.writeFile(this.path, JSON.stringify(tickets));
      return ticket;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTicketById(idTicket) {
    try {
      const tickets = await this.getTickets();
      const ticketById = tickets.find((ticket) => ticket.id === idTicket);
      if (!ticketById) return false;
      return ticketById;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTicket(idTicket) {
    try {
      const tickets = await this.getTickets();
      if (tickets.length < 0) return false;
      const updatedArray = tickets.filter((ticket) => ticket.id !== idTicket);
      await fs.promises.writeFile(this.path, JSON.stringify(updatedArray));
    } catch (error) {
      console.log(error);
    }
  }

  async getTicketsByLimit(limit) {
    try {
      const tickets = await this.getTickets();
      if (!limit || limit >= tickets.length) return tickets;
      else return tickets.slice(0, limit);
    } catch (error) {
      console.log(error);
    }
  }
}

const ticketDaoFS = new TicketFSDao("./src/data/tickets.json")

export { ticketDaoFS }


