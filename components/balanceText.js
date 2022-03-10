import { useBalance } from "wagmi";
import { Text, Box, Spinner } from "@chakra-ui/react";

const BalanceText = (props) => {
  const [{ data, loading, error }] = useBalance({
    addressOrName: props.address,
    watch: true,
  });

  if (loading) {
    return <Spinner colorScheme="teal" />;
  }

  if (error) {
    return <Text>无法获取余额</Text>;
  }

  if (!data) {
    return null;
  }

  return (
    <Text>
      {data.formatted} <em>EVMOS</em>
    </Text>
  );
};

export default BalanceText;
