export type ITicket = {
  event: { name: string; date: number };
  owner: string;
  seat: string;
  tokenId: bigint;
  listed: boolean;
};

export type ITicketListed = ITicket & {
  price: bigint;
  deadline: number;
};
