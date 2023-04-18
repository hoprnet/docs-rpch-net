---
sidebar_position: 3
---

# RPCh SDK

## Description

RPCh SDK is a library used by a client who wants to access the RPCh network.
Through the SDK, the client should be able to send traffic through the RPCh network and maintain a reliability metric of used HOPR entry nodes.

## How to use SDK
You must have Node.js and npm/yarn installed on your computer. You can download them from their official website or use a package manager like Homebrew (for Mac) or Chocolatey (for Windows).

```
yarn add @rpch/crypto @rpch/sdk
```

You can create an instance of the SDK by passing in the required options and key-value store functions:
```TypeScript
import * as RPChCrypto from "@rpch/crypto";
import SDK from "@rpch/sdk";

const sdk = new SDK(
  {
    crypto: RPChCrypto,
    client: "your_client_name",
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

## Example Integrations

Using the SDK directly will not have an as standardised approach as using an RPCh adapter such as our [ethers adapter.](./using-ethers.md) Instead, it will require a little more effort to understand the project's codebase, where it is interacting with its provider and what methods to overwrite. 

Looking at other examples of such integrations will be useful, even if they cannot be copied one-to-one. The below documentation will be updated with the Frame Wallet integration soon.

### Frame

This integration example will be added soon.

### RPC server

You can see how the SDK was used similarly within the RPC server [here.](https://github.com/Rpc-h/RPCh/blob/f1bc164a9671f9e1ce6c7b204a47def4c5a16179/apps/rpc-server/src/index.ts#L55)

| environment       | example                                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| node.js           | [repo](https://github.com/Rpc-h/RPCh/tree/main/apps/rpc-server), [Example 1](https://github.com/Rpc-h/RPCh/blob/f1bc164a9671f9e1ce6c7b204a47def4c5a16179/apps/rpc-server/src/index.ts#L55)                                        |