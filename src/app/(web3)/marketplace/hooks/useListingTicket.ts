import {
  getWalletClient,
  waitForTransactionReceipt,
  readContract,
} from "@wagmi/core";
import axios from "axios";
import {
  useAccount,
  useConfig,
  usePublicClient,
  useWriteContract,
} from "wagmi";
import { arbitrum, arbitrumSepolia } from "viem/chains";
import { encodeAbiParameters, keccak256, parseUnits, toBytes } from "viem";

import { envVars } from "@/lib/envVars";
import { IPaymentContract } from "@/abi/PaymentToken";
import { IContract } from "@/abi/Escrow";
import { EVENTS } from "@/content";

import { FormData } from "../components/ListButton/types";

type Props = {
  formData: FormData;
  ticketData: `0x${string}` | null;
};
// 15th November 2024 4pm Thailand time

const getLatestTokenId = async (event: string) => {
  // const query = `query MyQuery($id: String!) {
  //   event(id: $id) {
  //       tickets {
  //           items {
  //               id
  //           }
  //       }
  //   }
  // }`;
  // const variables = { id: `event-${event}` };

  // const response = await axios.post(envVars.subgraphUrl, { query, variables });

  const response = await axios.get(`/api/metadata?event=${event}`);
  const tokenId = response.data.count ?? 0;
  return `${tokenId + 1}`;
};

const useListingTicket = ({ formData, ticketData }: Props) => {
  const account = useAccount();
  const { writeContractAsync: listTicket } = useWriteContract();
  const { writeContractAsync: approveTransfer } = useWriteContract();
  const { writeContractAsync: mintWrite } = useWriteContract();
  const config = useConfig();
  const client = usePublicClient();

  const handleMint = async (EventContract: IContract) => {
    // upload metadata and get uri
    const tokenIdCounter = await readContract(config, {
      abi: EventContract.abi,
      address: EventContract.address,
      functionName: "tokenIdCounter",
      args: [],
    });
    const tokenId = ((tokenIdCounter as bigint) + BigInt(1)).toString();
    console.log({ tokenId });
    const data = {
      tokenId,
      eventContract: EventContract.address,
      name: `Digital Twin for ${EVENTS.tbw.event_name}`,
      description: `NFT Ticket provided by Simplr Events for ${EVENTS.tbw.event_name}`,
      image: EVENTS.tbw.image,
      attributes: [
        {
          trait_type: "Seat",
          value: formData.seat,
        },
        {
          trait_type: "Event Name",
          value: EVENTS.tbw.event_name,
        },
        {
          trait_type: "Event Date",
          value: EVENTS.tbw.event_date,
        },
      ],
    };
    const uploadResponse = await axios.post("/api/metadata", data);
    console.log({
      uploadResponse,
    });

    const options = {
      address: EventContract?.address,
      abi: EventContract?.abi,
      functionName: "createTicket",
      args: [
        {
          ticketSerialNumberHash: keccak256(toBytes(formData.serialNumber)),
          seat: formData.seat,
          verificationData: ticketData, // bytes data
          ticketEncryptedDataUri: "", // lit protocol's encrypted data
          ticketMetadata: `${
            envVars.isTestNetwork
              ? "https://simplrhq.com"
              : "https://stage-simplrhq-devcon.vercel.app"
          }/api/metadata/${EventContract.address}/${tokenId}`, // public metadata
        },
      ] as const,
    };
    console.log({ options });

    const sim = await client?.estimateContractGas({
      ...options,
      account: account.address,
    });
    const finalGas = (sim as bigint) + (sim as bigint) / BigInt(2);
    const mintTx = await mintWrite({
      ...options,
      gas: finalGas,
    });
    const receipt = await waitForTransactionReceipt(config, { hash: mintTx });
    console.log({ receipt });
    return tokenId;
  };

  const handleApprove = async (
    EventContract: IContract,
    MarketplaceContract: IContract
  ) => {
    const options = {
      address: EventContract.address,
      abi: EventContract.abi,
      functionName: "setApprovalForAll",
      args: [MarketplaceContract.address, true],
    };

    const sim = await client?.estimateContractGas({
      ...options,
      account: account.address,
    });
    console.log({ approveGas: (sim as bigint) + BigInt(150000) });

    const approveTx = await approveTransfer({ ...options, gas: sim });
    const receipt = await waitForTransactionReceipt(config, {
      hash: approveTx,
    });

    console.log("Approval receipt:", receipt);
  };

  const handleSignature = async (
    tokenId: string,
    EventContract: IContract,
    MarketplaceContract: IContract,
    PTContract: IPaymentContract
  ) => {
    console.log({ formData });

    const client = await getWalletClient(config);

    const domain = {
      // sampled from Marketplace.sol:~line 60
      name: "SimplrMarketplace",
      version: "1.0.0",
      chainId: envVars.isTestNetwork ? arbitrumSepolia.id : arbitrum.id,
      verifyingContract: MarketplaceContract.address,
    } as const;

    const types = {
      // sampled from Marketplace.sol:~line 16 :-
      //    Listing(address eventContract,uint256 tokenId,uint256 price,address seller,uint256 deadline)
      Listing: [
        { name: "eventContract", type: "address" },
        { name: "tokenId", type: "uint256" },
        { name: "price", type: "uint256" },
        { name: "seller", type: "address" },
        { name: "deadline", type: "uint256" },
      ],
    } as const;

    const signature = await client?.signTypedData({
      account: account.address ?? "0x",
      domain,
      types,
      primaryType: "Listing",
      message: {
        eventContract: EventContract.address,
        tokenId: BigInt(tokenId),
        price: parseUnits(formData.price, PTContract.decimals),
        seller: account.address ?? "0x",
        deadline: BigInt(EVENTS.tbw.deadline),
      },
    });

    console.log({ signature });

    return signature;
  };

  const handleList = async (
    signature: string,
    tokenId: string,
    EventContract: IContract,
    MarketplaceContract: IContract,
    PTContract: IPaymentContract
  ) => {
    if (formData.price && signature) {
      const options = {
        address: MarketplaceContract.address,
        abi: MarketplaceContract.abi,
        functionName: "listTicket",
        args: [
          {
            eventContract: EventContract.address,
            tokenId: tokenId,
            price: parseUnits(formData.price, PTContract.decimals),
            seller: account.address as `0x${string}`,
            deadline: BigInt(EVENTS.tbw.deadline),
          },
        ],
      };

      const sim = await client?.estimateContractGas({
        ...options,
        account: account.address,
      });

      console.log({ listGas: sim });

      const tx = await listTicket?.({
        ...options,
        gas: (sim as bigint) + BigInt(100000),
      });

      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: tx,
      });

      if (transactionReceipt) {
        const response = await axios.post("/api/listings", {
          sellerAddress: account.address,
          ticketId: `ticket-${EventContract.address}-${tokenId}`,
          signature,
        });
        console.log({ response });
      }
    }
  };

  return {
    handleMint,
    handleApprove,
    handleSignature,
    handleList,
  };
};

export default useListingTicket;
