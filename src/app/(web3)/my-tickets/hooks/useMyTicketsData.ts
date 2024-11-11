import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

import { envVars } from "@/lib/envVars";

import { ITicketListed } from "../../marketplace/types";
import { GetUserListings } from "../gql";

const useMyTicketsData = () => {
  const account = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [userListings, setUserListings] = useState<ITicketListed[]>([]);

  useEffect(() => {
    const getUserListings = async () => {
      if (!account.address) {
        setUserListings([]);
        return;
      }

      const userListingData = await axios.post(envVars.subgraphUrl, {
        query: GetUserListings,
        variables: {
          sellerId: `user-${account.address}`,
        },
      });
      console.log({ userListingData });
      const listings: ITicketListed[] =
        userListingData.data.data.listings.items.map((item: any) => {
          return {
            event: {
              name: item?.ticket?.event?.name,
              date: item?.ticket?.event?.eventData,
              image: item?.ticket?.tokenMetadata?.image,
            },
            owner: item.sellerId.split("-")[1],
            seat: item?.ticket?.seat,
            ticketSerialNumberHash: item?.ticket?.ticketSerialNumberHash,
            tokenId: item?.ticket?.id.split("-")[2],
            listed: true,
            price: item?.price,
            deadline: item?.deadline,
          };
        });
      setUserListings(listings);
      setIsLoading(false);
    };
    getUserListings();
  }, [account.address]);

  return { userListings, isLoading };
};

export default useMyTicketsData;
