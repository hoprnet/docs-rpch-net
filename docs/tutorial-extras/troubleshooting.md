---
sidebar_position: 4
---

# Troubleshooting

The RPCh Alpha integration with BlockWallet has a few known bugs. They have been outlined below, along with troubleshooting tips to resolve the issue. If the known solutions do not work, try following the [additional steps outlined.](./troubleshooting.md#next-steps)

## BlockWallet Bugs

### Gas Estimation Error

**Known Issue:** Sometimes your wallet will display the “Gas estimation failed” error. As displayed in the image below.

**Solution:** The vast majority of the time, your transaction will still go through once you click `OK`.

<p align="center">
  <img src="/img/Gas_Estimation_failed.png" alt="Gas Estimation"/>
</p>


### Missing Transactions

**Known Issue:** The activity tab might not display transactions right away.

**Solution:** Switch networks from `Gnosis on RPCh` to another network such as `Ethereum Mainnet`. And then switch networks back to `Gnosis on RPCh` to force the UI to update. 

Switching Networks:

<p align="center">
  <img src="/img/Switching_Networks.gif" alt="Gas Estimation"/>
</p>

### Network Provider Down

**Known Issue:** You may encounter a page with the error: `Network Provider Down`. This sometimes happens when you restart your browser or wallet.

**Solution:** Switch networks from `Gnosis on RPCh` to another network such as `Ethereum Mainnet`. And then switch networks back to `Gnosis on RPCh`.

<p align="center">
  <img src="img/Network_provider_down.gif" alt="Gas Estimation"/>
</p>

### Transaction Stuck Processing

**Known Issue:** Confirmed transactions will sometimes get stuck as processing in the activity tab.

**Solution:** The UI should update on its own after a few seconds.

<p align="center">
  <img src="/img/Stuck_Processing.gif" alt="Gas Estimation"/>
</p>

### Invalid Address 

**Known Issue:** Sometimes you get an image similar to the one below, where BlockWallet is stuck with an `Invalid Address` error. 

**Solution:** Restarting your wallet, but sometimes this may result in [transactions still not going through.](./troubleshooting.md#transactions-stuck)

<p align="center">
  <img src="/img/Invalid_address.png" alt="Gas Estimation"/>
</p>

### Transactions Stuck

**Known Issue:** Transactions can get stuck and stop going through giving you a BlockWallet error splash screen similar to the one below.

**Solution:** Try resetting your account, and if that does not work, re-installing your extension.

<p align="center">
  <img src="/img/Tansaction_Stuck.gif" alt="Gas Estimation"/>
</p>

## Next Steps

In case the original solution to any particular error doesn’t work, try the following:

- Restarting your wallet / Resetting your account

<p align="center">
  <img src="/img/Reset_account.gif" alt="Gas Estimation"/>
</p>

- Resinatlling your extension
- Contacting support

## Contacting Support 

We have an active discord channel you can use to contact support if you have any issues using BlockWallet or the RPCh Docker connector.

Discord channel: [discord.gg/QQNZTCsq](https://discord.com/invite/QQNZTCsg)