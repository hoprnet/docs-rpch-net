---
sidebar_position: 4
---

# RPCh Wagmi Example Integration

## Description

The following documentation provides an integration example of the RPCh SDK with the Wagmi library. Wagmi is a set of React Hooks for Ethereum, which allows for a more straightforward way to interface with Ethereum blockchains in React applications.

## Example Integration

Find the complete example code on our GitHub [here](https://github.com/Rpc-h/RPCh/blob/main/examples/wagmi/src/App.tsx).

```TypeScript
import SDK from "@rpch/sdk";
import { Chain, PublicClient, Transport, createClient, custom, publicActions } from "viem";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import Profile from "./Profile";
import { CLIENT_SECRET } from "./config";

const sdk = new SDK(CLIENT_SECRET);

function publicRPChClient(): PublicClient<Transport, Chain> {
  return createClient({
    chain: mainnet,
    transport: custom({
        async request({ method, params }) {
            try {
                const response = await sdk.send({ method, params, jsonrpc: "2.0" });
                const responseJson = await response.json();

                return "error" in responseJson
                    ? responseJson.error
                    : responseJson.result;
            } catch (e) {
                console.log(e);
            }
        },
    }, {
        retryCount: 3,
        retryDelay: 3_000,
    }),
  }).extend(publicActions);
}

const config = createConfig({
  autoConnect: true,
  publicClient: publicRPChClient(),
});

export default function App() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  );
}
```

## Example Breakdown

### Importing Required Modules
Begin by importing the necessary modules from the viem and wagmi libraries, and the SDK from @rpch/sdk:

```JavaScript
import SDK from "@rpch/sdk";
import { Chain, PublicClient, Transport, createClient, custom, publicActions } from "viem";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
```

### Initializing the RPCh SDK

Initialize the RPCh SDK with the client secret, you can get a client secret from your dashboard at [degen.rpch.net](https://degen.rpch.net/):

```JavaScript
const sdk = new SDK(CLIENT_SECRET);
```

### Configuring the PublicClient for Viem

Set up a PublicClient with a custom transport method to intercept and forward blockchain requests through the RPCh network:

```JavaScript
function publicRPChClient(): PublicClient<Transport, Chain> {
  return createClient({
    chain: mainnet,
    transport: custom(
      {
        async request({ method, params }) {
          try {
            const response = await sdk.send({ method, params, jsonrpc: "2.0" });
            const responseJson = await response.json();

            return "error" in responseJson
              ? responseJson.error
              : responseJson.result;
          } catch (e) {
            console.log(e);
          }
        },
      },
      {
        retryCount: 3,
        retryDelay: 3_000,
      }
    ),
  }).extend(publicActions);
}
```

The custom transport method does the following:

- It sends the request to the RPCh network using the sdk.send method.
- It then waits for the response and parses the JSON.
- The method either returns the result of the call or the error if one occurs.
- There is also a retry strategy implemented in case of transient network issues.

### Creating Wagmi Config

Create a Wagmi configuration that uses the PublicClient from Viem:

```JavaScript
const config = createConfig({
  autoConnect: true,
  publicClient: publicRPChClient(),
});
```

This configuration includes:

- autoConnect: Automatically connects to the user's Ethereum provider when the app starts.
- publicClient: Utilizes the publicRPChClient which is configured to use the RPCh network.

### Constructing the App Component

Define the App component which wraps the Profile component with WagmiConfig:

```JavaScript
export default function App() {
  return (
    <WagmiConfig config={config}>
      <Profile />
    </WagmiConfig>
  );
}
```

The WagmiConfig component provides the Wagmi context to the Profile component, enabling it to interact with Ethereum through the configured RPCh network.

## Using the Example

To use this particular [example](https://github.com/Rpc-h/RPCh/blob/main/examples/wagmi/src/App.tsx): 

(1) Add your `CLIENT_SECRET` in the `config.ts` file.

(2) Run `yarn && yarn dev`

(3) Start your application and ensure that the Profile component makes use of the Wagmi hooks to interact with the Ethereum blockchain via RPCh.