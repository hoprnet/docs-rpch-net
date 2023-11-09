---
sidebar_position: 1
---

# Getting Started

This section of the documentation is dedicated to helping you integrate RPCh into your favourite `web3` project. You can integrate RPCh into any JS-based project which needs to send requests to an RPC provider. Before attempting to integrate RPCh into a wallet, you should familiarise yourself with the following:

- What [RPCh achieves](../tutorial-basics/What-is-RPCh.md)
- The [RPCh SDK](../tutorial-basics/RPCh-SDK.md)

## How to Integrate RPCh
Integrating RPCh into your project is as simple as overwriting the methods used to make requests to its RPC provider with custom logic which uses the RPCh SDK instead. 

If you are using a frontend library such as [ethers](https://www.npmjs.com/package/ethers), [viem](https://github.com/wagmi-dev/viem) or [wagmi](https://github.com/wagmi-dev/wagmi) this can be quite easily done by replacing a few lines of code.

**Note:** There is no WebSocket support currently, for either option.

### Examples Using a Library

We currently have example integrations for the following libraries:

- **ethers:** view a breakbown of the example integration [here.](./using-ethers.md)
- **viem:** view a breakbown of the example integration [here.](./using-viem.md)
- **wagmi:** view a breakbown of the example integration [here.](./using-wagmi.md)

If your project is using a different library you can still use these examples as integration or alternatively, view our [vanilla SDK example](./using-the-sdk.md) for a more barebones approach. 

### Using the RPCh SDK

Using the RPCh SDK directly will require you to create a more custom integration depending on how the wallet or project makes its RPC requests. 
You can read up on how to use the SDK and view integration examples [here.](./using-the-sdk.md)