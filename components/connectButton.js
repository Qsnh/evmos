import { Box, Button, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import BalanceText from "./balanceText";
import ClaimButton from "./claimButton";

import config from "../js/config";

const ConnectButton = () => {
  const [{ data: connectInfo, loading: connectLoading }, connect] =
    useConnect();
  const [{ data: accountInfo }] = useAccount({
    fetchEns: true,
  });

  const [maskAddress, setMaskAddress] = useState(null);

  useEffect(() => {
    if (accountInfo) {
      if (accountInfo.ens) {
        setMaskAddress(accountInfo.ens.name);
      } else {
        setMaskAddress(
          accountInfo.address.substring(0, 6) +
            "..." +
            accountInfo.address.substring(
              accountInfo.address.length - 4,
              accountInfo.address.length
            )
        );
      }
    }
  }, [accountInfo]);

  const connector = new InjectedConnector({ chains: [config.evmosChain] });
  const connectWallet = () => {
    connect(connector);
  };

  return (
    <Box textAlign="center" py="30px">
      {connectInfo.connected ? (
        <Box>
          <Box>
            <Text>{maskAddress}</Text>
          </Box>
          <Box pt="15px">
            <BalanceText address={accountInfo.address}></BalanceText>
          </Box>
          <Box pt="15px">
            <ClaimButton></ClaimButton>
          </Box>
        </Box>
      ) : (
        <Button
          colorScheme="teal"
          isLoading={connectLoading}
          loadingText="连接中"
          onClick={() => connectWallet()}
        >
          连接钱包
        </Button>
      )}
    </Box>
  );
};

export default ConnectButton;
