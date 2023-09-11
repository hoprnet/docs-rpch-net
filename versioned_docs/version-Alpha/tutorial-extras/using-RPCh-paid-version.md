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

(**5**) This will take you to a new dashboard page, which will give you your unique client ID associated with your wallet, your Docker command to run RPCh and a button to add the RPCh network to your wallet. First, Press the button titled `Add Docker RPCh Network to your Wallet` and approve your wallet's request when prompted.

![dashboard](/img/dashboard.png)

(**6**) Now you have the private RPCh network added to your wallet, you can use it to privately interact with web3 whenever you want as long as you have the RPCh Docker command running. To set up RPCh and run the command, follow the instructions below.

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