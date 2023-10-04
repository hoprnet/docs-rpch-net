---
sidebar_position: 2
---

# Running an RPCh Node

All HOPR node runners will be able to run an RPCh node with the release of RPCh Beta. Currently, only nodes controlled by the HOPR association are used as entry/exit nodes for RPCh relays.

## What Do Entry/Exit Nodes Do?

Being a node runner for RPCh means you opt your HOPR node in as an entry or exit node for RPCh relays. Depending on which node you register as, you will perform separate, added functionality beyond what a normal HOPR node does.

This is mainly in relation to exit nodes, which must process, re-route and encrypt responses in addition to processing requests. You can read about the architecture of this [here.](../tutorial-basics/Exit-Node.md)

## How to Run an RPCh Node

To run an RPCh node, first, you must be running a HOPR node. You can find the details for this [here.](https://docs.hoprnet.org/node/start-here) 

On the next release: RPCh Beta, an API will be exposed for HOPR nodes to register as entry/exit nodes on the discovery platform. This page will be updated with instructions for this once the eature becomes available.

## Incentives for RPCh Node Runners

Entry/exit nodes must use the HOPR network to send data to each other, which costs HOPR tokens. So they are pre-funded with tokens for each relay and given an extra amount as an incentive to operate as an RPCh node. 

This mechanism will only be available to non-HOPR-controlled nodes upon the release of RPCh Beta and, as such, details will be updated with the next release.  