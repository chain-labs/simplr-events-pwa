export type ITicket = {
  event: { name: string; date: number };
  owner: string;
  seat: string;
  ticketSerialNumberHash: string;
  tokenId: string;
  listed: boolean;
};

export type ITicketListed = ITicket & {
  price: string;
  deadline: string;
};
