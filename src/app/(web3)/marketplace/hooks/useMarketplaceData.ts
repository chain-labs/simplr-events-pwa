import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { envVars } from "@/lib/envVars";

import { getMarketplaceTicketsListWithUser, getTicketsFromAList } from "../gql";
import { ITicket, ITicketListed } from "../types";

const useMarketplaceData = () => {
  const account = useAccount();
  const [marketTickets, setMarketTickets] = useState<ITicketListed[]>([]);
  const [userTickets, setUserTickets] = useState<ITicket[]>([]);
  
  useEffect(() => {
    if (account.address) {
      const getAllTickets = async () => {
        const responseWithUser = await axios.post(envVars.subgraphUrl, {
          query: getMarketplaceTicketsListWithUser,
          variables: { id: `user-${account.address}` },
        });
        const listings = responseWithUser.data.data.listings?.items ?? [];
        const userTickets =
          responseWithUser.data.data.user?.ticketsOwned?.items ?? [];
        const mergedTickets = Array.from(
          new Set([
            ...listings.map((ticket: { ticketId: string }) => ticket.ticketId),
            ...userTickets.map((ticket: { id: string }) => ticket.id),
          ])
        );
        const ticketDetailsResponse = await axios.post(envVars.subgraphUrl, {
          query: getTicketsFromAList,
          variables: { id_in: mergedTickets },
        });
        const tickets: any = {};
        ticketDetailsResponse.data.data.tickets.items.forEach((ticket: any) => {
          tickets[ticket.id] = {
            seat: ticket.seat,
            ticketSerialNumberHash: ticket.ticketSerialNumberHash,
            owner: ticket.ownerId.split("-")[1],
            event: ticket.event,
          };
        });
        const marketTickets: ITicketListed[] = listings.map(
          (item: { ticketId: string; price: string; deadline: string }) => {
            const metadata = tickets[item.ticketId];
            return {
              event: {
                name: metadata.event.name,
                date: metadata.event.eventDate,
              },
              owner: metadata.owner,
              seat: metadata.seat,
              ticketSerialNumberHash: metadata.ticketSerialNumberHash,
              tokenId: item.ticketId.split("-")[2],
              listed: true,
              price: item.price,
              deadline: item.deadline,
            };
          }
        );
        const userTicketsTemp: ITicket[] = userTickets.map(
          (item: { id: string }) => {
            const metadata = tickets[item.id];
            return {
              event: {
                name: metadata.event.name,
                date: metadata.event.eventDate,
              },
              owner: metadata.owner,
              seat: metadata.seat,
              ticketSerialNumberHash: metadata.ticketSerialNumberHash,
              tokenId: item.id.split("-")[2],
              listed: listings.find(
                (listingItem: { ticketId: string }) =>
                  listingItem.ticketId === item.id
              )
                ? true
                : false,
            };
          }
        );
        setMarketTickets(marketTickets);
        setUserTickets(userTicketsTemp);
      };
      getAllTickets();
    }
  }, [account]);

  return { marketTickets, userTickets };
};

export default useMarketplaceData;
