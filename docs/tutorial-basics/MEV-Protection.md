---
sidebar_position: 7
---

# MEV Protection

RPCh Beta introduced MEV protection via [PropellerHeads](https://docs.propellerheads.xyz/propellerheads-docs/introduction/overview) into RPCh. This is added into RPCh by default and will save users money on mainnet transactions they would have otherwise lost to MEV. 

RPCh uses PropellerHeads' [PropellerSolver](https://docs.propellerheads.xyz/propellerheads-docs/solver-api/introduction) to find the best possible route for your transactions through several liquidity providers. This gives you the best price and prevents backrunning. 

In addition to this, RPCh uses PropellerHeads' [PropellerRPC](https://docs.propellerheads.xyz/propellerheads-docs/private-rpc/set-up-the-rpc) to send requests directly to all major block builders, making your transactions invisible to searchers. This protects you from all frontrunning, sandwich and even multi-block attacks.  

Currently, with the default integration of PropellerHeads, RPCh, by default, only offers MEV protection for mainnet transactions. But you can choose to use your own MEV protection service or even remove it from your version of RPCh. You can find out how to do this [here](../tutorial-extras/getting-started-with-docker.md#optional-choose-custom-mev-provider).