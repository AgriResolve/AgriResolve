# Economic Settlement Model

AgriResolve replaces binary "pay-all or pay-nothing" disputes with proportional, formulaic settlement math. In traditional agricultural trade, when grain quality deviates from specifications, buyers often withhold 100% of the funds even when 95% of the crop's caloric and commercial value remains intact.

AgriResolve calculates empirical price deductions based on international commodity trade standards (e.g., GAFTA / USDA Federal Grain Inspection Service formulas).

---

## The Worked Case Study: 50 Metric Tons of White Maize

### Contract Parameters
- **Commodity:** Grade 2 White Non-GMO Maize
- **Contracted Volume:** 50.00 Metric Tons (50,000 kg)
- **Agreed Unit Price:** 240.00 USDC per Metric Ton
- **Total Escrow Deposited:** **12,000.00 USDC**
- **Token Precision:** 7 decimal places (`120,000,000,000` base units)

### Baseline Contract Quality Tolerances
- **Target Moisture Content:** 13.5%
- **Maximum Moisture Threshold:** 14.0%
- **Foreign Matter (Dockage) Limit:** 1.5%
- **Permitted Weight Shrinkage:** 0.5% (transit evaporation)

---

## Arrival Inspection Results

Upon arrival at the destination mill in Eldoret, Kenya, the independent surveyor pulls representative core samples and issues the arrival inspection certificate:

| Parameter | Contract Baseline | Arrival Actual | Variance |
|---|:---:|:---:|:---:|
| **Gross Delivered Weight** | 50,000 kg | 49,200 kg | -800 kg (-1.60%) |
| **Moisture Content** | 13.50% | 15.50% | +2.00% excess |
| **Foreign Matter (Stems/Dust)** | 1.50% | 2.50% | +1.00% excess |
| **Aflatoxin Count** | < 10 ppb | 4.2 ppb | Within safety limits |

---

## Step-by-Step Deduction Calculations

### 1. Delivered Weight Shortfall Adjustment
The farmer dispatched 50,000 kg, but due to transit handling and spillage, 49,200 kg arrived:
$$\text{Delivered Quantity} = 49.20 \text{ MT}$$
$$\text{Base Delivered Value} = 49.20 \text{ MT} \times 240.00 \text{ USDC/MT} = 11,808.00 \text{ USDC}$$
$$\text{Weight Shortfall Refund} = 12,000.00 - 11,808.00 = 192.00 \text{ USDC}$$

### 2. Moisture Penalty Calculation
Moisture exceeding the 13.5% baseline requires artificial drying at the grain elevator to prevent aflatoxin and mold growth during storage:
- **Excess Moisture:** $15.5\% - 13.5\% = 2.0\%$
- **Standard Commercial Drying Factor:** 1.25% value deduction per 1.0% excess moisture (covers moisture weight evaporation plus dryer fuel expense).
$$\text{Moisture Deduction Rate} = 2.0\% \times 1.25 = 2.50\%$$
$$\text{Moisture Penalty Amount} = 11,808.00 \text{ USDC} \times 2.50\% = 295.20 \text{ USDC}$$

### 3. Foreign Matter (Dockage) Deduction
The buyer must clean the grain to remove 1.0% excess chaff and stones prior to milling:
- **Excess Foreign Matter:** $2.5\% - 1.5\% = 1.0\%$
$$\text{Cleaning Dockage Deduction} = 11,808.00 \text{ USDC} \times 1.0\% = 118.08 \text{ USDC}$$

---

## Settlement Distribution Summary

### Total Deductions & Split
$$\text{Total Deductions (Buyer Refund)} = 192.00 + 295.20 + 118.08 = 605.28 \text{ USDC}$$
$$\text{Net Farmer Payout} = 12,000.00 - 605.28 = 11,394.72 \text{ USDC}$$

| Recipient | Share % | Amount (USDC) | Base Units (Stroops, 7 decimals) |
|---|:---:|:---:|:---:|
| **Farmer (Producer)** | 94.956% | **11,394.72 USDC** | `113,947,200,000` |
| **Buyer (Purchaser Refund)** | 5.044% | **605.28 USDC** | `6,052,800,000` |
| **Total Escrow Balance** | 100.000% | **12,000.00 USDC** | `120,000,000,000` |

---

## On-Chain Conservation Enforcement

When the arbiter calls `execute_resolution`, the Soroban contract runs checked 128-bit arithmetic:

```rust
let total_payout = buyer_share
    .checked_add(farmer_share)
    .ok_or(ContractError::MathOverflow)?;

if total_payout != trade.amount {
    return Err(ContractError::SplitMismatch);
}
```

- `113,947,200,000 + 6,052,800,000 == 120,000,000,000`
- Zero wei or stroops stranded in contract.
- The farmer recovers 94.95% of expected revenue instead of suffering a total default or cancellation.
- The buyer is compensated for actual drying and cleaning expenses.
