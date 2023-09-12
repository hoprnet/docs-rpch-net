---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Using RPCh With Your Own Wallet

This tutorial gives an overview of how to run RPCh locally using a Docker connector. You will need to purchase RPCh in order to use it, but you can currently get six months of RPCh for free. Follow the instructions below to do so. 

## Get 6 Months RPCh Free

(**1**) Navigate to the site [degen.rpch.net](https://degen.rpch.net/)

(**2**) You should be greeted with the following screen. Here, click the `Get Started` button under the `Degen` package.

![Site](/img/degen-package.png)

(**3**) When prompted, connect your wallet and then sign in when asked to do so by your wallet.

![Sig-in](/img/sign-in-request.png)

(**4**) On the new screen, enter the promo code `FREEPRIVACY` and press the button `APPLY WITH CODE` to get six months of RPCh for free!

![promocode](/img/promocode.png)

(**5**) This will take you to a new dashboard page, which will give you your unique client ID associated with your wallet, your Docker command to run RPCh and a button to add the RPCh network to your wallet. **Before Adding the RPCh network to your wallet, you must run the Docker command.** Use the instructions below to do this before continuing.

## Run RPCh via Docker

In order to use the private RPCh network you have added to your wallet, first, you have to have RPCh running locally via Docker. 

### Step 1: Install Docker

Make sure you have Docker installed on your device before trying to run RPCh via the Docker Connector.

<Tabs>
<TabItem value="Linux" label="Linux">

Depending on your distribution, please follow the official guidelines to install and run Docker on your workstation.

- [Installing Docker in Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [Installing Docker in Fedora](https://docs.docker.com/engine/install/fedora/)
- [Installing Docker in Debian](https://docs.docker.com/engine/install/debian/)
- [Installing Docker in CentOS](https://docs.docker.com/engine/install/centos/)

</TabItem>
<TabItem value="mac" label="macOS">

1. Visit [Docker](https://www.docker.com/get-started) and download Docker Desktop to your computer.
2. Follow the wizard steps to ensure Docker is installed.
3. Ensure the installation was successful by running `docker ps` in your terminal.

</TabItem>
<TabItem value="windows" label="Windows">

1. Visit [Docker](https://www.docker.com/get-started) and download Docker Desktop to your computer.
2. Follow the wizard steps to ensure Docker is installed.
3. Ensure the installation was successful by running `docker ps` in your terminal.

</TabItem>
</Tabs>

### Step 2: Run the Docker Command

Copy your unique Docker command from your dashboard and paste it into your terminal. That's all! As long as your command is running, you can use the RPCh network to use RPCh whenever you want.

**Bonus Tip:** To run this Docker command in the background, it may be useful to use [tmux](https://linuxize.com/post/getting-started-with-tmux/). This will let you run the command in a background session and avoid having to re-run the command every time you turn on your device. 

## Add the RPCh Network to Your Wallet

To start using RPCh, you’ll need to set it up as your ETH RPC provider in your wallet. Now that you have your unique Docker command running you can add your RPCh network to your wallet either through the dashboard or manually.

### Adding RPCh Using the Dashboard

(**1**) Navigate back to the dashboard where you found your unique Docker command. If you closed your browser you may have to log in again.

![dashboard](/img/dashboard.png)

(**2**) Then, Press the button titled `Add Docker RPCh Network to your Wallet` and approve your wallet's request when prompted.

That's all! You should now have a new RPCh Network you can use to privately interact with web3.

### Adding the RPCh Network Manually (Gnosis)

Adding your network manually also allows the added beneifit of choosing your own desired RPC provider These instructions are for MetaMask, but RPCh will work for any wallet that allows you to manage RPC endpoints.

(**1**) Click on the Networks icon in the top left of the wallet and then press the `Add Network` button.

![Add network MM](/img/RPCh-networks.png)

(**2**) Click on the `Networks` tab on the left and in the field that appears add the following information:

- **Network Name:** RPCh - Gnosis Chain
- **New RPC Url:** http://localhost:8080/?exit-provider=https://primary.gnosis-chain.rpc.hoprtech.net
- **Chain ID:** 100
- **Currency Symbol:** xDAI

**Note:** If you are using a VPS to run RPCh, replace `localhost` with your VPS IP address for your RPC URL, for example: `http://142.93.5.175:8080/?exit-provider=https://primary.gnosis-chain.rpc.hoprtech.net` would be my RPC URL if my VPS had the IP address: `142.93.5.175`.

![RPCh new RPC](/img/RPCh-new-RPC.png)

(**3**) Click `Save` and you are all done!

You can now use this network to visit any web3 service of your choice while maintaining your metadata and data privacy. 

### Adding the RPCh Network Manually (Any EVM Chain)

The [above example](./using-RPCh-paid-version.md#adding-the-rpch-network-manually-gnosis) was for Gnosis chain but you can use the same setup to manually add RPCh for any EVM chain by just adjusting the `New RPC Url` and `Chain ID`.

For example to use RPCh with the Binance Smart Chain, I would need its Chain ID: `56` and an RPC exit provider such as: `https://bsc-dataseed4.binance.org`. You can find providers and chain information for your desired chain using [chainlist](https://chainlist.org/). 

New RPC URL (Binance Smart Chain):

```
http://localhost:8080/?exit-provider=https://bsc-dataseed4.binance.org
```

Example using new provider and chain ID (Binance Smart Chain):

![RPCh Binance](/img/RPCh_over_Binance1.png)


