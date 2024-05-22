import React, { useEffect, useRef, useState } from "react";
import { initOnRamp } from "@coinbase/cbpay-js";

type InitOnRampOptions = Parameters<typeof initOnRamp>[0];

type CoinbaseButtonProps = {
  destinationWalletAddress: string;
};

const buttonStyles = {
  background: "transparent",
  border: "1px solid transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: 200,
  fontSize: 20,
  backgroundColor: "#0052FF",
  paddingLeft: 15,
  paddingRight: 30,
  borderRadius: 10,
};

export default function CoinbaseBuy({ destinationWalletAddress }: CoinbaseButtonProps) {
  const [isReady, setIsReady] = useState(false);
  const onrampInstance = useRef();

  useEffect(() => {
    //initOnRamp parameters
    const options: InitOnRampOptions = {
      appId: "10c23224-6d97-472f-ac56-61ffc6ccd8af",
      target: "#cbpay-container",
      widgetParameters: {
        destinationWallets: [
          {
            address: "0xc1C4F7AD285BD55cb374926A9fdC18AFD2fc48fd",
            supportedNetworks: ["ethereum"],
          },
        ],
      },
      onSuccess: () => {
        // handle navigation when user successfully completes the flow
      },
      onExit: () => {
        // handle navigation from dismiss / exit events due to errors
      },
      onEvent: (event: any) => {
        // event stream
      },
      experienceLoggedIn: "embedded",
      experienceLoggedOut: "popup",
    };

    // instance.destroy() should be called before initOnramp if there is already an instance.
    if (onrampInstance.current) {
      onrampInstance.current.destroy();
    }

    initOnRamp(options, (error, instance) => {
      if (instance) {
        onrampInstance.current = instance;
        setIsReady(true);
      }
    });
  }, [destinationWalletAddress]);

  const handleOnPress = () => {
    onrampInstance.current.open();
  };

  // render with button from previous example
  return (
    <div>
      <button style={buttonStyles} disabled={!isReady} onClick={handleOnPress}>
        Buy Eth on Base
      </button>
    </div>
  );
}
