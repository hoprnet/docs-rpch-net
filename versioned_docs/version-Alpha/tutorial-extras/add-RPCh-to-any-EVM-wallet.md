---
sidebar_position: 3
---

# Add RPCh to your EVM wallet on any EVM chain

To start using RPCh, you’ll need to set it up as your RPC provider in your wallet. Now that you have your unique Docker command running you can add your RPCh network to your wallet either through the dashboard or manually.

By adding it manually you can choose to run it on any EVM chain of your choice. Whereas the dashboard will default to setting up RPCh for Gnosis chain.

## Adding RPCh Using the Dashboard

(**1**) Navigate back to the dashboard where you found your unique Docker command. If you closed your browser you may have to log in again.

![dashboard](/img/dashboard.png)

(**2**) Then, Press the button titled `Gnosis Chain Over RPCh` and approve your wallet's request when prompted.

That's all! You should now have a new RPCh Network you can use to privately interact with web3.

## Adding the RPCh Network Manually (Gnosis)

Adding your network manually also allows the added beneifit of choosing your own desired RPC provider These instructions are for MetaMask, but RPCh will work for any wallet that allows you to manage RPC endpoints.

(**1**) Click on the Networks icon in the top left of the wallet and then press the `Add Network` button.

![Add network MM](/img/RPCh-networks.png)

(**2**) Click on the `Networks` tab on the left and in the field that appears add the following information:

- **Network Name:** RPCh - Gnosis Chain
- **New RPC Url:** http://localhost:45750/?provider=https://primary.gnosis-chain.rpc.hoprtech.net
- **Chain ID:** 100
- **Currency Symbol:** xDAI

**Note:** If you are using a VPS to run RPCh, replace `localhost` with your VPS IP address for your RPC URL, for example: `http://142.93.5.175:45750/?provider=https://primary.gnosis-chain.rpc.hoprtech.net` would be my RPC URL if my VPS had the IP address: `142.93.5.175`.

![RPCh new RPC](/img/RPCh-new-RPC.png)

(**3**) Click `Save` and you are all done!

You can now use this network to visit any web3 service of your choice while maintaining your metadata and data privacy. 

## Adding the RPCh Network Manually (Any EVM Chain)

The [above example](./using-RPCh-paid-version.md#adding-the-rpch-network-manually-gnosis) was for Gnosis chain but you can use the same setup to manually add RPCh for any EVM chain by just adjusting the `New RPC Url` and `Chain ID`.

For example to use RPCh with the Binance Smart Chain, I would need its Chain ID: `56` and an RPC exit provider such as: `https://bsc-dataseed4.binance.org`. You can find providers and chain information for your desired chain using [chainlist](https://chainlist.org/). 

New RPC URL (Binance Smart Chain):

```
http://localhost:45750/?provider=https://bsc-dataseed4.binance.org
```

Example using new provider and chain ID (Binance Smart Chain):

![RPCh Binance](/img/RPCh-over-binance-new-port.png)
