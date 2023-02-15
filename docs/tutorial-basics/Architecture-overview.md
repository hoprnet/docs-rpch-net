---
sidebar_position: 2
---

# Architecture Overview

RPCh is a service built on top of the HOPR protocol. By utilising the privacy features of the HOPR mixnet, RPCh completely decouples your identity from your wallet activity, but several components are necessary to make this service function.

[ INSERT EXPLAINER GRAPHIC ]

In a simplified version, we have the following:

- RPCh SDK: a library used by the client to access the RPCh network 
- Entry node: to communicate with the client’s wallet and generate encrypted relays for the request
- Exit node: to communicate with the provider and generate encrypted relays for the response
- HOPR mixnet: to obscure the source and destination of the data being transmitted
- Kevlar: to verify the integrity of RPC responses sent back to the wallet

In a very simple sense, we are just allowing the client to connect to the RPCh network, where they communicate with an entry node that will translate, encrypt and route the request across the HOPR mixnet to an exit node that will communicate the response to the provider. The exit node will then receive the response and send it back to the entry node in a similar fashion. Finally, the entry node will send it back to the client with one layer of verification added through Kevlar to maintain the integrity of the response.

## Detailed Architecture 

But to make this service work, a few considerations have to be made in translating the normal HTTP(S) request/responses to something the HOPR network can understand. This translation involves segmenting the request/responses into smaller encrypted messages and adding routing information so that the selected entry/exit nodes can relay to each other.

On top of this, considerations also need to be made for the following:

- A way to keep track of open relays 
- A mechanism for selecting reliable entry/exit nodes
- And an Incentivisation mechanism for entry/exit nodes

With this, you end up with an architecture similar to the following:

[ INSERT DETAILED FLOW CHART ]

Responses/requests are cached and stored to keep track of open relays until a relay is completed and a response is received. A discovery platform is added to select reliable entry/exit nodes, and a funding service is used to pay these nodes for their service. 

You can read up on how each component works and why they are needed in the following parts of the documentation.

Insert links 