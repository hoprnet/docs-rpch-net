---
sidebar_position: 1
---

# Getting Started

This section of the documentation is dedicated to helping you integrate RPCh into your favourite `web3` project. You can integrate RPCh into any JS-based project which needs to send requests to an RPC provider. Before attempting to integrate RPCh into a wallet, you should familiarise yourself with the following:

- What [RPCh achieves](../tutorial-basics/What-is-RPCh.md)
- The [RPCh SDK](../tutorial-basics/RPCh-SDK.md)
- [RPCh Crypto](./RPCh-crypto.md)

## How to Integrate RPCh
Integrating RPCh into your project is as simple as overwriting the methods used to make requests to its RPC provider with custom logic which uses the RPCh SDK instead. 

There are two approaches to this.

### Using An Existing RPCh Adapter (ethers)

If your project is using [ethers](https://www.npmjs.com/package/ethers), you can just use the [@rpch/ethers adaptor](https://www.npmjs.com/package/@rpch/ethers), `@rpch/ethers` acts as an abstraction that internally uses `@rpch/sdk` which you can plug n' play.

This is the easiest method of integration, allowing you to route your project's RPC requests through RPCh with only a few lines of code.
The integration process and an example integration can be found [here.](./using-ethers.md)

**Note:** Currently, there is only an adapter created for ethers. If this option is unavailable, you must use the RPCh SDK directly.

### Using The RPCh SDK

Using the RPCh SDK directly will require you to create a more custom integration depending on how the wallet makes its RPC requests. 
You can read up on how to use the SDK and view integration examples [here.](./using-the-sdk.md)