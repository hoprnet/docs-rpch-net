---
sidebar_position: 1
---

# Using Any Wallet

This tutorial gives an overview of how to run RPCh locally using a Docker connector. This setup allows you to add RPCh as a drop-in replacement to any wallet you use across any chain. Make sure to adjust the chain ID to match your chain, as the example below uses Gnosis.

Alternatively, download BlockWallet, which has RPCh integrated to make all Gnosis chain transactions completely private. This is an easier setup, but RPCh's functionality is limited to Gnosis Chain on the current integration of BlockWallet. You can find a guide on how to download BlockWallet [here.](./Running-RPCh-on-block-wallet.md)
## Running RPCh with the Docker connector

**Note:** Make sure you have Docker installed on your device

(**1**) Go to access.rpch.net and click the `Download` button under the Docker Connector installation tab. This will generate your unique secret access token and corresponding commands.

![Download Button](/img/Download_button.png)

(**2**) From the pop-up, copy the first command, titled: `Docker pull command`,  and paste it into your terminal. 

![Docker pull command](/img/First_command.png)

(**3**) Once the download completes, copy the `Run RPCh` command and paste it into your terminal. 

![Docker Run](/img/Run_RPCh_command2.png)

(**4**) Now you have RPCh running. You can use it on any wallet by adding the URL from the pop-up to your wallet as the RPC URL for a new network. 

**Note:** If you are using a VPS to run RPCh, replace `localhost` with your VPS IP address, for example: `http://142.93.5.175:8080/?exit-provider=https://primary.gnosis-chain.rpc.hoprtech.net` would be my RPC URL if my VPS had the IP address: `142.93.5.175`.

![RPC URL](/img/RPC_URL.png)

This endpoint is the same for everyone, so you can copy it from here:

```
http://localhost:8080/?exit-provider=https://primary.gnosis-chain.rpc.hoprtech.net
```

Here is an example of adding this to MetaMask for the Gnosis chain with chain ID: 100

![MetaMask Example](/img/MetaMask_example2.png)

Here is a demo video of the installation process. For this, I’m using a VPS to run the commands.

<p align="center" style={{"marginRight": "100px", "marginTop": "20px", "marginBottom": "20px"}}>
    <video width="960" frameborder="0" allow="autoplay; fullscreen" allowfullscreen controls >
    <source src="/video/Docker_Connector_Demo.mp4" type="video/mp4"/>
    </video>
</p>

**Note:** With this setup, you can RPCh on any wallet and on any chain. Just choose the correct corresponding chain ID and use the same RPC URL.

Once RPCh stops running, this network will no longer work on your wallet. To avoid having to copy/paste the commands every time you want to use your wallet, you may want to use [tmux](https://linuxize.com/post/getting-started-with-tmux/) with a VPS to run RPCh 24/7, so you can use your new custom network whenever you want. 
