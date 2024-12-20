import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { envVars } from "@/lib/envVars";

import { getMarketplaceTicketsListWithUser, getSoldTicketsQuery } from "../gql";
import { ITicketListed } from "../types";

const useMarketplaceData = () => {
  const account = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [marketTickets, setMarketTickets] = useState<ITicketListed[]>([]);
  const [soldTickets, setSoldTickets] = useState<ITicketListed[]>([]);

  useEffect(() => {
    const getAllTickets = async () => {
      try {
        const responseWithUser = await axios.post(envVars.subgraphUrl, {
          query: getMarketplaceTicketsListWithUser,
          variables: { id: `user-${account.address}` },
        });
        const listings = responseWithUser.data.data.listings?.items ?? [];
        const marketTickets: ITicketListed[] = listings.map((item: any) => {
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
    const getSoldTickets = async () => {
      try {
        const responseSold = await axios.post(envVars.subgraphUrl, {
          query: getSoldTicketsQuery,
        });
        const sold = responseSold.data.data.listings?.items ?? [];
        const soldTickets: ITicketListed[] = sold.map((item: any) => {
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
            listed: false,
            price: item.price,
            deadline: item.deadline,
          };
        });
        setSoldTickets(soldTickets);
      } catch (err) {
        console.log(err);
        return [];
      }
    };
    const getData = async () => {
      await getAllTickets();
      await getSoldTickets();
      setIsLoading(false);
    };

    getData();
  }, []);

  return { marketTickets, soldTickets, isLoading };
};

export default useMarketplaceData;
