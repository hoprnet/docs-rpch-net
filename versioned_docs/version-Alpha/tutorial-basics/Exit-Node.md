---
sidebar_position: 5
---

# Exit Node

## Overview

The RPCh exit node communicates with the RPC provider and returns the response to the client. It must:

- Translate the request and response between HTTP(S) and HOPR
- Communicate with the RPC provider 
- Add an extra layer of encryption to obscure the response from the entry node

### Design

The exit node performs its functionality in a similar fashion to the SDK for the translation and encryption of requests/responses. 

![Exit Node graphic](/img/ExitNode_graphic.png)

The exit node does the following:
- First, it waits for all the segments of an individual request to arrive, which it tracks from an ID and counter added to the segments.
- Once all the segments have arrived, it reconstructs the encrypted message by manipulating the necessary syntax.
- The encrypted message is then decrypted using the private key, which is exposed only to the exit node. 
- It then performs an external request to the given provider URL and receives the response.
- The response is finally encrypted, segmented, and returned to the entry node in the same format.

## Ecosystem

### Incentives

Both entry and exit nodes are rewarded for their service through the discovery platform. But exit nodes are given a larger reward per transaction processed due to the additional functionality they perform. The exact details of this will be documented upon the launch of RPCh Beta, as the discovery platform is currently only limited to nodes controlled by the HOPR association. 

### Running an exit node

For RPCh Alpha, only nodes controlled by the HOPR association will be used as entry and exit nodes. This will change with RPCh Beta, where any HOPR node can join the discovery platform and be used as an entry or exit node. The exit node repository will also be updated with a pre-configured docker-compose file that can run HOPRd, RPCh exit node, and Kevlar prover functionalities through a single command.

All information regarding this will be updated in the documentation [here.](../tutorial-extras/Running-an-RPCh-node.md)

**Note:** To run an RPCh node, you will first need to run a HOPR node. You can learn how to set up your own HOPR node [here.](https://docs.hoprnet.org/node/start-here) 
