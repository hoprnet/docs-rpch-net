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

**Note:** There is no WebSocket support currently, for either option.

### Using an Existing RPCh Adapter

There are currently two RPCh adapters available for intergration:

- [RPCh ethers](./using-ethers.md) 
- [RPCh ethereum-provider](./using-ethereum-provider.md)

If your project is using either [ethers](https://www.npmjs.com/package/ethers) or [ethereum-provider](https://github.com/floating/ethereum-provider), you can use the corresponding adapter. The adapters act as an abstraction that internally uses `@rpch/sdk` which you can plug n' play. 

This is the easiest method of integration, allowing you to route your project's RPC requests through RPCh with only a few lines of code.
The integration process and an example integration can be found here: 

- [For ethers](./using-ethers.md)
- [For ethereum-provider](./using-ethereum-provider.md)

**Note:** Currently, there is only these two adapters. If this option is unavailable, you must use the RPCh SDK directly.

### Using the RPCh SDK

Using the RPCh SDK directly will require you to create a more custom integration depending on how the wallet makes its RPC requests. 
You can read up on how to use the SDK and view integration examples [here.](./using-the-sdk.md)