---
sidebar_position: 2
---

# RPCh Ethers Example Integration

## Description

This is an example of integrating the RPCh SDK into a project which uses the ethers library. In this example an RPCh ethers adapter is created as an extension of the original `JsonRPCProvider`, which allows clients to use drop-in and replace so that they can send their RPC requests through the RPCh network.

## Example Integration

You can view the entirety of the example code within our GitHub [here](https://github.com/Rpc-h/RPCh/blob/main/examples/ethers/src/index.ts).

```javascript
import SDK, { JRPC } from '@rpch/sdk';
import { JsonRpcProvider, JsonRpcPayload, JsonRpcResult } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

export class RPChProvider extends JsonRpcProvider {
    constructor(
        public readonly url: string,
        public readonly sdk: SDK,
    ) {
        super(url);
    }

    /**
     * sends singular or multiple requests through RPCh network
     */
    async _send(payload: JsonRpcPayload | Array<JsonRpcPayload>): Promise<Array<JsonRpcResult>> {
        try {
            const payloads = Array.isArray(payload) ? payload : [payload];
            const responses = await Promise.all(
                payloads.map(async (payload) => (await this.sdk.send(payload)).json()),
            );
            // responses need to have a response property
            // and the id needs to be a number to meet the type
            // requirements for JsonRpcResult
            return responses.map((res) => ({
                ...res,
                id: Number(res.id),
                result: JRPC.isError(res) ? res.error : res.result,
            }));
        } catch (error) {
            console.log(error);
            this.emit('debug', {
                action: 'response',
                error: error,
                provider: this,
            });

            throw error;
        }
    }
}

/**
 * Example of how to use RPChProvider
 */
async function example() {
    // This client secret can be found in your dashboard
    const sdk = new SDK(process.env.CLIENT_SECRET!);
    const provider = new RPChProvider('https://ethereum-provider.rpch.tech', sdk);
    const response = await provider.send('eth_blockNumber', []);
    return response;
}

example()
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
```

## Example Breakdown

### Importing Required Modules

Start by importing the necessary modules from the @rpch/sdk, ethers, and dotenv packages:

```javascript
import SDK, { JRPC } from '@rpch/sdk';
import { JsonRpcProvider, JsonRpcPayload, JsonRpcResult } from 'ethers';
import dotenv from 'dotenv';
```

### Configuring the Environment

Load the environment variables from your `.env` file where your CLIENT_SECRET is stored:

```javascript
dotenv.config();
```

### Extending JsonRpcProvider

Define the RPChProvider class extending the JsonRpcProvider class from the ethers library. This class takes a URL and an instance of the SDK as parameters.

```javascript
export class RPChProvider extends JsonRpcProvider {
    constructor(
      public readonly url: string, 
      public readonly sdk: SDK
    ) {
      super(url);
    }
```

### Overriding the _send Method

Override the _send method to handle the sending of RPC requests. The method can take either a singular JsonRpcPayload or an array of JsonRpcPayload objects.

```javascript
async _send(payload: JsonRpcPayload | Array<JsonRpcPayload>): Promise<Array<JsonRpcResult>> {
      try {
          const payloads = Array.isArray(payload) ? payload : [payload];
          const responses = await Promise.all(
              payloads.map(async (payload) => (await this.sdk.send(payload)).json()),
          );
          // responses need to have a response property
          // and the id needs to be a number to meet the type
          // requirements for JsonRpcResult
          return responses.map((res) => ({
              ...res,
              id: Number(res.id),
              result: JRPC.isError(res) ? res.error : res.result,
          }));
      } catch (error) {
          console.log(error);
          this.emit('debug', {
              action: 'response',
              error: error,
              provider: this,
          });

          throw error;
      }
  }
```

Within this method:

- Normalize the payload to always be an array.
- Send each payload through the RPCh network using the SDK.
- Format the responses to comply with the JsonRpcResult type.
- Handle any errors that occur during the request process.

### Example Usage

The example function demonstrates how to use the RPChProvider, in this case for a simple request to get the latest Ethereum block number:

- Initialize the SDK with the client secret obtained from the RPCh dashboard.
- Create an instance of RPChProvider with the RPC URL and initialized SDK.
- Send a request using the provider instance.
- Log the result or any caught errors.

```javascript
async function example() {
    // This client secret can be found in your dashboard
    const sdk = new SDK(process.env.CLIENT_SECRET!);
    const provider = new RPChProvider('https://ethereum-provider.rpch.tech', sdk);
    const response = await provider.send('eth_blockNumber', []);
    return response;
}

example()
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
```

Similar to this example, you can now use the RPCh SDK for any requests you would otherwise make directly to your RPC provider. 

## Using the Example

To use this particular [example](https://github.com/Rpc-h/RPCh/blob/main/examples/ethers/src/index.ts): 

(**1**) Edit the `.env` file to include your `Client Secret` which you can obtain from the dashboard at [degen.rpch.net](https://degen.rpch.net/)

(**2**) Run `yarn && yarn dev`