import { CHAIN_NAMESPACES } from "@web3auth/base";

export const CHAINS = {
  mainnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xa4b1",
    rpcTarget: "https://arbitrum-bundler.etherspot.io/",
    displayName: "Arbitrum One",
    blockExplorer: "https://arbiscan.io/",
    ticker: "ETH",
    tickerName: "Ether",
  },
  testnet: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x66eee",
    rpcTarget: "https://testnet-rpc.etherspot.io/v1/421614",
    displayName: "Arbitrum Sepolia",
    blockExplorer: "https://sepolia.arbiscan.io/",
    ticker: "ETH",
    tickerName: "Ether",
  },
};
