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

Now you can add RPCh to your wallet by following the instructions [here](/versioned_docs/version-Beta/tutorial-extras/add-RPCh-to-any-EVM-wallet.md#add-rpch-to-your-evm-wallet-on-any-evm-chain).


## (Optional) Choose Custom MEV Provider

By default, RPCh comes with MEV protection enabled via [PropellerHeads](https://docs.propellerheads.xyz/propellerheads-docs/introduction/overview). This allows you to earn revenue kickbacks based on the amount of revenue generated through propellerheads' MEV [protection solutions](https://docs.propellerheads.xyz/propellerheads-docs/introduction/overview#best-prices-and-full-mev-protection), but if you don't want to use PropellerHeads, you can choose your own MEV protection service by editing the Docker command you acquire through the dashboard.

To add your own MEV provider:

(**1**) Copy your unique Docker command from your [dashboard](https://degen.rpch.net/degen/dashbaord). You will need to be signed in to access your dashboard.

(**2**) Add the following tag into the Docker command while replacing `<provider_url>` with your chosen MEV provider: 

```bash
-e MEV_PROTECTION_PROVIDER=<provider_url>
```

(**3**) Paste this command into the terminal instead of your original default command.

### Example Use

Here is the unique Docker command generated in my dashboard:

```bash
docker run --platform=linux/amd64 -e DEBUG="rpch:rpc-server*" -e CLIENT=df9b525b-5303-4dd8-af69-c70b555013e1 --name=rpc-server -p 45750:45750 --rm --pull=always europe-west6-docker.pkg.dev/rpch-375921/rpch/rpc-server:latest
```

Here is the edited version of the command:

```bash
docker run --platform=linux/amd64 -e DEBUG="rpch:rpc-server*" -e MEV_PROTECTION_PROVIDER=<provider_url> -e CLIENT=df9b525b-5303-4dd8-af69-c70b555013e1 --name=rpc-server -p 45750:45750 --rm --pull=always europe-west6-docker.pkg.dev/rpch-375921/rpch/rpc-server:latest
```

**Note:** I have not edited in a new provider. You would still have to replace `<provider_url>` with an actual endpoint.