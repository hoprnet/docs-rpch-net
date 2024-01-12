---
title: Using Frame Wallet
---

# How to Use The RPCh Integrated Frame Wallet

This is a guide on how to use the RPCh-integrated version of the Frame Wallet. The guide goes through using Frame on Chrome, but a similar set of instructions can be followed for any alternative browser.

## Step 1: Download Integrated Frame Wallet

(**1**) Download the correct distribution of the Frame wallet depending on your OS:

* [MacOS](./Frame-0.6.8-rpch-sdk-1.10.0-macOS-361200df45586c5b8ffbb711951d33b7.zip)
* [Windows](./Frame-0.6.8-rpch-sdk-1.10.0-Win64.exe)
* [Linux](./Frame-0.6.8-rpch-sdk-1.10.0-Win64.exe)

**Note:** If using macOS, extract the folder somewhere convenient.

(**2**) You should now have an application icon you can click on to install Frame. This will look similar to the below image on macOS. 

![Application Icon](/img/Frame-application-icon.png)

## Step 2: Import Wallet to Frame

Frame does not allow you to create wallets, only import existing ones. The following example shows how to import your MetaMask Wallet to Frame. 

(**1**) On MetaMask, navigate to `Settings`.

![MetaMask Settings](/img/MetaMask-settings.png)

(**2**) Select `Security & privacy`

(**3**) Press the `Reveal Secret Recovery Phrase` Button and complete the security questions.

![Reveal SRP](/img/Reveal-secret-recover-phrase.png)

(**4**) With your Secret Recovery Phrase copied, open the Frame wallet application.

(**5**) Press the Menu button on the top left of the application.

(**6**) In the new menu, select `Accounts` and then at the bottom of the screen, press the `Add New Account ` button.

(**7**) Select the `Seed Phrase` option, then paste your recovery phase in the text box once prompted.

(**8**) Create a new password for your wallet and select the address you want to import.

## Step 3: Download Frame Companion 

To use Frame on your browser, you need to use the Frame Companion extension.

(**1**) Download the Frame Companion extension to your browser, here is the [link for Chrome](https://chromewebstore.google.com/detail/frame-companion/ldcoohedfbjoobcadoglnnmmfbdlmmhf)

![Add Frame companion](/img/add-frame-companion.png)

## Using Frame With Dapps

To Use Frame with Dapps, you need to make sure:

* You have the Frame Companion extension installed on your browser
* No clashing wallets are enabled, e.g. MetaMask 
* You have imported a useable wallet to Frame

(**1**) Disable any clashing wallets, such as MetaMask, in the extensions section of your browser.

![Disable Metamask](/img/Metamask-disabled.png)

(**2**) Make sure you have your Frame Wallet application open with at least one wallet imported.

(**3**) Once you are on the Dapp you want to use, click on the Frame Companion Extension in your browser and on the pop-up, select `APPEAR AS METAMASK INSTEAD`.

**Note:** You will have to do this every time you use a new Dapp.

![Appear As MM](/img/appear-as-MM-2.png)

(**4**) When connecting your wallet to a Dapp, select the MetaMask option, and your imported Frame wallet should connect by default.

## How To Know My Wallet Is Private

To test that the RPCh-integrated wallet is actually protecting your metadata, you can use [DERP](https://derp.hoprnet.org/). DERP is an RPC endpoint that reads the RPC calls being made to it just as your RPC provider or any other third party might, and if the IP address of the requests matches your browser IP address, it will make these calls visible on your browser.

This is a great tool to highlight exactly the data your wallet is leaking about you. 

![DERP](/img/DERP.png)

But suppose you connect to DERP using Frame with RPCh. In that case, the DERP page will appear blank, indicating your IP address doesn't match any of the IP addresses associated with your wallet's RPC calls.

![DERP Blank](/img/DERP-blank.png)

**Note:** If you use DERP with your normal wallet to see what data you are leaking, it will not store any of the data collected. You can see how DERP maintains your privacy [here](https://twitter.com/hoprnet/status/1586009970008530945).

### How To Use DERP With Frame

(**1**) In the Frame menu, select `Chains`. Then, in the pop-up screen, press the `Add New Chain` button at the bottom.

(**2**) Here, fill out the Chain information of the chain you want to use while making sure to use the DERP RPC endpoint for your `PRIMARY RPC`.

**Note:** You can find the correct chain information on the [DERP website](https://derp.hoprnet.org/).

![DERP Chains](/img/DERP-chain-selection.png)

(**3**) Visit [DERP](https://derp.hoprnet.org/) to see if your Frame wallet is leaking any information while you are using it.