"use client";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useAccount, usePublicClient } from "wagmi";
import { formatUnits } from "viem";

import { envVars } from "@/lib/envVars";
import useEventContract from "@/abi/Event";
import usePaymentTokenContract from "@/abi/PaymentToken";

import { ITicket, ITicketListed } from "../types";
import { getListings, getOwnedTickets } from "../gql";

import { OwnedTicketCard } from "./OwnedTicketCard";
import ListedTicketCard from "./ListedTicketCard";

export default function TicketMarketplace() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const EventContract = useEventContract();
  const PaymentTokenContract = usePaymentTokenContract();

  const [ownedTickets, setOwnedTickets] = useState<ITicket[]>([]);
  const [listedTickets, setListedTickets] = useState<ITicketListed[]>([]);
  const [allTicketsData, setAllTicketsData] = useState<
    Record<string, { seat: string; ticketSerialNumberHash: bigint }>
  >({});

  const allTicketsList = useMemo(() => {
    if (ownedTickets.length || listedTickets.length) {
      const owned = ownedTickets.map((ticket) => ticket.tokenId.toString());
      const listed = listedTickets.map((ticket) => ticket.tokenId.toString());
      const ownedSet = new Set(owned);
      const mergedTickets = [
        ...owned,
        ...listed.filter((tokenId) => !ownedSet.has(tokenId)),
      ];
      console.log({ mergedTickets });
      return mergedTickets;
    }

    return [];
  }, [ownedTickets, listedTickets]);

  useMemo(() => {
    if (ownedTickets.length && listedTickets.length) {
      const refreshedOwned = ownedTickets.map((ticket) => {
        const listedTicket = listedTickets.find(
          (listedTicket) => listedTicket.tokenId === ticket.tokenId
        );
        if (listedTicket) {
          ticket.listed = true;
        }
        return ticket;
      });

      return refreshedOwned;
    }
    return ownedTickets; // Return the original if no changes
  }, [ownedTickets, listedTickets]);

  // useEffect(() => {
  //   setOwnedTickets(refreshedOwned);
  // }, [refreshedOwned]);

  // Fetch owned tickets (simplified, you'd need to implement this based on your contract)
  useEffect(() => {
    // Fetch tickets metadata logic here
    // Here, currently we only have one contract so  we're just fetching from that one
    // TODO: Later on, we need to implement a common system to accomodate multiple events
    if (
      publicClient &&
      address &&
      EventContract.address !== "0x" &&
      allTicketsList.length
    ) {
      publicClient
        .getContractEvents({
          address: EventContract.address,
          abi: EventContract.abi,
          eventName: "TicketCreated",
          args: {
            tokenId: allTicketsList.map(BigInt),
          },
          fromBlock: BigInt(93994776),
        })
        .then((ticketsData: any) => {
          console.log({ ticketsData });
          const allTicketsData: Record<
            string,
            { seat: string; ticketSerialNumberHash: bigint }
          > = {};
          ticketsData.forEach((ticketData: any) => {
            console.log({ ticketData: ticketData.args });
            const ticket = ticketData.args;
            allTicketsData[ticket.tokenId.toString()] = {
              seat: ticket.seat,
              ticketSerialNumberHash: ticket.ticketSerialNumberHash,
            };
          });
          setAllTicketsData(allTicketsData);

          // setOwnedTickets(ownedTickets);
        });
    }
  }, [publicClient, address, EventContract, allTicketsList]);

  useEffect(() => {
    // Fetch listed tickets logic here
    console.log({ address });
    if (address) {
      axios
        .post(envVars.subgraphUrl, {
          query: getOwnedTickets,
          variables: { id: `user-${address}` },
        })
        .then((response) => {
          const owned = response.data.data.user.ticketsOwned.items.map(
            (ticket: any) => {
              return {
                listed: false,
                owner: ticket.owner.address,
                seat: "",
                tokenId: ticket.id.split("-")[2],
                event: {
                  name: ticket.event.name,
                  date: Number(ticket.event.eventDate),
                },
              };
            }
          );
          setOwnedTickets(owned);
        });
    }
  }, [address]);

  // useEffect(() => {
  //   console.log({ allTickets });
  // }, [allTickets]);

  // Fetch listed tickets (simplified, you'd need to implement this based on your contract)
  useEffect(() => {
    // Fetch listed tickets logic here
    axios
      .post(envVars.subgraphUrl, { query: getListings, variables: {} })
      .then((response) => {
        const listing: ITicketListed[] = response.data.data.listings.items.map(
          (ticket: any) => {
            const seller = ticket.seller.address;
            const price = formatUnits(
              BigInt(ticket.price),
              PaymentTokenContract.decimals
            );
            const isExpired = Date.now() > Number(ticket.deadline) * 1000;
            if (isExpired) {
              return;
            }
            return {
              owner: seller,
              listed: true,
              seat: "",
              tokenId: ticket.ticketId.split("-")[2],
              price,
              deadline: Number(ticket.deadline),
              event: {
                name: ticket.event.name,
                date: Number(ticket.event.eventDate),
              },
            };
          }
        );
        const filteredListing = listing.filter((item) => item !== undefined);
        console.log({ filteredListing });
        setListedTickets(filteredListing);
      });
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ownedTickets.map((ticket) => (
          <OwnedTicketCard
            key={ticket.tokenId.toString()}
            ticket={ticket}
            allTicketsData={allTicketsData}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listedTickets.map((ticket) => (
          <ListedTicketCard
            key={ticket.tokenId}
            ticket={ticket}
            allTicketsData={allTicketsData}
          />
        ))}
      </div>
    </div>
  );
}
