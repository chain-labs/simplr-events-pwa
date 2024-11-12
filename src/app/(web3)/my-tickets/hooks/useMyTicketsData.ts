import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";

import { envVars } from "@/lib/envVars";

import { ITicketListed } from "../../marketplace/types";
import { GetUserBought, GetUserListings, GetUserSold } from "../gql";

const useMyTicketsData = () => {
  const account = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [userListings, setUserListings] = useState<ITicketListed[]>([]);
  const [userBought, setUserBought] = useState<ITicketListed[]>([]);
  const [userSold, setUserSold] = useState<ITicketListed[]>([]);

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
              date: item?.ticket?.event?.eventDate,
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
    };
    const getUserBought = async () => {
      if (!account.address) {
        setUserBought([]);
        return;
      }

      const userBoughtData = await axios.post(envVars.subgraphUrl, {
        query: GetUserBought,
        variables: {
          userId: `user-${account.address}`,
        },
      });
      const bought: ITicketListed[] =
        userBoughtData.data?.data?.escrows?.items.map((item: any) => {
          return {
            event: {
              name: item?.event?.name,
              date: item?.event?.eventDate,
              image: item?.ticket?.tokenMetadata?.image,
            },
            owner: item.sellerId.split("-")[1],
            seat: item?.ticket?.seat,
            ticketSerialNumberHash: item?.ticket?.ticketSerialNumberHash,
            tokenId: item?.ticket?.id.split("-")[2],
            listed: false,
            price: item?.ticket?.listings?.items[0]?.price ?? "0",
            deadline: item?.ticket?.event?.eventData ?? "0",
            isResolved: item?.isResolved,
            isDisputed: item?.isDisputed,
          };
        }) ?? [];

      console.log({ bought });

      setUserBought(bought);
    };
    const getUserSold = async () => {
      if (!account.address) {
        setUserBought([]);
        return;
      }

      const userSoldData = await axios.post(envVars.subgraphUrl, {
        query: GetUserSold,
        variables: {
          userId: `user-${account.address}`,
        },
      });
      const sold: ITicketListed[] =
        userSoldData?.data?.data?.escrows?.items?.map((item: any) => {
          return {
            event: {
              name: item?.event?.name,
              date: item?.event?.eventDate,
              image: item?.ticket?.tokenMetadata?.image,
            },
            owner: item.sellerId.split("-")[1],
            seat: item?.ticket?.seat,
            ticketSerialNumberHash: item?.ticket?.ticketSerialNumberHash,
            tokenId: item?.ticket?.id.split("-")[2],
            listed: false,
            price: item?.ticket?.listings?.items[0]?.price ?? "0",
            deadline: item?.ticket?.event?.eventData ?? "0",
            isResolved: item?.isResolved,
            isDisputed: item?.isDisputed,
          };
        }) ?? [];

      console.log({ sold });

      setUserSold(sold);
    };
    const getAllData = async () => {
      await getUserListings();
      await getUserBought();
      await getUserSold();
      setIsLoading(false);
    };
    try {
      getAllData();
    } catch (err) {
      console.log("Error while fetching user data");
      console.log({ err });
    }
  }, [account.address]);

  return { userListings, isLoading, userBought, userSold };
};

export default useMyTicketsData;
