---
sidebar_position: 3
---

# RPCh SDK

The RPCh SDK is needed as the HOPR protocol is a different transport mechanism than the HTTP(S) that requests/responses are sent as. So they need to be translated into something understandable by the HOPR network. 

This is done by segmenting the original request into smaller, encrypted segments that fit the maximum payload restriction of the network and converting the necessary information into a single string separated by breakers that can be removed in the reconstruction of the request.

[ INSERT REQUEST SIDE OF THE GRAPHIC ]

The SDK serves a similar function in reconstructing and decrypting responses sent back through for a given request. 

## Finding Entry/Exit Nodes

The RPCh SDK also communicates with the discovery platform to select reliable entry/exit nodes and keeps track of open relays to track whether or not a response was received. 

Currently, with RPCh Alpha, only nodes controlled by the HOPR association will function as entry/exit nodes. This creates a greater trust assumption for users who have to trust the HOPR association not to perform timing attacks and analysis to collect data from users of RPCh. 

But this will not be the case with RPCh Beta, where entry and exit nodes will be selected from all node runners registered on the discovery platform. With this new feature within RPCh Beta, the SDK will also be responsible for updating a reliability metric associated with each node so that only reliable and trustworthy nodes will be selected to serve as entry/exit nodes. This will be achieved through the implementation of Kevlar.(link)

## Kevlar

Kevlar verifies the integrity of an RPC response by attempting to sync to the latest beacon chain header. Kevlar will request block headers from a given list of provers, and then every RPC request made by the SDK will go through Kevlar, which will generate several more requests to verify the integrity of the following RPC response.