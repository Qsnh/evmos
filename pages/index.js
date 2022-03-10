import { Box, Text } from "@chakra-ui/react";
import ConnectButton from "../components/connectButton.js";

export default function Home() {
  return (
    <Box>
      <Box py="30px" textAlign="center">
        <Text fontSize="4xl">EVMOS合约交互领取空投</Text>
      </Box>
      <Box textAlign="center" fontSize="14px" color="#000">
        小费：0.5 <em>EVMOS</em>
      </Box>
      <ConnectButton></ConnectButton>
    </Box>
  );
}
