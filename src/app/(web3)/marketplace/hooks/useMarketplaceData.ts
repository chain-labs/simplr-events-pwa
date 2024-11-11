import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { envVars } from "@/lib/envVars";

import { getMarketplaceTicketsListWithUser, getTicketsFromAList } from "../gql";
import { ITicketListed } from "../types";

const useMarketplaceData = () => {
  const account = useAccount();
  const [marketTickets, setMarketTickets] = useState<ITicketListed[]>([]);

  useEffect(() => {
    if (account.address) {
      const getAllTickets = async () => {
        try {
          const responseWithUser = await axios.post(envVars.subgraphUrl, {
            query: getMarketplaceTicketsListWithUser,
            variables: { id: `user-${account.address}` },
          });
          const listings = responseWithUser.data.data.listings?.items ?? [];
          // const mergedTickets = Array.from(
          //   new Set([
          //     ...listings.map(
          //       (ticket: { ticketId: string }) => ticket.ticketId
          //     ),
          //   ])
          // );
          // const ticketDetailsResponse = await axios.post(envVars.subgraphUrl, {
          //   query: getTicketsFromAList,
          //   variables: { id_in: mergedTickets },
          // });
          // const tickets: any = {};
          // ticketDetailsResponse.data.data.tickets.items.forEach(
          //   (ticket: any) => {
          //     tickets[ticket.id] = {
          //       seat: ticket.seat,
          //       ticketSerialNumberHash: ticket.ticketSerialNumberHash,
          //       owner: ticket.ownerId.split("-")[1],
          //       event: ticket.event,
          //     };
          //   }
          // );
          const marketTickets: ITicketListed[] = listings.map((item: any) => {
            console.log({ item });
            return {
              event: {
                name: item?.ticket?.event?.name,
                date: item?.ticket?.event?.eventDate,
                image: item?.ticket?.tokenMetadata?.image,
              },
              owner: item?.owner,
              seat: item?.ticket.seat,
              ticketSerialNumberHash: item?.ticket.ticketSerialNumberHash,
              tokenId: item.ticketId.split("-")[2],
              listed: true,
              price: item.price,
              deadline: item.deadline,
            };
          });
          setMarketTickets(marketTickets.filter(ticket => ticket !== null));
        } catch (err) {
          console.log(err);
          return [];
        }
      };
      getAllTickets();
    }
  }, [account]);

  return { marketTickets };
};

export default useMarketplaceData;
