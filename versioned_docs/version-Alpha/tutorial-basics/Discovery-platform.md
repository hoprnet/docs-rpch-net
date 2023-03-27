---
sidebar_position: 4
---

# Discovery Platform

## Overview

The discovery platform is a tool to register HOPR nodes interested in functioning as entry/exit nodes for RPCh. Entry and exit nodes have to be reliable, especially exit nodes that have to perform added functionality beyond that of a HOPR node in relaying data or generating paths. 

As part of the RPCh ecosystem, these nodes are also incentivised to run entry/exit nodes to a high standard and given funds to pay for relays they initiate.

As such, the discovery platform has three main functionalities:

- Allowing node runners to register their HOPR node as a potential entry/exit node for RPCh relays
- Maintaining a reliability score for each registered node
- Funding nodes that serve as entry/exit nodes

To perform these functionalities, the discovery platform interacts with the RPCh SDK and funding service.

![Discovery Platform](/img/Discovery_platform2.png)

**Note:** Currently, with RPCh Alpha, a reliability score is not maintained this feature will be introduced in Beta.  

### Registering Your Node

RPCh Alpha will only be using nodes controlled by the HOPR association. This functionality will only be available with the release of RPCh Beta, in which entry/exit nodes will be chosen from those registered on the discovery platform as described above. 

Upon the release of RPCh Beta, HOPR node runners can use a newly exposed API to register their nodes on the platform. This will be documented and updated [here.](../tutorial-extras/Running-an-RPCh-node.md)

### Funding service 

The RPCh funding service acts as a standalone service whose purpose is solely to send funds to nodes. It is only accessible via our VPC and is not exposed publicly.

While the discovery platform chooses who should receive funds, the funding service handles the actual transactions.