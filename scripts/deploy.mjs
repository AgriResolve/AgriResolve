import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RPC_URL = process.env.STELLAR_RPC_URL || "https://soroban-testnet.stellar.org";
const NETWORK_PASSPHRASE = process.env.STELLAR_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015";
const USDC_TESTNET = "CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK";

console.log("=== AgriResolve Soroban Contract Deployment ===");

const wasmPath = path.resolve(
  __dirname,
  "../agriresolve-contract/target/wasm32v1-none/release/escrow_engine.wasm"
);

if (!fs.existsSync(wasmPath)) {
  console.log("Compiling escrow_engine.wasm...");
  execSync("cd agriresolve-contract && stellar contract build", { stdio: "inherit" });
}

console.log("Deploying contract to Stellar Testnet...");
const deployCmd = `stellar contract deploy --wasm ${wasmPath} --source-account agriresolve-admin --network testnet --alias agriresolve-contract`;
const contractId = execSync(deployCmd).toString().trim();

console.log(`\n🎉 AgriResolve Contract Deployed!`);
console.log(`Contract ID: ${contractId}`);
console.log(`USDC Token: ${USDC_TESTNET}`);

const envContent = `NEXT_PUBLIC_RPC_URL=${RPC_URL}
NEXT_PUBLIC_NETWORK_PASSPHRASE=${NETWORK_PASSPHRASE}
NEXT_PUBLIC_CONTRACT_ID=${contractId}
NEXT_PUBLIC_USDC_ADDRESS=${USDC_TESTNET}
NEXT_PUBLIC_HORIZON_URL=https://horizon-testnet.stellar.org
`;

fs.writeFileSync(path.resolve(__dirname, "../agriresolve-app/apps/web/.env.local"), envContent);
console.log("Updated agriresolve-app/apps/web/.env.local successfully.");
