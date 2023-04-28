---
sidebar_position: 5
---

# RPCh Crypto

The RPCh SDK has to perform various cryptographic magic to make everything possible. This is done via our `RPCh Crypto` libraries which are built in `rust` and compiled to `WASM`. You will need to select one of these libraries and pass it on to the SDK to create a working integration.

## Libraries

RPCh ships three distributions of our RPCh Crypto library:

| target  | usage                 | description                                                  |
| ------- | --------------------- | ------------------------------------------------------------ |
| [bundler](https://www.npmjs.com/package/@rpch/crypto) | bundler (ex: webpack) | (Recommended) Suitable for loading in bundlers like Webpack. |
| [web](https://www.npmjs.com/package/@rpch/crypto-for-web)     | Native in browser     | Directly loadable in a web browser.                          |
| [nodejs](https://www.npmjs.com/package/@rpch/crypto-for-nodejs)  | nodeJS                | Loadable via `require` as a Node.js module.                  |

The recommended target is `bundler`. Assumes a model where the wasm module itself is natively an ES module. This model, however, is not natively implemented in any JS implementation at this time. As a result, to consume the default output of wasm-bindgen you will need a bundler of some form.
The choice of this default output was made to reflect the trends of the JS ecosystem. While tools other than bundlers don't support wasm files as native ES modules today, they're all very much likely to in the future!

You can view the RPCh Crypto repo [here.](https://github.com/Rpc-h/crypto)