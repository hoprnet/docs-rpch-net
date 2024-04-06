---
sidebar_position: 6
---

# RPCh json-rpc-2.0 Example Integration

## Description

The following documentation provides an integration example of the RPCh SDK with the json-rpc-2.0 library, which is lets your client and server talk over function calls under JSON-RPC 2.0 spec.

## Preparation

```bash
yarn add @rpch/sdk uuid json-rpc-2.0
```

or

```bash
npm i @rpch/sdk uuid json-rpc-2.0
```




## Example Integration

```javascript
/* eslint-disable */ //depending on the project, you might wanna remove this line
import RPChSDK, { JRPC, type Ops } from "@rpch/sdk";
import { JSONRPCParams } from "json-rpc-2.0";
import { v4 as uuidv4 } from "uuid";

const RPCH_SECRET_TOKEN = process.env.RPCH_SECRET_TOKEN;
const DISCOVERY_PLATFORM_API_ENDPOINT = process.env.DISCOVERY_PLATFORM_API_ENDPOINT;
const FORCE_ZERO_HOP = true; // TODO: Change to false after integration for better privacy

class RPChSDKSingleton {
  static sdk: RPChSDK | undefined;

  static options: Ops = {
    discoveryPlatformEndpoint: DISCOVERY_PLATFORM_API_ENDPOINT || undefined,
    forceZeroHop: FORCE_ZERO_HOP,
  };

  static send(
    ...args: Parameters<RPChSDK["send"]>
  ): ReturnType<RPChSDK["send"]> {
    if (!this.sdk) {
      // TODO: Remove after integration, confirmation and testing
      console.log(
        "RPCh: CREATING SDK INSTANCE with OPS ",
        RPChSDKSingleton.options
      );
      console.log("RPCh: Client ID ", RPCH_SECRET_TOKEN);

      if (!RPCH_SECRET_TOKEN) {
        console.error("MISSING RPCH SECRET TOKEN");
        throw new Error("MISSING RPCH SECRET TOKEN");
      }

      console.info("RPCh: first SEND request, creating SDK instance");
      this.sdk = new RPChSDK(
        RPCH_SECRET_TOKEN,
        this.options
      );
    }
    return this.sdk.send(...args);
  }
}

export class RPChProvider {
  rpcUrl: string;

  constructor(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
  }

  request(method: string, params: JSONRPCParams): Promise<unknown> {
    // TODO: Remove after integration, confirmation and testing
    console.log("RPCh: SENDING REQUEST to: ", this.rpcUrl);
    console.log("RPCh: SENDING REQUEST method: ", method, " params: ", params);

    return RPChSDKSingleton.send(
      {
        jsonrpc: "2.0",
        method,
        params,
        id: uuidv4()
      },
      { provider: this.rpcUrl }
    )
      .then(async (res) => {
        const jsonRes = await res.json();
        return jsonRes;
      })
      .then(({ result }: JRPC.Result) => result);
  }
}
```


## Example Usage


You can simply do:

```javascript
import { RPChProvider } from "./rpchProvider";

const client = new RPChProvider('https://ethereum-provider.rpch.tech');

client
  .request('eth_blockNumber', [])
  .then((result) => console.log(result))

```

intead of original json-rpc-2.0 integration:

```javascript
import { JSONRPCClient } from "json-rpc-2.0";

// JSONRPCClient needs to know how to send a JSON-RPC request.
// Tell it by passing a function to its constructor. The function must take a JSON-RPC request and send it.
const client = new JSONRPCClient((jsonRPCRequest) =>
  fetch("http://localhost/json-rpc", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(jsonRPCRequest),
  }).then((response) => {
    if (response.status === 200) {
      // Use client.receive when you received a JSON-RPC response.
      return response
        .json()
        .then((jsonRPCResponse) => client.receive(jsonRPCResponse));
    } else if (jsonRPCRequest.id !== undefined) {
      return Promise.reject(new Error(response.statusText));
    }
  })
);

// Use client.request to make a JSON-RPC request call.
// The function returns a promise of the result.
client
  .request("echo", { text: "Hello, World!" })
  .then((result) => console.log(result));

// Use client.notify to make a JSON-RPC notification call.
// By definition, JSON-RPC notification does not respond.
client.notify("log", { message: "Hello, World!" });

```