---
sidebar_position: 1
---

# What is RPCh?

## The issue with today’s crypto wallets

Crypto wallets leak a massive amount of data about their users to RPC providers. As wallets connect to RPC providers to resolve RPC requests, and RPC providers or blockchain node runners can view these requests/responses, exposing the user's identity and online activity. 

This is the same type of centralised setup that has allowed the current internet to be plagued by data harvesting from closed-source, blackbox softwares that exploit our data for profit.

**[ INSERT SETUP GRAPHIC ]**

Your identity being exposed and linked to your on-chain activity makes your data exploitable for these large, centralized providers and makes your assets more vulnerable to attack vectors such as advanced MEVs.

## What is RPCh?

RPCh provides a metadata-preserving RPC service that utilizes the HOPR privacy mixnet to obscure the identity of the user when communicating with the blockchain.

Your requests are segmented into smaller packets, each of which is sent to an RPCh entry node, where each packet is layered with encryption before being re-routed, mixed and decrypted across multiple intermediary nodes on the HOPR mixnet. 

When the packets reach the exit node, they are re-joined into a request which is sent to nodes on-chain. The response is then again segmented and shot back across the HOPR mixnet to the entry node, which passes it on to your wallet.

With layered encryption and constant packet mixing, the source and destination of your request/response are completely obscured to all observers, including us, your wallet and all nodes on the relay. 

**[ INSERT EXPLAINER GRAPHIC ]**

You can learn more about how the HOPR mixnet achieves this [here.](link to hopr docs) And to get a better overview of RPCh’s architecture, you can read more [here.](link to architecture overview)