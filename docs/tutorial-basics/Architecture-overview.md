---
sidebar_position: 2
---

# Architecture Overview

## Simple Architecture

### Concept

RPCh takes your wallet's request to an RPC provider and instead sends it to an RPCh entry node on the HOPR mixnet. This node then relays it to an RPCh exit node on the HOPR mixnet, which communicates with your provider on behalf of your wallet. The exit node receives the response and routes it back to the client through the entry node. This way, the provider can't link the client's request or response to the client's wallet, and neither can the entry and exit nodes due to:

- The base functionality of the HOPR mixnet
- An extra layer of encryption added by the SDK 

<!-- **[Insert Graphic]** -->

### Privacy Component

The privacy offerings of this service are derived from the HOPR privacy mixnet, which allows the entry and exit nodes to communicate with each other through relays with layered encryption, allowing no intermediaries to see the content of the message or beyond the previous and following node on the relay. 

On top of this RPCh adds a layer of encryption to the message which is only decrypted by the exit node before it sends the request to the provider and the SDK as it communicates the response back to the client. 

### Key components

![Simple Explainer](/img/RPCh_simple_explainer.png)

- **RPCh SDK:** a library the client uses to access the RPCh network. This is also necessary for translating requests into something the HOPR network can understand. 
- **Entry node:** Communicates with the client’s wallet and generates encrypted relays for the request.
- **Exit node:** Communicates with the provider and generates encrypted relays for the response.
- **HOPR mixnet:** Obscures the source and destination of the data being transmitted.
- **Kevlar:** Verifies the integrity of RPC responses returned to the wallet.

In a very simple sense, we are just allowing the client to connect to the RPCh network, where they communicate with an entry node that will translate, encrypt and route the request across the HOPR mixnet to an exit node that will communicate the request to the provider. The exit node will then receive the response and send it back to the entry node in a similar fashion. Finally, the entry node will send it back to the client with one layer of verification added through Kevlar to maintain the integrity of the response.

## Detailed Architecture 

But to make this service work, a few considerations have to be made in translating the normal HTTP(S) request/responses to something the HOPR network can understand. This translation involves segmenting the request/responses into smaller encrypted messages and adding routing information so that the selected entry/exit nodes can relay request/responses to each other.

On top of this, considerations also need to be made for the following:

- A way to keep track of open relays 
- A mechanism for selecting reliable entry/exit nodes
- An incentivisation mechanism for entry/exit nodes

With this, you end up with an architecture similar to the following:

![Detailed Flowchart](/img/rpch-general_diagram.png)

Responses/requests are cached and stored to keep track of open relays until a relay is completed and a response is received. A discovery platform is added to select reliable entry/exit nodes, and a funding service is used to pay these nodes for their service. 

You can read up on how each component works and why they are needed in the following parts of the documentation.

- [RPCh SDK](./RPCh-SDK.md)
- [Discovery Platform](./Discovery-platform.md)
- [Funding Service](./Discovery-platform.md#funding-service)