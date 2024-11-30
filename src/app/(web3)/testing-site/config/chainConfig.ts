import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import { arbitrum } from "viem/chains";

export const chain: {
  [key: string]: CustomChainConfig;
} = {
  arbitrum: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xA4B1", // hex of 42161
    rpcTarget: "https://rpc.ankr.com/arbitrum",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Arbitrum Mainnet",
    blockExplorerUrl: "https://arbiscan.io",
    ticker: "AETH",
    tickerName: "AETH",
    logo: "https://web3auth.io/images/web3authlog.png",
  },
  arbitrumSepolia: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x66EEE", // hex of 421614
    rpcTarget: "https://api.zan.top/arb-sepolia",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Arbitrum Sepolia",
    blockExplorerUrl: "https://sepolia.arbiscan.io",
    ticker: "AETH",
    tickerName: "AETH",
    logo: "https://web3auth.io/images/web3authlog.png",
  },
};
