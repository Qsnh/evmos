import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider, chain } from "wagmi";
import { ethers } from "ethers";
import config from "../js/config";

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID;

const provider = ({ chainId }) => {
  if (chainId === 3) {
    return ethers.getDefaultProvider(chain.ropsten.id, {
      infura: INFURA_ID,
    });
  } else if (chainId === 250) {
    return ethers.providers.JsonRpcProvider(config.evmosChain.rpcUrls[0]);
  }
  return ethers.getDefaultProvider();
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider provider={provider}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
