---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started With Docker

In order to use the private RPCh network you have added to your wallet, first, you have to have RPCh running locally via Docker. 

## Step 1: Install Docker

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

## Step 2: Run the Docker Command

(**1**) Copy your unique Docker command from your [dashboard](https://degen.rpch.net/degen/dashbaord). You will need to be signed in to access your dashboard.

![Degen Dashboard](/img/RPCh-degen-dashboard.png)

(**2**) Paste the copied command into your terminal.

That's all! As long as your command is running, you can use the RPCh network to use RPCh whenever you want.

**Bonus Tip:** To run this Docker command in the background, it may be useful to use [tmux](https://linuxize.com/post/getting-started-with-tmux/). This will let you run the command in a background session and avoid having to re-run the command every time you turn on your device. 

Now you can add RPCh to your wallet by following the instructions [here](./add-RPCh-to-any-EVM-wallet.md#add-rpch-to-any-evm-wallet-for-any-evm-chain).
