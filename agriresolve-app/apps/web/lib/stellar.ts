export const NETWORK_CONFIG = {
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || "https://soroban-testnet.stellar.org",
  networkPassphrase: process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015",
  contractId: process.env.NEXT_PUBLIC_CONTRACT_ID || "CAPZ2NHR5OYR45WH4BBFVKRG2UYII6P3DD3JNP6CJ6LQ4GJDZVOGITQ4",
  usdcAddress: process.env.NEXT_PUBLIC_USDC_ADDRESS || "CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK",
};

export enum EscrowState {
  Funded = 0,
  Delivered = 1,
  Disputed = 2,
  Resolved = 3,
  Refunded = 4,
}

export interface TradeDetails {
  id: number;
  buyer: string;
  farmer: string;
  arbiter: string;
  token: string;
  amount: number;
  commodity?: string;
  state: EscrowState;
  deliveryHash?: string;
  expiry: number;
  buyerShare: number;
  farmerShare: number;
  createdAt: number;
}

export const DEMO_TRADES: TradeDetails[] = [
  {
    id: 1,
    buyer: "GAHYU5YGHEOI3MKA2MLW2O46YY74SHBLC4JTVGWN36LH7LL7FFF4O6SS",
    farmer: "GBJ5W4M4R5VTYOUCYA3E62L6JCG37VHYK2YGB6U2NZZK3J6D22A7FARM",
    arbiter: "GCS3ZJ46V3K2LL6A5Z9Z4K2M3G4N5B6V7C8X9Z0A1S2D3F4G5H6J7K8L",
    token: "CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK",
    amount: 15_000_000, // 1.5 USDC or scaled 15,000 USDC in display
    commodity: "500 MT Grade-1 Non-GMO Soybeans",
    state: EscrowState.Disputed,
    deliveryHash: "84f9cfa549c318847d1cede87688c73cf9d125893c3a5a90ba74b82c5e325565",
    expiry: Math.floor(Date.now() / 1000) + 86400 * 7,
    buyerShare: 0,
    farmerShare: 0,
    createdAt: Math.floor(Date.now() / 1000) - 3600 * 4,
  },
  {
    id: 2,
    buyer: "GAHYU5YGHEOI3MKA2MLW2O46YY74SHBLC4JTVGWN36LH7LL7FFF4O6SS",
    farmer: "GBV4X4M4R5VTYOUCYA3E62L6JCG37VHYK2YGB6U2NZZK3J6D22A7KOR2",
    arbiter: "GCS3ZJ46V3K2LL6A5Z9Z4K2M3G4N5B6V7C8X9Z0A1S2D3F4G5H6J7K8L",
    token: "CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK",
    amount: 10_000_000, // 1.0 USDC
    commodity: "300 MT Hard Red Winter Wheat",
    state: EscrowState.Funded,
    deliveryHash: "84f9cfa549c318847d1cede87688c73cf9d125893c3a5a90ba74b82c5e325565",
    expiry: Math.floor(Date.now() / 1000) + 86400 * 3,
    buyerShare: 0,
    farmerShare: 0,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 2,
  },
  {
    id: 3,
    buyer: "GDK3ZJ46V3K2LL6A5Z9Z4K2M3G4N5B6V7C8X9Z0A1S2D3F4G5H6J7BUY3",
    farmer: "GBJ5W4M4R5VTYOUCYA3E62L6JCG37VHYK2YGB6U2NZZK3J6D22A7FARM",
    arbiter: "GCS3ZJ46V3K2LL6A5Z9Z4K2M3G4N5B6V7C8X9Z0A1S2D3F4G5H6J7K8L",
    token: "CCQGOTGN6HTQE74XYERYSYVU57T5NPYWV5DLCROMB56OXTV6RSO6KIGK",
    amount: 25_000_000, // 2.5 USDC
    commodity: "750 MT Organic Yellow Corn",
    state: EscrowState.Resolved,
    deliveryHash: "a1b2c3d4e5f678901234567890abcdef1234567890abcdef1234567890abcdef",
    expiry: Math.floor(Date.now() / 1000) - 3600,
    buyerShare: 15_000_000,
    farmerShare: 10_000_000,
    createdAt: Math.floor(Date.now() / 1000) - 86400 * 5,
  },
];

export function formatStroops(amount: number): string {
  return (amount / 10_000_000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
}

export function parseToStroops(amount: string | number): number {
  return Math.round(Number(amount) * 10_000_000);
}

export function shortenAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
}

export function getStateBadge(state: EscrowState): { label: string; color: string } {
  switch (state) {
    case EscrowState.Funded:
      return { label: "Funded", color: "bg-[#DCEBCA] text-[#1E4D2B] border border-[#B8C7B7]" };
    case EscrowState.Delivered:
      return { label: "Delivered", color: "bg-[#2D6A4F] text-white border border-[#2D6A4F]" };
    case EscrowState.Disputed:
      return { label: "Disputed", color: "bg-white text-[#1E4D2B] border-2 border-[#1E4D2B] font-bold" };
    case EscrowState.Resolved:
      return { label: "Resolved", color: "bg-[#1E4D2B] text-white border border-[#1E4D2B]" };
    case EscrowState.Refunded:
      return { label: "Refunded", color: "bg-stone-200 text-stone-700 border border-stone-300" };
    default:
      return { label: "Unknown", color: "bg-stone-100 text-stone-600 border border-stone-300" };
  }
}
