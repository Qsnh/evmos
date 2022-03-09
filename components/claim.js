import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const ClaimButton = () => {
  const [{ data: connectInfo }, connect] = useConnect();
  const [{}, switchChain] = useConnect();
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

  const EVMOS_CHAIN = {
    id: parseInt(process.env.NEXT_PUBLIC_NETWORK_ID),
    name: "Evmos Mainnet",
    nativeCurrency: {
      name: "EVMOS",
      symbol: "symbol",
      decimals: 18,
    },
    rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL],
    blockExplorers: [
      {
        name: "EVMOS",
        url: "https://ftmscan.com",
      },
    ],
  };

  const connector = new InjectedConnector({ chains: [EVMOS_CHAIN] });

  const connectWallet = () => {
    switchChain(250);
    connect(connector).then(({ data }) => {
      if (data.chain.id !== EVMOS_CHAIN.id) {
      }
    });
  };

  return (
    <div>
      {connectInfo.connected ? (
        <div>
          <p>{maskAddress}</p>
          <p>
            <button>交互一下领取空投</button>
          </p>
        </div>
      ) : (
        <div>
          <button onClick={connectWallet}>连接钱包</button>
        </div>
      )}
    </div>
  );
};

export default ClaimButton;
