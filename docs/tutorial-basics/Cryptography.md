---
sidebar_position: 6
---

# Cryptography

This section provides a more detailed overview of RPCh's architecture and the cryptography used to provide its privacy offerings.

## Situation

RPCh is used to route Ethereum transactions from a wallet through the HOPR network to preserve privacy (mainly anonymity through hiding metadata of the transaction sender).

There are the following parties in the current RPCh infrastructure:

* Wallet
* RPCh Client
* HOPR Entry node
* HOPR Intermediate node
* HOPR Exit node
* RPCh Exit node
* Discovery Platform
* Final RPC provider

The wallet software uses RPCh client API to format the signed transaction as a message that’s accepted by the RPCh Exit node. It queries the Discovery Platform (public service) for available HOPR Exit nodes, offering the RPCh Exit node functionality. It also queries the Discovery Platform for available HOPR Entry nodes. RPCh API then sends the formatted message via the HOPR entry node over the HOPR network (where HOPR intermediate nodes act as relays) to the HOPR Exit node. Upon reception by the HOPR exit node, the data is handed over to the RPCh Exit node, which reformats the data and sends the transaction to the final RPC provider. The message sent to the HOPR Entry node is not encrypted or authenticated. The Discovery Platform is implemented using an on-chain smart contract, and the data it stores are immutable.

## Threat model

* The User **trusts** the wallet. The user wants to hide the _information_ contained in the transaction from all untrusted nodes in the RPCh infrastructure.
* The Discovery Platform is a third-party **trusted** by the user. The _information_ is never reaching it in any form.
* RPCh Client runs in the same environment as the wallet and must therefore be **trusted** by the user.
* The HOPR Entry nodes nor the HOPR Intermediate nodes **are not to be trusted** by the user regarding the _information_.
* The Entry Node chooses the Intermediate node, the node after the Entry node and before the Exit node. Thus it needs to be **trusted **in terms of not revealing the correlation between incoming messages and the chosen path.
* The final RPC provider executes the transaction based on the _information_ and must therefore be **trusted** by the user.
* The RPCh Exit Node delivers the _information_ to the final RPC provider and, therefore, must be **trusted **by the user.
* The HOPR Exit node runs in the same environment as the RPCh Exit node and, therefore, must also be **trusted** by the user.
* Due to the HOPR protocol already ensuring message confidentiality, integrity and authentication, the _information_ is never disclosed to any HOPR Intermediate nodes while in transit.

## The Problem

As outlined in the above threat model, the only _untrusted party_ that can read, re-use, change or otherwise interpret the information is the HOPR Entry Node. The idea of this document is to propose a protocol so that the information is hidden from the HOPR Entry node and it cannot act maliciously based on the information, namely:

* HOPR Entry node cannot read the information
* HOPR Entry node cannot modify the information
* HOPR Entry node cannot re-send information it has previously received from the User’s RPCh Client (replay attack)

The above requirements mean the designed protocol must establish message confidentiality, integrity and authenticity.

## Proposed Protocol

### Definitions

The || sign denotes the byte sequence concatenation. Unless explicitly stated otherwise, we use the Big Endian byte ordering (= most significant byte first) when interpreting numbers as bytes. The |X| denotes the size of X in bytes (when serialized). 

In a particular case, constants |K| and |IV| denote the known fixed key size or the fixed initialization vector size, respectively, of the chosen symmetric cipher.

The protocol aims to achieve at least 128-bit security, meaning that breaking the protocol should be at least as hard as, e.g. finding a collision (second pre-image attack) of an ideal 256-bit long cryptographic hash function.

Here’s the list of the general cryptographic primitives used in the protocol:

* ENC<sub>K</sub>(IV,M) = (C,T) denotes authenticated encryption of a plaintext message M, using a secret key K and a unique initialization vector IV. The resulting product is a ciphertext C and an authentication tag T. The additional authenticated data (AAD) that such an encryption scheme might support is omitted for this protocol.
* DEC<sub>K</sub>(IV,C,T) = (M, {0,1})  denotes decryption and verification of a given message M, authentication tag T, initialization vector IV, and a secret key K. The resulting product is the alleged plaintext message M and an indicator whether the obtained message is authentic (1) or not (0).
* ECDH(s,P) = Q  denotes the Elliptic Curve Diffe-Hellman step, i.e. multiplication of a point P on a common elliptic curve by a secret scalar s, resulting in a new point Q = sP .
* KDF<sub>i</sub>(Q,t,n) = s denotes a key derivation function with index i, applied to an elliptic curve point Q and additional tag t. The result is a byte string s of length n bytes.
* GEN() = (s,P) generates a random valid keypair on an elliptic curve (compatible with ECDH) using a cryptographically secure random number generator. The result is a private key s and a corresponding public key P.
* COMP(P) = b denotes an elliptic curve point serialization function that compresses the given elliptic curve point P into a string of bytes (e.g., this typically consists of a sign bit and X coordinate of P).

To meet the minimal security requirements mentioned above, we will assume a secure elliptic curve over a prime field with the size of the prime ~ 2<sup>256</sup> . We will also assume a symmetric cipher that accepts at least a 128-bit secret key and an IV of at least 12 bytes. We assume the symmetric cipher does not require padding of the input message or is taken care of automatically in its implementation (in case the instantiation is a block cipher). 

The current version byte is denoted as Ver (|Ver| = 1), and its value is 0x11. The second nibble of the byte denotes the ciphersuite version, and the first nibble denotes the protocol version. If a different instance of this protocol uses a different combination of cryptographic primitives, it must use a different value of the second nibble, e.g. 0x12. Protocol modifications which are not backwards compatible must use a different first nibble, e.g. 0x21.

For concrete examples of instantiations of the above cryptographic primitives so that the security requirements are fulfilled, see the instantiation section below.

### Initial stage

* Each RPCh Exit Node N generates an elliptic curve keypair, such that:

```
(sN , PN) = GEN()
```
And stores the P<sub>n</sub> in the Discovery Platform, so it is undeniably linked with some of its identifiers (e.g. peer ID).

* The RPCh Client maintains a monotonic counter C<sub>req</sub> of requests sent to a given RPCh Exit node and also C<sub>resp_last</sub>, which is the counter value last seen on a response from a given RPCh Exit node. Similarly, the RPCh Exit nodes maintain counter C<sub>req_last</sub>, which is the counter value last seen on a request from a given RPCh client and C<sub>resp</sub> as a counter of responses sent to a given RPCh client. We assume the size of the counters to be the same and at least 64 bits, ie. |C| = |C<sub>req</sub>| = |C<sub>resp</sub>| = 8 .
* Likewise, the RPCh Exit node maintains the counter value of the last message received from a given RPCh client.
* We assume that the RPCh Exit node knows the Peer ID of the RPCh Entry node (embedded in the message)—this is due to the current state of the HOPR protocol missing the privacy-preserving return path implementation.
* Note that this version of the protocol assumes that the RPCh Exit node can identify individual RPCh Client nodes so that it can maintain the individual counters C<sub>last_req</sub> and C<sub>resp</sub> per each RPCh client. If that is not possible, UTC timestamps can be used instead of the counters (discussed in further chapters). The Exit node then maintains C<sub>last_req</sub> and C<sub>resp</sub> (UTC timestamp) per HOPR Entry node.

### Request construction stage

This stage is executed on a wallet software system with the RPCh client. 

A new transaction request is given by the wallet to the RPCh client, and it is pre-formatted in the format used by RPCh. We will denote this pre-formatted message as M.

Let’s assume the RPCh client has already chosen an RPCh Exit node N with an identifier ID<sub>exit</sub> and verifiably queried its public key P<sub>N</sub> from the Discovery Platform.

The RPCh Client then proceeds with generating parameters for the message transformation.

* The RPCh Client generates a new random elliptic curve key pair and computes the Diffie-Hellman step using the RPCh Exit node’s public key to generate a per-message secret pre-key.

```
(qM , QM) = GEN()
Spre = ECDH(qM, PN)
```

* Next, it retrieves the counter value C<sub>req</sub> for the selected RPCh Exit node and generates parameters required for a symmetric authenticated encryption of the message M.

```
KM = KDF1(Spre , Ver || IDexit || "req", |K|)
IV1 = KDF2(Spre , Ver || IDexit || "req", |IV| - |C|)
IVM = IV1 || Creq
```

* Then it encrypts the message M to produce a ciphertext C and authentication tag T.

```
(R, T) = ENCKM(IVM , M)
```

* Finally, the RPCh client formats the final request message Req which is then delivered to the HOPR Entry node. 

```
W = COMP(QM)
Req = Ver || W || Creq || R || T
```

* RPCh client sends Req using the HOPR Entry node. Via the HOPR protocol, it gets delivered to the destination RPCh Exit node.
* Note that with the assumed security parameters of the used primitives, the size of the request Req is 58 (|Ver| = 1, |W| = 33, |C<sub>req</sub>| = 8, |T| = 16) plus the size of the ciphertext R. If the underlying symmetric cipher does not require input message padding, the size of Req will be exactly equal 58 + |M|.

### Request reception stage

The following stage is executed on the RPCh Exit node after delivery of the RPCh message Req. Since the HOPR protocol at its current state includes the Peer ID of the HOPR Entry node (sender) into the message (missing return path implementation), we assume the RPCh Exit node knows the Peer ID ID<sub>entry</sub>.

* The RPCh Exit node N (with identifier ID<sub>exit</sub>) decomposes Req into the individual parameters (knowing their size is fixed). If Ver has a value it supports, it decompresses the EC point Q<sub>M</sub>. Then it combines its own private key s<sub>N</sub> with the decompressed point to recover the secret per-message pre-key S<sub>pre</sub>. If the RPCh Exit node does not support the version given by Ver, the sender is notified via the upper protocol layer.

```
(Ver, W, C, R, T) = Req
QM = COMP-1(W)
Spre = ECDH(sN , QM)
```

* Then, the RPCh Exit node uses S<sub>pre</sub> to compute the per-message parameters needed to decrypt and verify the ciphertext. ID is an identifier of the RPCh Exit node.

```
KM = KDF1(Spre , Ver || IDexit || "req", |K|)
IV1 = KDF2(Spre , Ver || IDexit || "req", |IV| - |C|)
IVM = IV1 || Creq
```

* Next, it decrypts the ciphertext, obtains the validation result V, and recovers M.

```
(M, V) = DECKM(IVM, R, T)
```

* The RPCh Exit Node discards the message M (checks done exactly in the following order) if :
1. V is equal to 0 (the authentication tag validation failed)
2. The RPCh Exit node retrieves from its persistent storage the last seen value of the counter C<sub>req_last</sub> for the sender with ID<sub>entry</sub>. If C<sub>req</sub> &lt;= C<sub>req_last</sub>, the message is discarded (replay attack protection).
* If the message has not been discarded, the RPCh Exit node stores the new value of C<sub>req</sub> by replacing the C<sub>req_last</sub>. Then it proceeds with processing the message M as usual, eventually forwarding it to the final RPC provider.

### Response construction phase

After the RPCh receives the result U of the transaction sent to the final RPC provider, it begins constructing the response, which it sends back to the RPC Client (via the HOPR network).

We assume that U has already been formatted to the RPCh message format. 

* The RPCh Exit node increments the value C<sub>resp</sub> of the counter stored for the given sender by 1. It also persists in this updated counter value.
* The RPCh Exit Node generates a new set of per-message parameters to encrypt U.

```
KU = KDF3(Spre , Ver || IDentry || "resp", |K|)
IV2 = KDF4(Spre , Ver || IDentry || "resp", |IV|-|C|)
IVU = IV2 || Cresp
```

* Then it proceeds with encrypting the response message U to produce a ciphertext R<sub>2</sub> and authentication tag T<sub>2</sub>.

```
(R2, T2) = ENCKU(IV2 , U)
```

* Lastly, the RPCh client formats the final request message Resp which is then delivered to the HOPR Entry node and subsequently to the RPCh client. 

```
Resp = Cresp || R2 || T2
```

* The size of Resp is 24 + |C<sub>resp</sub>|. Note that W in the response was omitted since the entire session state between RPCh client and RPC Exit node is kept and not discarded. This could save 33 bytes in the payload (which could be used by R<sub>2</sub>), and it is safe to use since we already need to trust the RPC Exit node. Another 1 byte is saved because the version is omitted (assumed constant per session).

### Response reception phase

This is the last phase executed on the RPCh client upon receiving the response Resp.

* After decomposing Resp into the individual parameters, the RPCh client recovers the per-message parameters.

```
(Cresp, R2, T2) = Resp
KU = KDF3(Spre , Ver || IDentry || "resp", |K|)
IV2 = KDF4(Spre , Ver || IDentry || "resp", |IV|-|C|)
IVU = IV2 || Cresp
```

* Next, it decrypts the ciphertext, obtains the validation result V2, and recovers U.

```
(U, V2) = DECKU(IVU, R2, T2)
```

* The RPCh client discards the message U (checks done exactly in the following order) if :
3. V<sub>2</sub> is equal to 0 (the authentication tag validation failed)
4. The RPCh client retrieves from its persistent storage the last seen value of the counter C<sub>resp_last</sub> for the sender with ID<sub>exit</sub>. If C<sub>resp</sub> &lt;= C<sub>resp_last</sub>, the message is discarded (replay attack protection).
* If the message has not been discarded, the RPCh client stores the new value of C<sub>resp</sub> by replacing the C<sub>resp_last</sub>. Then it proceeds with processing the message U as usual, eventually forwarding it to the wallet.

### Use of UTC timestamps as Counters

In general, if time is assumed to be reasonably synchronized and monotonic across Exit and client nodes, the usage of UTC timestamp (with millisecond precision) is possible to be used instead of C<sub>req</sub> and C<sub>resp</sub>.

The following steps are then different:

* In the request construction phase, the RPCh client uses the current UTC timestamp as C<sub>req</sub> . Instead of an incremented C<sub>last_req</sub> value (it would have retrieved from its persistent storage).
* In the request reception phase, the RPCh Exit node verifies that received C<sub>req</sub> is strictly greater than C<sub>last_req</sub> it has stored and also verifies that the received C<sub>req</sub> is not in the future compared to its current UTC time (within some reasonable tolerance). If the verification passes, the Exit node updates C<sub>last_req</sub> with the C<sub>req</sub> as usual.
* In the response construction phase, the RPCh Exit node uses the current UTC timestamp as C<sub>resp</sub> instead of an incremented value C<sub>last_resp</sub> (it would have retrieved from its persistent storage).
* In the response reception phase, the RPCh client node verifies that the received C<sub>resp</sub> is strictly greater than the C<sub>last_resp </sub>it has stored and also verifies that the received C<sub>resp</sub> is not in the future compared to its current UTC time (within some reasonable tolerance).

### Edge cases

#### Loss of the counter

There are situations where the stored counter values C<sub>last_req</sub> and C<sub>last_resp</sub> can be lost. This is more likely to happen on the RPCh client node rather than the RPCh Exit node.

#### Loss on RPCh Exit node

The loss of the C<sub>last_req</sub> on the RPCh Exit node has greater security implications since a malicious Entry node could easily take past messages it has seen and replay that to the RPCh Exit node.

This is more easily mitigated when timestamps are being used as counters. In case of the loss, the Exit node sets the C<sub>last_req</sub> and C<sub>last_resp</sub> to the current UTC timestamp. This can slightly harm RPCh client requests being rejected at that point in time but will prevent the malicious Entry nodes from replaying old recorded requests.

When non-timestamp based counters are being used, the security against a replay attack relies on the RPCh client sending an honest request first, then a replayed request sent by a malicious Entry node (if C<sub>last_req</sub> has been lost).

The loss of C<sub>last_resp</sub> has fewer security implications because, from the RPCh client perspective, the request and response are tied together via the unique EC keypair generated during the request construction phase. Therefore, the response freshness guarantees are far stronger for the RPCh client. In case of loss, the RPCh Exit node can set C<sub>last_resp</sub> to an arbitrarily high value it “knows” (out of band) it has not used before. The selection of such value is left for the implementer to decide.

#### Loss on RPCh Client node

Since the received responses are tied to the requests by a unique EC keypair (generated during the request construction phase), and a session is established per request/response roundtrip, the RPCh client has guaranteed that the received response belongs to the request it sent earlier.

The loss of either C<sub>last_req</sub> or C<sub>last_resp</sub> on the RPCh client has a less detrimental effect on security than on the RPCh Exit node.

In case of loss, the RPCh client node can set C<sub>last_req</sub> to an arbitrarily high value it “knows” (out of band) it has not used before. The selection of such value is left for the implementer to decide.

Because of the above-mentioned request/response tieing guarantees, the lost value of C<sub>last_resp</sub> can be set to 0 and will be updated once the next response is received.

The case is mitigated more easily when timestamps are being used as counters. In case of loss, the C<sub>last_req</sub> and C<sub>last_resp</sub> will be set to the current UTC timestamp value.

#### Other edge cases 

TBD

* HOPR Exit node public key compromise & revocation
* Counter overflow (pretty hard to achieve if |C| = |C<sub>resp</sub>| = |C<sub>req</sub>| = 8)
* When the return path is added to the HOPR protocol, response construction must be adjusted because the exit node might no longer know the Entry node’s peer ID.
* …

## Instantiation

Here is a concrete and recommended instantiation of the cryptographic primitives:

* Ver = 0x11
* ENC, DEC is Chacha20 with Poly1305. It accepts the key size of 256 bits, and the IV size is 96 bits. It preserves the size of the plaintext/ciphertext.
* ECDH is currently based on secp256k1 due to easier compatibility with the Smart Contracts. However, we would ideally want to use X25519, a concrete Elliptic curve Diffie-Hellman instantiation over Curve25519 with the prime field of size 2<sup>255</sup> - 19. 
* COMP and GEN are based on Curve25519.
* KDF is an Hmac-based Key Derivation Function (HKDF) with Blake2s256 as a hash function. Alternatively, SHA-3 finalists are also suitable when the input parameters are simply concatenated and given as input into the hash function for a single hashing.
