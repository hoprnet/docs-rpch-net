---
sidebar_position: 5
---

# RPCh Web3 Eth/Core Example Integration

The following documentation provides an integration example of the RPCh SDK with the Web3 Eth/Core library. web3.js - Eth is a sub-package of web3.js, and contains modules to interact with the Ethereum blockchain and smart contracts.

## Preparation

```bash
yarn add @rpch/sdk uuid web3-eth
```

or

```bash
npm i @rpch/sdk uuid web3-eth
```




## Example Integration

```javascript
/* eslint-disable */ //depending on the project, you might wanna remove this line
import RPChSDK, { type Ops } from "@rpch/sdk";
import { AbstractProvider } from "web3-eth/node_modules/web3-core"; // Import from web3-eth dependencies as web3-core uses other version
import { v4 as uuidv4 } from "uuid";

export const getSupportedRpchProvider = (
  rpcUrl: string
): string | RPChProvider => {
  if (/^ws(s)?:\/\//i.test(rpcUrl)) {
    return rpcUrl;
  }
  return new RPChProvider(rpcUrl);
};

const RPCH_SECRET_TOKEN = process.env.VUE_APP_RPCH_SECRET_TOKEN;
const DISCOVERY_PLATFORM_API_ENDPOINT = process.env.VUE_APP_DISCOVERY_PLATFORM_API_ENDPOINT;
const FORCE_ZERO_HOP = true; // TODO: Change to false after integration for better privacy

if (!RPCH_SECRET_TOKEN) {
  throw new Error("MISSING RPCH SECRET TOKEN");
}

const ops: Ops = {
  discoveryPlatformEndpoint: DISCOVERY_PLATFORM_API_ENDPOINT || undefined,
  forceZeroHop: FORCE_ZERO_HOP,
};

class RPChSDKSingleton {
  static sdk: RPChSDK | undefined;

  static options = ops;

  static send(
    ...args: Parameters<RPChSDK["send"]>
  ): ReturnType<RPChSDK["send"]> {
    if (!this.sdk) {
      // TODO: Remove after confirmation and testing
      console.info("RPCh: Client ID ", RPCH_SECRET_TOKEN);

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

export class RPChProvider implements AbstractProvider {
  rpcUrl: string;

  constructor(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
  }

  sendAsync(
    payload: Parameters<AbstractProvider["sendAsync"]>[0],
    callback: Parameters<AbstractProvider["sendAsync"]>[1]
  ) {

    if(!payload.id) {
      payload.id = uuidv4();
    }
    RPChSDKSingleton.send(
      {
        ...payload,
        jsonrpc: "2.0",
      },
      { provider: this.rpcUrl }
    )
      .then(async (res) => {
        const jsonRes = await res.json();
        const parsedRes = {
          ...jsonRes,
          id: jsonRes.id || 0,
        };
        callback?.(null, parsedRes);
      })
      .catch((err) => {
        callback?.(err as Error);
      });
  }
}
```

## Example Breakdown

### Importing Required Modules
Begin by importing the necessary modules from the web3-eth, uuid and the SDK from @rpch/sdk:

```javascript
import RPChSDK, { type Ops } from "@rpch/sdk";
import { AbstractProvider } from "web3-eth/node_modules/web3-core"; // Import from web3-eth dependencies as web3-core uses other version
import { v4 as uuidv4 } from "uuid";
```

### Make sure that only HTTP RPCs are used with RPCh

```javascript
export const getSupportedRpchProvider = (
  rpcUrl: string
): string | RPChProvider => {
  if (/^ws(s)?:\/\//i.test(rpcUrl)) {
    return rpcUrl;
  }
  return new RPChProvider(rpcUrl);
};

```

### Initialize the RPCh SDK
Initialize the RPCh SDK with the attributes you want and the client secret, which you can get a client secret from your dashboard at [degen.rpch.net](https://degen.rpch.net/):

```javascript
const RPCH_SECRET_TOKEN = process.env.VUE_APP_RPCH_SECRET_TOKEN;
const DISCOVERY_PLATFORM_API_ENDPOINT = process.env.VUE_APP_DISCOVERY_PLATFORM_API_ENDPOINT;
const FORCE_ZERO_HOP = true; // TODO: Change to false after integration for better privacy

if (!RPCH_SECRET_TOKEN) {
  throw new Error("MISSING RPCH SECRET TOKEN");
}

const ops: Ops = {
  discoveryPlatformEndpoint: DISCOVERY_PLATFORM_API_ENDPOINT || undefined,
  forceZeroHop: FORCE_ZERO_HOP,
};

```

### Configuring the client singleton

The Singleton's purpose is to control object creation, limiting the number to one but allowing the flexibility to create more objects if the situation changes. In this way we create one reusable instance of RPCh in the applications/

```javascript
class RPChSDKSingleton {
  static sdk: RPChSDK | undefined;

  static options = ops;

  static send(
    ...args: Parameters<RPChSDK["send"]>
  ): ReturnType<RPChSDK["send"]> {
    if (!this.sdk) {
      // TODO: Remove after confirmation and testing
      console.info("RPCh: Client ID ", RPCH_SECRET_TOKEN);

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
```


### Configuring the client

Set up a class with a custom transport method to intercept and forward blockchain requests through the RPCh network:

```javascript
export class RPChProvider implements AbstractProvider {
  rpcUrl: string;

  constructor(rpcUrl: string) {
    this.rpcUrl = rpcUrl;
  }

  sendAsync(
    payload: Parameters<AbstractProvider["sendAsync"]>[0],
    callback: Parameters<AbstractProvider["sendAsync"]>[1]
  ) {

    if(!payload.id) {
      payload.id = uuidv4();
    }
    RPChSDKSingleton.send(
      {
        ...payload,
        jsonrpc: "2.0",
      },
      { provider: this.rpcUrl }
    )
      .then(async (res) => {
        const jsonRes = await res.json();
        const parsedRes = {
          ...jsonRes,
          id: jsonRes.id || 0,
        };
        callback?.(null, parsedRes);
      })
      .catch((err) => {
        callback?.(err as Error);
      });
  }
}
```


## Example Usage

```javascript
import Web3Eth from "web3-eth";
import { getSupportedRpchProvider } from "./rpch-provider";

const web3 = new Web3Eth(getSupportedRpchProvider(this.node));

function getBalance(address) {
  return web3.getBalance(address);
}

getBalance('0x00000000219ab540356cbb839cbe05303d7705fa');

```

