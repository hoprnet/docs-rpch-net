---
sidebar_position: 3
---

# RPCh SDK

## Overview

The SDK is a necessary component which serves two main functions:

- Translating HTTP(S) requests/responses into something the HOPR network can understand.
- Communicating with the discovery platform to choose reliable entry & exit nodes for each relay

### Translating Your Request

The HOPR protocol is a different transport mechanism than the HTTP(S) that requests/responses are sent as. So to send them over the HOPR mixnet, they need to be reformatted. This includes:

- Encryption to hide the request from the entry node
- Segmentation to fit the maximum payload limit of 500 bytes that all packets on the HOPR mixnet are limited to
- Converting the segmented requests/responses into single string messages using breakers to replace syntax
- Adding a numerical ID to each segmented packet so the message can later be reconstructed into its original format

For responses that the SDK receives, it performs a similar function in reverse, reconstructing the message by replacing the breakers with their original syntax, joining the segments into a single message and decrypting it using a corresponding private key only exposed to it upon the formation of the initial request’s relay.

![SDK graphic](/img/SDK_graphic.png)

### Interacting With the Discovery Platform

The SDK also has to interact with the discovery platform to choose suitable entry & exit nodes for each individual request. This interaction is mainly limited to asking the discovery platform for nodes with a high-reliability score and, at the end of the relay, updating the reliability score of each node used.

Currently, with RPCh Alpha, no reliability score is maintained. This will be introduced in RPCh Beta along with the introduction of Kevlar.


<!--
### Kevlar

Kevlar adds light client verification, verifying the integrity of responses sent back from the RPC provider. It requests block headers from a given list of provers and generates several requests for every response that passes through Kevlar. It will then attempt to sync to the latest beacon chain block header to verify the integrity of the following RPC response.
-->