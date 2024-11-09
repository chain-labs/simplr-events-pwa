import { arbitrum, arbitrumSepolia } from "wagmi/chains";

export const CONTRACTS = {
  [arbitrumSepolia.id]: {
    event: "0x15bc70911A7c5D440ce2A311b11CbE856A42A2F0",
    marketplace: "0x5f72991538837Ba3D7D44885F8E691c14397e0dD",
    escrow: "0x6E7e5BE250d92f7451235c4c927332E7e075bF24",
    paymentToken: "0x380b37739F108c89a08D6E49D890C1CEdbdDCB55",
  },
  [arbitrum.id]: {
    event: "0x15bc70911A7c5D440ce2A311b11CbE856A42A2F0",
    marketplace: "0x5f72991538837Ba3D7D44885F8E691c14397e0dD",
    escrow: "x6E7e5BE250d92f7451235c4c927332E7e075bF24",
    paymentToken: "0x380b37739F108c89a08D6E49D890C1CEdbdDCB55",
  },
};
