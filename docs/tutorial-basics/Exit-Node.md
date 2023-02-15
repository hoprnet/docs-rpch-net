---
sidebar_position: 5
---

# Exit Node

The core functionality of RPCh is derived from the HOPR protocol, which provides metadata privacy and decouples the user’s identity from their data at the transport layer. 

RPCh is the first commercial service built on top of the HOPR protocol. You can learn more about how HOPR works here. (link)

But the following will cover the functionality of the RPCh exit node, which varies from what a normal HOPR node would be required to do as part of a relay on the HOPR mixnet.

## What does the exit node do?

The RPCh exit node is tasked with reconstructing, decrypting, and translating the request. It must then send it off to the provider and route the response back to the entry node. 

Architecturally this is similar to what the RPCh SDK does in translating the initial request.

[ Insert graphic ]

The exit node does the following:

- First, it waits for all the segments of an individual request to arrive, which it tracks from an ID and counter added to the segments.
- Once all the segments have arrived, it reconstructs the encrypted message by manipulating the necessary syntax.
- The encrypted message is then decrypted using the cryptographic key, which was exposed only to the exit node within the last layer of encryption of the HOPR relay.
- It then performs an external request to the provider URL it was given and receives the response.
- The response is then encrypted, segmented and sent back to the entry node, which has the key to decrypt and read the reconstructed response.

## Rewards For Exit Nodes

Both entry and exit nodes are rewarded for their service through the discovery platform and funding service. But exit nodes are given a larger reward per transaction processed due to the additional functionality they perform.

## Running an RPCh Exit Node

All HOPR node runners will be able to register as an RPCh entry and exit node on the discovery platform with RPCh Beta, but this functionality is not currently available with RPCh Alpha. Entry and exit nodes will only be selected from HOPR nodes controlled by the HOPR association for the Alpha release. 

Upon the release of RPCh Beta, users can register their node through an API which will be exposed for HOPR node runners, and the exit node repository will be updated with a pre-configured docker-compose file that can run HOPRd, RPCh exit node, and kevlar prover functionalities through a single command. 

All information regarding this will be updated in the documentation here. (link)

Note: To run an RPCh node, you will first need to run a HOPR node. You can learn how to set up your own HOPR node here. (link) 