import { Button } from "@chakra-ui/react";
import { useContractWrite } from "wagmi";

import EVMOS_BAI from "../assets/contracts/EVMOS.json";
import { utils } from "ethers";

const ClaimButton = () => {
  const [{ loading }, write] = useContractWrite(
    {
      addressOrName: process.env.NEXT_PUBLIC_CONTRACT,
      contractInterface: EVMOS_BAI,
    },
    "hit",
    {
      overrides: {
        value: utils.parseEther("0.5"),
      },
    }
  );

  const hit = () => {
    write().then(({ data }) => {
      // data.hash
    });
  };

  return (
    <Button colorScheme="teal" isLoading={loading} onClick={() => hit()}>
      交互一次
    </Button>
  );
};

export default ClaimButton;
