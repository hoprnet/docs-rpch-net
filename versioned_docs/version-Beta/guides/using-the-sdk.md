---
sidebar_position: 1
---

# RPCh Vanilla JS SDK Example Integration

## Description

This guide provides instructions on how to integrate and use the RPCh SDK in a Node.js environment without any additional blockchain libraries such as ethers.js, web3.js, or the wagmi library.

## Example Integration

You can find this example on our GitHub repository [here](https://github.com/Rpc-h/RPCh/blob/main/examples/vanilla-sdk/src/index.ts).

```javascript
import SDK from '@rpch/sdk';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Example of how to use RPCh SDK
 */
async function example() {
    // Your client secret from the RPCh dashboard
    const sdk = new SDK(process.env.CLIENT_SECRET);

    const response = await sdk.send(
        {
            method: 'eth_blockNumber',
            params: [],
            jsonrpc: '2.0',
        },
        {
            provider: 'https://ethereum-provider.rpch.tech',
        },
    );

    const responseJSON = await response.json();

    return responseJSON;
}

async function main() {
    try {
        const response = await example();
        console.log('Block Number:', response);
    } catch (e) {
        console.error('Error:', e);
    }
}

main();
```

## Example Breakdown

### Setting up the Environment

First, import the necessary modules and configure the environment:

```javascript
import SDK from '@rpch/sdk';
import dotenv from 'dotenv';
dotenv.config();
```

The dotenv module loads environment variables from a .env file into process.env, making it easy to manage configuration settings.

### Creating the Example Function

Define an asynchronous function, example, which uses the RPCh SDK to send a JSON-RPC request:

```javascript
async function example() {
    // This client secret can be found in your dashboard
    const sdk = new SDK(process.env.CLIENT_SECRET!);

    const response = await sdk.send(
        {
            method: 'eth_blockNumber',
            params: [],
            jsonrpc: '2.0',
        },
        {
            provider: 'https://ethereum-provider.rpch.tech',
        },
    );

    const responseJSON = await response.json();

    return responseJSON;
}
```

Within this function:

- An instance of the RPCh SDK is created with the client secret.
- The sdk.send method is used to make a JSON-RPC request, in this case to get the latest block number (eth_blockNumber).
- A custom provider URL (https://ethereum-provider.rpch.tech) is specified, although the RPCh SDK can automatically choose a suitable provider.

## Using the Example

To use this particular [example](https://github.com/Rpc-h/RPCh/blob/main/examples/vanilla-sdk/src/index.ts):

(**1**) Edit the `.env` file to include your Client secret which you can obtain from the dashboard to [degen.rpch.net](https://degen.rpch.net/)

(**2**) Run `yarn && yarn dev`