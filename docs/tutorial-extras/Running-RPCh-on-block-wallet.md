---
sidebar_position: 2
---

# Using BlockWallet

BlockWallet is the first wallet to partner with RPCh and integrate with RPCh Alpha! Downloading BlockWallet will give you complete privacy when making transactions on Gnosis. You can download BlockWallet from either the Chrome webstore or GitHub.

**Note:** This version of the integration only uses RPCh Alpha for Gnosis chain transactions. To use RPCh with a different wallet or chain, you can use our Docker connector to run RPCh locally. A guide for this can be found [here.](./Using-RPCh-with-your-own-wallet.md)

## Download from the Chrome Webstore

(**1**) Find the latest BlockWallet release on the Webstore or just click [here.](https://chrome.google.com/webstore/detail/blockwallet/bopcbmipnjdcdfflfgjdgdjejmgpoaab)

(**2**) Simply add the extension to your browser

![Chrome store Extension](/img/BlockWallet_chrome_extension2.png)

(**3**) And set up the wallet as prompted

![Setup BlockWallet](/img/BlockWallet_start_up_3.png)

## Download from GitHub

Alternatively, you can download the RPCh integrated release from GitHub.

**Note:** The following instructions are for Chrome, but a similar set of instructions can be followed for any alternative browser.

(**1**) Locate the BlockWallet.zip file in the assets of this GitHub page, or click [here](./blockwallet-beta.zip) to download the folder.

![GitHub Assets](/img/GitHub_assets.png)

(**2**) Extract the folder.

(**3**) Go to your browser and open “Extensions”. 

(**4**) Toggle on Developer mode, and press the “load unpacked” button that appears on the top left.

![Extensions](/img/Extensions_chrome2.png)

(**5**) When prompted, select the folder you previously extracted.

(**6**) The BlockWallet setup page should appear.

![Setup BlockWallet](/img/BlockWallet_start_up_3.png)

That’s all! Just set up the wallet as prompted, and all your Gnosis chain transactions will be completely private!

Here's a short tutorial of the installation process:

<p align="center" style={{"marginRight": "100px", "marginTop": "10px", "marginBottom": "10px"}}>
    <video width="960" frameborder="0" allow="autoplay; fullscreen" allowfullscreen controls >
    <source src="/video/BlockWallet_gitHub.mp4" type="video/mp4"/>
    </video>
</p>

## Test that it works

Once you have added the new Network to your wallet you can test that it is actually working by inspecting your browser wallet. The instructions below show how to do this for Chrome.

(**1**) Go to your browser's extensions page. For chrome you can type the following URL into your search bar: `chrome://extensions/`

(**2**) Locate the hyperlinked text: `service worker`/`background page` at the bottom of your wallet extension. 

![Inspect](/img/Extensions_chrome_inspect.png)

(**3**) With the newly exposed console window open, connect to an exchange such as [SushiSwap](https://www.sushi.com/swap) and see exactly what your wallet is doing, including its interactions with RPCh/HOPR nodes.

![Test](/img/Test.png)