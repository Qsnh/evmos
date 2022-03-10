export default {
  evmosChain: {
    id: parseInt(process.env.NEXT_PUBLIC_NETWORK_ID),
    name: "Evmos",
    nativeCurrency: {
      name: "EVMOS",
      symbol: "symbol",
      decimals: 18,
    },
    rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
    blockExplorers: [
      {
        name: "EvmosScan",
        url: "https://evm.evmos.org",
      },
    ],
  },
};
