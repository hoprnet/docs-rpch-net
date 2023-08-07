---
sidebar_position: 7
---

# FAQ

## What is Remote Procedure Call (RPC)

**High-level explanation:** Very simply, it’s just asking another computer to do something for you

**More detail:** A protocol one program can use to run a service on another program located on another device or network without having to understand the network’s details. 

### Common terminology: 
- **Client:** The device requesting the service from another device
- **Request:** The task being requested
- **Server:** The device the client is asking to perform the request
- **Response:** The result of the request that the server sends back to the client

**Example from your wallet:** Your wallet (the client) asks an Ethereum RPC Node (the server) to tell it your balance (the request), and your wallet gets back an answer (the response).

**Important to note:** although you want to request this from a node, usually, to access one, your wallet will send this request to a provider that has the infrastructure to run large amounts of nodes and process the ridiculous amount of requests every wallet has to make whenever you use any web3 service. 

## What is an RPC Provider?

An entity that provides the infrastructure to process RPC requests. They expose endpoints web3 services can use to interact with the blockchain without having to run nodes/infrastructure themselves.

## What is an RPC Node? 

A node that runs blockchain client software allowing it to process RPC requests/responses. For example, on Ethereum, a node would need to run both Execution Layer and Consensus Layer infrastructure to be an RPC node.

## What is the problem RPCh solves

Wallets need to make RPC requests to nodes on the blockchain to function, but every request made on your behalf leaks data about you. Your IP address, device information, and your every activity on web3, even just browsing a product or website is a traceable activity that is exposed. A handful of providers now have access to everything practically every crypto user does on web3.

More details on the issue can be found [here.](./What-is-RPCh.md)
<!--- Attack vectors your wallet makes you vulnerable to can be found [here.]() -->

## Why do we need an SDK?

The HOPR protocol that RPCh utilizes is a different transport mechanism than the HTTP(S) requests that your wallet is making, So they need to be translated to something that the HOPR network can understand. You can get a better overview of this from our docs [here.](./RPCh-SDK.md)

## RPCh vs VPN solutions

A static proxy provides one layer of disassociation between the client and the server. This is not very private, as the intermediary just becomes a proxy for your activity from the server's perspective. Your data is harvested all the same and connected back to you over a short period of time. As evidenced by the lack of privacy even dynamic VPNs provide.

On top of that, VPNs are centralized, allowing the intermediary to access your data just as the server would have.

In contrast, RPCh uses functionality derived from the HOPR mixnet, which routes each request across multiple intermediaries with layered encryption, so no point on the relay can see beyond the previous or following node, completely hiding the source and destination from not just the server but all intermediaries.

Additional features:

- Each request has a unique relay making it more dynamic than changing your VPN ten times a second
- Packet mixing and background noise obscure traffic movement from global network observers
- Light client verification to protect against data tampering
