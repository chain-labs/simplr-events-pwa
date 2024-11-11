import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { envVars } from "@/lib/envVars";

import { getMarketplaceTicketsListWithUser, getTicketsFromAList } from "../gql";
import { ITicketListed } from "../types";

const useMarketplaceData = () => {
  const account = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [marketTickets, setMarketTickets] = useState<ITicketListed[]>([]);

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        const responseWithUser = await axios.post(envVars.subgraphUrl, {
          query: getMarketplaceTicketsListWithUser,
          variables: { id: `user-${account.address}` },
        });
        const listings = responseWithUser.data.data.listings?.items ?? [];
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
      } finally {
        setIsLoading(false);
      }
    };
    getAllTickets();
  }, []);

  return { marketTickets, isLoading };
};

export default useMarketplaceData;
