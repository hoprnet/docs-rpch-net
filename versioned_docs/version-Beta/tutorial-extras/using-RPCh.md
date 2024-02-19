---
title: Using RPCh
---

## How To Use RPCh

Once you have [added RPCh to your wallet](./add-RPCh-to-any-EVM-wallet.md) for your desired EVM chain, you can use RPCh just by selecting it as your chain/RPC while using your wallet. It is as easy as running RPCh and changing your chain. Then, you can use your wallet just as you normally would, but with the added relief of knowing your activity is now private.

<p align="center" style={{"marginRight": "100px", "marginTop": "20px", "marginBottom": "20px"}}>
    <video width="960" frameborder="0" allow="autoplay; fullscreen" allowfullscreen controls >
    <source src="/video/Uniswap_tx_RPCh.mp4" type="video/mp4"/>
    </video>
</p>

## Troubleshooting RPCh

If your wallet is buffering or transactions are not going through, this is an indicator that RPCh may not be working correctly, and you may need to re-run RPCh. You can check that RPCh is working fine by looking at your [logs](./using-RPCh.md#what-do-my-terminal-logs-show) or checking what requests your wallet is sending in your browser.

The video below shows how to check if RPCh is failing by viewing transactions made by the MetaMask extension on Chrome.

<p align="center" style={{"marginRight": "100px", "marginTop": "20px", "marginBottom": "20px"}}>
    <video width="960" frameborder="0" allow="autoplay; fullscreen" allowfullscreen controls >
    <source src="/video/Troubleshooting_RPCh.mp4" type="video/mp4"/>
    </video>
</p>

## How Do I Run RPCh Continuously?

To avoid running the RPCh command every time you want to use RPCh, you can run the command using [Tmux](https://hamvocke.com/blog/a-quick-and-easy-guide-to-tmux/). This will leave the command running constantly in a background session, even when you close the terminal. So you can use RPCh anytime by switching to the correct chain without first having to run the command. 

## How Do I Configure My Terminal Logs?

You can configure your logs to reduce spam by editing your docker command. After the `Debug` tag, you can list paths you do not want to see, e.g. add `-rpch:somepath`. By default, the original command provided to you does not show logs for RPCh metrics. Note: `DEBUG="rpch*, -*metrics"`, this asks it to print all RPCh logs except the metrics.

```
docker run -e DEBUG="rpch*,-*metrics" -e RESPONSE_TIMEOUT=10000 -e DISCOVERY_PLATFORM_API_ENDPOINT=https://staging.discovery.rpch.tech -e PORT=8080 -e DATA_DIR=app -e CLIENT=shoulder-chapter-stems-broke-particular  --name rpc-server -p 8080:8080 --rm  europe-west6-docker.pkg.dev/rpch-375921/rpch/rpc-server:f8a6bf7
```

The syntax for editing it is as follows:

- the list is a comma-separated
- list specifies paths to logs which are emitted
- adding `-` to a path omits it 
- adding `*` to a path includes everything lower in the path

## What Do My Terminal Logs Show?

Your terminal logs show metrics for RPCh, along with any requests being made by RPCh at the moment and any failed requests. To reduce spam, you can [configure your logs](./using-RPCh.md#how-do-i-configure-my-terminal-logs).

## How Do I Know RPCh is Working?

You can check if RPCh is functioning as it should by inspecting your wallet in your browser or checking your logs.

### Inspect Browser Wallet

Once you have added the new network to your wallet, you can test that it is actually working by inspecting your browser wallet. The instructions below show how to do this for Chrome.

(**1**) Go to your browser's extensions page. For chrome you can type the following URL into your search bar: `chrome://extensions/`

(**2**) Locate your browser wallet and click on the hyperlinked `service worker`/`background page`/`background.html` text at the bottom of your extension. 

![Inspect](/img/Extensions_chrome_inspect.png)

(**3**) With the newly exposed console window open, connect to an exchange such as [SushiSwap](https://www.sushi.com/swap) and see exactly what your wallet is doing, including its interactions with RPCh/HOPR nodes.

![Test](/img/Test.png)

### Checking Terminal Logs

(**1**) Open the terminal session in which you have RPCh running.

(**2**) Scan the logs for failed request messages or errors and check that the logs are still printing when you use your wallet.

## How To Know My Wallet Is Private

To test that the RPCh-integrated wallet is actually protecting your metadata, you can use [DERP](https://derp.hoprnet.org/). DERP is an RPC endpoint that reads the RPC calls being made to it just as your RPC provider or any other third party might, and if the IP address of the requests matches your browser IP address, it will make these calls visible on your browser.

This is a great tool to highlight exactly the data your wallet is leaking about you. 

![DERP](/img/DERP.png)

But suppose you connect to DERP using RPCh. In that case, the DERP page will appear blank, indicating your IP address doesn't match any of the IP addresses associated with your wallet's RPC calls.

![DERP Blank](/img/DERP-blank.png)

**Note:** If you use DERP with your normal wallet to see what data you are leaking, it will not store any of the data collected. You can see how DERP maintains your privacy [here](https://twitter.com/hoprnet/status/1586009970008530945).

### How To Use DERP With Your Wallet

(**1**) Find the button on your wallet to manually add a new chain, just as you would when [adding RPCh to any other chain](./add-RPCh-to-any-EVM-wallet.md#adding-the-rpch-network-manually-any-evm-chain).

(**2**) Here, instead of using the normal RPC for the chain of your choice, instead use a DERP endpoint. Make sure to add RPCh to the end of the URL just as you would with any other RPC provider.

**Note:** You can find the correct chain information on the [DERP website](https://derp.hoprnet.org/).

![DERP Chains](/img/DERP-chain-selection.png)

(**3**) Visit [DERP](https://derp.hoprnet.org/) to see if your wallet is leaking any information while you are using it.