---
sidebar_position: 1
---

# What is RPCh?

## The Problem

Crypto wallets today leak unreasonable amounts of data about their users. Not maliciously or on purpose, but just inherently with how they currently function. Every wallet needs to be able to communicate with nodes on-chain to perform its functionality, such as displaying your balance or sending transactions.

And, to communicate with a node, your wallet uses remote procedure calls (RPC) to request these tasks or bits of information from a node. This request-response logic is common in any computer-based task and is nothing new, but the problem starts when you take a closer look at what each request your wallet makes on your behalf is revealing about you.

### The Data Leak

Each request leaks your IP address, device information, and a payload exposing your every interaction with a web3 service. From transactions you considered to just products and services you're browsing. And your wallet is constantly making these requests as you interact with these services, painting a complete picture of how you spend your time and where. 

A great tool that highlights this is [DERP,](https://derp.hoprnet.org/) which provides you with an RPC endpoint you add to your wallet to make these requests visible on your browser while you're connected to DERP.

**[Insert Image]**

### Who has access to this information? 

Whichever node processes the request will obviously be able to see it, and if every wallet had their own dedicated infrastructure to process these requests, it would be bad enough that they can now collect as much information as they want about their users.

But it's actually much worse. Most services can't build and maintain that level of infrastructure while scaling, or for many, even while stagnant. So they offload this task to RPC providers like Infura or Alchemy, that now give the wallets an endpoint they can send the requests to, after which they handle the rest.

We're talking about the few titans of industry that process billions of calls daily, and have unlimited access to everything practically any crypto user does on web3. A problem that's even worse than the privacy nightmare of web 2.0.

### Why is it so hard to resolve?

A lot of these issues stem from how the internet always was and still is. For two devices to communicate, or for you to interact with a website, it needs to know where to send data to and vice versa. This point-to-point data exchange is fundamental to the internet, and the data it requires is why privacy issues have never been resolved in web 2.0, regardless of how many new encryption technologies enter the market. 

The fundamental issue is with the data exposed on the transport layer as it moves from point to point. The sender and receiver's time, location and identity are constantly exposed. It doesn't matter if I can't see what item you bought at a shopping mall if I can see what stores you visited, what products you browsed and which shop you were in when you made the purchase. With this alone, I could make a pretty good guess, but if I was a machine trained to analyze this information and also observed every other facet of your life in a similar manner, the accuracy of my guess would be terrifying. 

And that's the state of the current internet, but with web3, not only did we import these issues, we made them worse.

## The solution

RPCh utilizes the HOPR mixnet to route, encrypt and completely obscure all user data from wallets making requests to the chain. It is a privacy-preserving RPC service that detaches the sender's identity from all communications with the blockchain.

### HOPR mixnet

A solution to this needs transport-layer privacy, which is exactly what RPCh provides. It is the first commercial service developed on the HOPR privacy mixnet. Mixnets are the most academically sound transport layer privacy mechanism. They are a concept that predates the internet but has only been attempted in industrial development a handful of times, mainly in the last decade with the rise of web3.

HOPR is not only the first to market with a fully functioning privacy mixnet that is now hosting a commercial service, but it is also the only fully incentivized and decentralized privacy mixnet allowing it to scale and sustain an ecosystem. You can read more about HOPR [here.](https://docs.hoprnet.org/core/mixnets)

### RPCh Design

RPCh utilizes the HOPR mixnet, but several key components are necessary to provide the complete RPC service. An overview of the Architecture can be found [here.](./Architecture-overview.md)