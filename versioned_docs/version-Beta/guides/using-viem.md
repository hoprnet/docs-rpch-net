---
sidebar_position: 3
---

# RPCh Viem Example Integration

## Description

This example showcases how to integrate the RPCh SDK with the [viem](https://github.com/wagmi-dev/viem) library to create a custom PublicClient. The integration allows for utilizing the Viem library to send requests through the RPCh network instead of directly to an Ethereum RPC provider.

## Example Integration

Find the complete example code on our GitHub [here](https://github.com/Rpc-h/RPCh/blob/main/examples/viem/src/index.ts).

```TypeScript
import SDK from '@rpch/sdk';
import dotenv from 'dotenv';
import { PublicClient, createClient, custom, publicActions } from 'viem';
import { mainnet } from 'viem/chains';
dotenv.config();

const sdk = new SDK(process.env.CLIENT_SECRET!);

function publicRPChClient(): PublicClient {
    return createClient({
        chain: mainnet,
        transport: custom({
            async request({ method, params }) {
                const response = await sdk.send({ method, params, jsonrpc: '2.0' });
                const responseJson = await response.json();
                return responseJson;
            },
        }),
    }).extend(publicActions);
}

publicRPChClient()
    .getBlock()
    .then((res) => console.log(res));

export default publicRPChClient;
```

## Example Breakdown

### Importing Required Modules

The integration begins by importing the necessary modules:

```JavaScript
import SDK from '@rpch/sdk';
import dotenv from 'dotenv';
import { PublicClient, createClient, custom, publicActions } from 'viem';
import { mainnet } from 'viem/chains';
```

### Configuring the Environment

Load the `.env` file to use the `CLIENT_SECRET`:

```JavaScript
dotenv.config();
```

### Creating the PublicClient

Create a custom `PublicClinet` using the viem library:

```JavaScript
function publicRPChClient(): PublicClient {
    return createClient({
        chain: mainnet,
        transport: custom({
            async request({ method, params }) {
                const response = await sdk.send({ method, params, jsonrpc: '2.0' });
                const responseJson = await response.json();
                return responseJson;
            },
        }),
    }).extend(publicActions);
}
```

Within this function:

- The createClient function from Viem is used to specify the blockchain chain (mainnet) and a custom transport method.
- The transport method intercepts requests and sends them through the RPCh network using the provided SDK instance.
- It then processes the response and returns the response JSON.
- The publicActions are extended to the client, allowing standard blockchain requests like getBlock.

### Using the PublicClient

The example usage of publicRPChClient demonstrates a simple request to fetch the latest block:

```JavaScript
publicRPChClient()
    .getBlock()
    .then((res) => console.log(res));
```

- The getBlock action, provided by publicActions, is called on the PublicClient.
- The result is logged to the console.

### Exporting the Client

Finally, publicRPChClient is exported for use throughout the application:

```JavaScript
export default publicRPChClient;
```

## Using the Example

To use this particular [example](https://github.com/Rpc-h/RPCh/blob/main/examples/viem/src/index.ts): 

(**1**) Edit the `.env` file to include your Client secret which you can obtain from the dashboard to [degen.rpch.net](https://degen.rpch.net/)

(**2**) Run `yarn && yarn dev`