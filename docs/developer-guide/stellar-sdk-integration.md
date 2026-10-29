# Stellar SDK & Freighter Integration Guide

This guide demonstrates how to interact with the AgriResolve Soroban escrow contract using `@stellar/stellar-sdk` and `@stellar/freighter-api`.

---

## 1. Connecting the Freighter Wallet

Install dependencies:
```bash
pnpm add @stellar/stellar-sdk @stellar/freighter-api
```

Connect and query the active public key:

```typescript
import { isConnected, requestAccess, getAddress } from "@stellar/freighter-api";

export async function connectWallet(): Promise<string | null> {
  const connected = await isConnected();
  if (!connected) {
    throw new Error("Freighter wallet extension is not installed.");
  }

  const access = await requestAccess();
  if (!access) {
    throw new Error("User declined wallet authorization.");
  }

  const { address } = await getAddress();
  return address;
}
```

---

## 2. Reading Contract State via Soroban RPC

Soroban read-only calls (such as `get_trade` or `get_trade_count`) do not require wallet signing or network transaction fees. They execute via read-only simulation:

```typescript
import { rpc, Contract, nativeToScVal } from "@stellar/stellar-sdk";

const server = new rpc.Server("https://soroban-testnet.stellar.org");
const contract = new Contract("CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4");

export async function fetchTrade(escrowId: number) {
  // 1. Build the read call
  const tx = contract.call("get_trade", nativeToScVal(escrowId, { type: "u64" }));

  // 2. Simulate against RPC
  const simResponse = await server.simulateTransaction(tx);

  if (rpc.Api.isSimulationSuccess(simResponse)) {
    // 3. Deserialize ScVal return payload
    console.log("Trade State:", simResponse.result.retval);
    return simResponse.result.retval;
  } else {
    throw new Error(`Simulation failed: ${simResponse.error}`);
  }
}
```

---

## 3. Assembling & Submitting State-Changing Transactions

Below is the complete pattern for assembling `flag_dispute`, signing via Freighter, and polling for on-chain inclusion:

```typescript
import {
  rpc,
  Contract,
  TransactionBuilder,
  nativeToScVal,
  Account,
} from "@stellar/stellar-sdk";
import { signTransaction } from "@stellar/freighter-api";

const RPC_URL = "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = "Test SDF Network ; September 2015";
const CONTRACT_ID = "CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4";

export async function submitFlagDispute(callerAddress: string, escrowId: number) {
  const server = new rpc.Server(RPC_URL);
  const contract = new Contract(CONTRACT_ID);

  // 1. Fetch account sequence
  const accountResponse = await server.getAccount(callerAddress);
  const account = new Account(callerAddress, accountResponse.sequence);

  // 2. Build transaction operation
  const op = contract.call(
    "flag_dispute",
    nativeToScVal(callerAddress, { type: "address" }),
    nativeToScVal(escrowId, { type: "u64" })
  );

  let tx = new TransactionBuilder(account, {
    fee: "100000",
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(op)
    .setTimeout(30)
    .build();

  // 3. Simulate to calculate exact footprint & resource fees
  const preparedTx = await server.prepareTransaction(tx);

  // 4. Request user signature from Freighter
  const signedXdr = await signTransaction(preparedTx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  // 5. Submit transaction to Soroban RPC
  const sendResponse = await server.sendTransaction(
    TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE)
  );

  if (sendResponse.status === "ERROR") {
    throw new Error(`Transaction submission failed: ${sendResponse.errorResultXdr}`);
  }

  // 6. Poll for testnet ledger confirmation
  let txResult = await server.getTransaction(sendResponse.hash);
  while (txResult.status === rpc.Api.GetTransactionStatus.NOT_FOUND) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    txResult = await server.getTransaction(sendResponse.hash);
  }

  if (txResult.status === rpc.Api.GetTransactionStatus.SUCCESS) {
    console.log(`Dispute confirmed in ledger! Hash: ${sendResponse.hash}`);
    return sendResponse.hash;
  } else {
    throw new Error("Transaction execution failed on-chain.");
  }
}
```
