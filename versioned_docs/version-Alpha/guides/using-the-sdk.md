---
sidebar_position: 3
---

# RPCh SDK

## Description

RPCh SDK is a library used by a client who wants to access the RPCh network.
Through the SDK, the client should be able to send traffic through the RPCh network and maintain a reliability metric of used HOPR entry nodes.

## How to use SDK
You must have Node.js and npm/yarn installed on your computer. You can download them from their official website or use a package manager like Homebrew (for Mac) or Chocolatey (for Windows).

### Install necessary packages

```
yarn add @rpch/crypto @rpch/sdk
```

Get your rpch client by running
```
curl --request GET \
  --url https://staging.discovery.rpch.tech/api/v1/request/trial
```
or go to https://access.rpch.net/ and follow the docker guide

### Using the SDK

You can create an instance of the SDK by passing in the required options and key-value store functions:
```TypeScript
import * as RPChCrypto from "@rpch/crypto";
import SDK from "@rpch/sdk";

const sdk = new SDK(
  {
    crypto: RPChCrypto,
    client: "trial",
    timeout: 20000,
    discoveryPlatformApiEndpoint: "https://staging.discovery.rpch.tech",
  },
  setKeyValFunction,
  getKeyValFunction
);
```
Here are the available options:

- crypto: The RPChCrypto module is required for cryptographic operations. Learn more about what module to pass [here](https://github.com/Rpc-h/crypto#rpch-crypto)
- client: A string that identifies the client using the SDK. This is used for statistics and logging.
- timeout: The timeout for requests in milliseconds.
- discoveryPlatformApiEndpoint: The URL for the discovery platform API.

The setKeyValFunction and getKeyValFunction functions are used to store and retrieve key-value pairs for the SDK. These are used to store counters for outgoing requests and responses.

```TypeScript
// This is an example of a simple way to set these functions
async function setKeyVal(key: string, val: string): Promise<void> {
  localStorage.setItem(key, val);
}

async function getKeyVal(key: string): Promise<string | undefined> {
  return localStorage.getItem(key);
}
```

Before you can send requests through the SDK, you must start it by calling the start method:
```TypeScript
await sdk.start();
```
This will fetch the required data from the discovery platform and start any necessary intervals.


Sending a request consists of 2 steps:
1. creating the request `const req = await sdk.createRequest("provider", "body");` The first argument is the provider name and the second argument is the request body.
2. sending the previously created request `const res = await sdk.sendRequest(req);` This will send the request through the HOPR network and return the response. If there is an error, it will be thrown.

When you are finished using the SDK, be sure to call the stop method:
```TypeScript
await sdk.stop();
```
This will stop any necessary intervals and clear up any remaining processes.

### Enable debugging logs

Depending on which platform you are running the SDK, you need to enable debugging in different ways.
We use the library [debug](https://github.com/debug-js/debug) for our logging.

- on nodejs: you need to run the instance with the following environment variable `DEBUG="rpch*" ..`
- on web platforms:
  - localStorage: update `localStorage` with keyval `debug:rpch*`
  - programmatic: access the SDK object and enable logging with `sdk.debug.enable("rpch*")`

## Example Integrations

Using the SDK directly will not have an as standardised approach as using an RPCh adapter such as our [ethers adapter.](./using-ethers.md) Instead, it will require a little more effort to understand the project's codebase, where it is interacting with its provider and what methods to overwrite. 

Looking at other examples of such integrations will be useful, even if they cannot be copied one-to-one. The below documentation will be updated with the Frame Wallet integration soon.

### Frame

This integration example will be added soon.

### RPC Server

You can see how the SDK was used similarly within the RPC server [here.](https://github.com/Rpc-h/RPCh/blob/f1bc164a9671f9e1ce6c7b204a47def4c5a16179/apps/rpc-server/src/index.ts#L55)

| environment       | example                                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node.js           | [repo](https://github.com/Rpc-h/RPCh/tree/main/apps/rpc-server), [Example 1](https://github.com/Rpc-h/RPCh/blob/f1bc164a9671f9e1ce6c7b204a47def4c5a16179/apps/rpc-server/src/index.ts#L55)                                        |

### Simple Use Case

The following script is a straightforward example demonstrating how to use the RPCh SDK to request the details of the latest block from the Ethereum blockchain. This is not a full integration example, but it serves as a guide for understanding the SDK's usage.

You can view the simple script [here.](https://github.com/0xbhagi/rpcs_prototype/blob/main/index.cjs)

The script shows five steps which are instructional for any integration.

#### (1) Import required modules:

- RPChCrypto: Import the necessary cryptographic functions from your chosen version of RPCh Crypto (here: "@rpch/crypto") package.
- SDK: Import the main class for interacting with the RPCh platform from the "@rpch/sdk" package.

```TypeScript
const RPChCrypto = require("@rpch/crypto");
const SDK = require("@rpch/sdk").default;
```

#### (2) Implement local storage helper functions:

These two functions will be used by the SDK to manage its internal state.

- `setKeyVal`: Asynchronously store a key-value pair in the local storage.
- `getKeyVal`: Asynchronously retrieve the value associated with a key from the local storage.

```TypeScript
async function setKeyVal(key, val) {
  localStorage.setItem(key, val);
}

async function getKeyVal(key) {
  return localStorage.getItem(key);
}
```

#### (3) Initialize the RPCh SDK:

Create a new instance of the SDK with the necessary parameters and the local storage functions.

```TypeScript
const sdk = new SDK(
  {
    crypto: RPChCrypto,
    client: "your_client_name",
    timeout: 20000,
    discoveryPlatformApiEndpoint: "https://staging.discovery.rpch.tech",
  },
  setKeyVal,
  getKeyVal
);
```

#### (4) Start & Stop the SDK Before & After Using it:

- Start the SDK with `await sdk.start()`
- Stop the SDK with `await sdk.stop()`

```TypeScript
async function getLatestBlock() {
  await sdk.start();
  // ... (code from the original script)
  await sdk.stop();
}
```

#### (5) Correctly Use the Create & Send Request Functions:

Sending a requests consists of 2 steps:

- Creating the request `const req = await sdk.createRequest("provider", "body");` The first argument is the provider name and the second argument is the request body.
- Sending the previously created request `const res = await sdk.sendRequest(req);` This will send the request through the HOPR network and return the response. If there is an error, it will be thrown.

You can see this used correctly within the main method of the script:

```TypeScript
async function getLatestBlock() {
  await sdk.start();

  // Create and send a request to get the latest block number
  const blockNumberRequest = await sdk.createRequest(
    "ethereum",
    JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] })
  );
  const blockNumberResponse = await sdk.sendRequest(blockNumberRequest);
  const blockNumber = parseInt(blockNumberResponse.body.result, 16);

  // Create and send a request to get the block details
  const blockDetailsRequest = await sdk.createRequest(
    "provider",
    JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: "eth_getBlockByNumber",
      params: [blockNumber, true],
    })
  );
  const blockDetailsResponse = await sdk.sendRequest(blockDetailsRequest);

  await sdk.stop();

  return JSON.parse(blockDetailsResponse.body.result);
}
```

The above method does the following:

- Start the SDK with `await sdk.start()`
- Create and send a request to get the latest block number using the `eth_blockNumber` method 
- Parse the response to obtain the block number
- Convert the block number from hexadecimal to an integer
- Create and send a request to get the details of the latest block by its number using the `eth_getBlockByNumber` method
- Parse the response to obtain the block details
- Stop the SDK with `await sdk.stop()`
- Return the block details

The remaining few lines of [the script](https://github.com/0xbhagi/rpcs_prototype/blob/main/index.cjs) just call the method and handle its response.
This script was created as an educational use case. For custom integrations of RPCh within your project, you will have to similarly setup and initialize the SDK before overwriting its existing interaction with its provider with ones that use the SDK as this [example script](https://github.com/0xbhagi/rpcs_prototype/blob/main/index.cjs) does. 