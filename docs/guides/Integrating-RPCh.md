---
sidebar_position: 2
---

# Integrating RPCh

This guide assumes you have read and know what [RPCh achieves](https://docs.rpch.net/docs/tutorial-basics/What-is-RPCh) and how the [SDK works](https://docs.rpch.net/docs/tutorial-basics/RPCh-SDK).

This is an implementation guide for helping you integrate RPCh into your favourite `web3` project.
You can integrate RPCh into any JS-based project which needs to send requests to an RPC provider.

## The Libraries

Before we get our hands dirty, we first need to understand the two libraries you need to use to integrate RPCh into your project.

1. RPCh SDK or RPCh ethers adaptor

   If your project is using [ethers](https://www.npmjs.com/package/ethers), you can just use the [@rpch/ethers adaptor](https://www.npmjs.com/package/@rpch/ethers), `@rpch/ethers` acts as an abstraction that internally uses `@rpch/sdk` which you can plug n' play.

   If this option is not available to you, you will need to use the [@rpch/sdk](https://www.npmjs.com/package/@rpch/sdk) directly.

   View documentation for `@rpch/sdk` [here](https://github.com/Rpc-h/RPCh/tree/main/packages/sdk#rpch-sdk) and `@rpch/ethers` [here](https://github.com/Rpc-h/RPCh/tree/main/packages/ethers#rpch-ethers-adaptor).

2. A variation of RPCh Crypto

   The RPCh SDK has to perform various cryptographic magic to make everything possible. This is done via our `RPCh Crypto` libraries which are build in `rust` and compiled to `WASM`.

   RPCh ships three distributions of our RPCh Crypto library ([@rpch/crypto](https://www.npmjs.com/package/@rpch/crypto), [@rpch/crypto-for-web](https://www.npmjs.com/package/@rpch/crypto-for-web), [@rpch/crypto-for-nodejs](https://www.npmjs.com/package/@rpch/crypto-for-nodejs)) which allows you to pick the one that suits your project's environment the most. See [distribution](https://github.com/Rpc-h/crypto#distributions) for more details.

   Once you pick the variant that works best for you, you simply pass it to the SDK.

## Examples

| environment       | example                                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| browser extension | [repo](https://github.com/Rpc-h/extension-block-wallet), [1](https://github.com/Rpc-h/extension-block-wallet/blob/d5bacfd024e75ad579636a69cce919d7e1a2f7a8/packages/background/src/controllers/NetworkController.ts#L526) |
| node.js           | [repo](https://github.com/Rpc-h/RPCh/tree/main/apps/rpc-server), [1](https://github.com/Rpc-h/RPCh/blob/f1bc164a9671f9e1ce6c7b204a47def4c5a16179/apps/rpc-server/src/index.ts#L55)                                        |
| web               | `N/A`                                                                                                                                                                                                                     |
