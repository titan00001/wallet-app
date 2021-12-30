# Wallet API

## Overview

A plugin module created with Nestjs to enable the client to use wallet features.


## Important Note

Host Module needs to ensure the integrity and availability of `userId` before passing it to the wallet service.

## Services available:
- ```Wallet.getWallet(userId)``` - Find or create the wallet with initial credit and return the wallet.
- ```Wallet.addCredits(userId, amount, transactionData)``` - Add credits to the wallet. If wallet is not present for the user, it will create the wallet with initial credit and then add the credit.
- ```Wallet.withdrawCredit(userId, amount, transactionData)``` - Withdraw credits from the wallet. If wallet is not present for the user, it will create the wallet with initial credit and then withdraw the credit. It will throw and HTTP Exception if withdrawal amount is greater than the remainng credits
- ```Wallet.getAllTransactions(userId)``` - Get all the transactions in the wallet associated with the userId.

## Installation


## Setup

```ts
@Module({
  imports: [
      WalletModule, // setup the module
      CatsModule,
      DogsModule,
  ], // as usual, nothing new
})
export class ApplicationModule {}
```

```ts
@Module({
  ...,
  providers: [WalletService], // import the service wherever needed
  ...
})
export class CatsModule {}
```
