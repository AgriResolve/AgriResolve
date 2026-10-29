"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "farmer" | "buyer" | "arbiter";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  walletAddress: string;
  companyName?: string;
  balance: number;
  reputationScore: number;
  joinedDate: string;
  country: string;
  password?: string;
}

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  farmer: {
    id: "usr_farmer_01",
    name: "Maria Santos",
    companyName: "GreenValley Produce Co-op",
    email: "maria@greenvalleyfarms.io",
    role: "farmer",
    walletAddress: "GBJ5W4M4R5VTYOUCYA3E62L6JCG37VHYK2YGB6U2NZZK3J6D22A7FARM",
    balance: 14500,
    reputationScore: 99,
    joinedDate: "Feb 2025",
    country: "Brazil",
  },
  buyer: {
    id: "usr_buyer_01",
    name: "John Thornton",
    companyName: "AgriCorp Commodities International",
    email: "j.thornton@agricorp-intl.com",
    role: "buyer",
    walletAddress: "GAHYU5YGHEOI3MKA2MLW2O46YY74SHBLC4JTVGWN36LH7LL7FFF4O6SS",
    balance: 48200,
    reputationScore: 97,
    joinedDate: "Jan 2025",
    country: "Netherlands",
  },
  arbiter: {
    id: "usr_arbiter_01",
    name: "Dr. Evelyn Vance",
    companyName: "SGS Agro-Quality Inspection Node",
    email: "evelyn.vance@quality-audit.org",
    role: "arbiter",
    walletAddress: "GCS3ZJ46V3K2LL6A5Z9Z4K2M3G4N5B6V7C8X9Z0A1S2D3F4G5H6J7K8L",
    balance: 3800,
    reputationScore: 100,
    joinedDate: "Nov 2024",
    country: "Switzerland",
  },
};

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  loginAsRole: (role: UserRole) => void;
  loginWithWallet: (address?: string) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    role: UserRole;
    companyName?: string;
    walletAddress?: string;
    country?: string;
  }) => Promise<UserProfile>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_STORAGE_KEY = "agriresolve_user_session";
const REGISTERED_USERS_KEY = "agriresolve_registered_users";

function generateStellarAddress(role: UserRole): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let suffix = "";
  for (let i = 0; i < 50; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const prefix = role === "farmer" ? "GB" : role === "buyer" ? "GA" : "GC";
  return `${prefix}${suffix.slice(0, 54)}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(SESSION_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load session from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (typeof window !== "undefined") {
      if (newUser) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  };

  const getRegisteredUsers = (): UserProfile[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(REGISTERED_USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const loginAsRole = (role: UserRole) => {
    const demo = DEMO_USERS[role];
    saveUser(demo);
  };

  const login = async (email: string, password?: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Check if matching a demo user
    const matchedRole = (Object.keys(DEMO_USERS) as UserRole[]).find(
      (r) => DEMO_USERS[r].email.toLowerCase() === cleanEmail
    );
    if (matchedRole) {
      saveUser(DEMO_USERS[matchedRole]);
      return true;
    }

    // 2. Check if in registered users list
    const registered = getRegisteredUsers();
    const existing = registered.find(
      (u) => u.email.trim().toLowerCase() === cleanEmail
    );
    if (existing) {
      if (password && existing.password && existing.password !== password) {
        throw new Error("Incorrect password for this account.");
      }
      saveUser(existing);
      return true;
    }

    // 3. Fallback: Create and sign in user immediately
    const namePart = email.split("@")[0].replace(/[\._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: namePart,
      email: cleanEmail,
      role: "farmer",
      walletAddress: generateStellarAddress("farmer"),
      companyName: `${namePart}'s Farm Operations`,
      balance: 10000,
      reputationScore: 100,
      joinedDate: "Today",
      country: "Global",
      password: password || undefined,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(
        REGISTERED_USERS_KEY,
        JSON.stringify([...registered, newUser])
      );
    }
    saveUser(newUser);
    return true;
  };

  const loginWithWallet = async (providedAddress?: string) => {
    let addr = providedAddress;
    if (!addr && typeof window !== "undefined" && (window as any).freighterApi) {
      try {
        const res = await (window as any).freighterApi.requestAccess();
        if (res && res.address) {
          addr = res.address;
        }
      } catch (err) {
        console.error("Freighter access error", err);
      }
    }
    if (!addr) {
      addr = "GAHYU5YGHEOI3MKA2MLW2O46YY74SHBLC4JTVGWN36LH7LL7FFF4O6SS";
    }

    const newUser: UserProfile = {
      id: `usr_wallet_${addr.slice(0, 8)}`,
      name: `Trader ${addr.slice(0, 4)}...${addr.slice(-4)}`,
      email: `trader-${addr.slice(0, 6).toLowerCase()}@stellar.org`,
      role: "buyer",
      walletAddress: addr,
      companyName: "Stellar Soroban Trader",
      balance: 25000,
      reputationScore: 98,
      joinedDate: "Today",
      country: "Stellar Network",
    };
    saveUser(newUser);
  };

  const signup = async (data: {
    name: string;
    email: string;
    phone?: string;
    password?: string;
    role: UserRole;
    companyName?: string;
    walletAddress?: string;
    country?: string;
  }): Promise<UserProfile> => {
    const cleanEmail = data.email.trim().toLowerCase();
    const registered = getRegisteredUsers();

    const existing = registered.find(
      (u) => u.email.trim().toLowerCase() === cleanEmail
    );
    if (existing) {
      // User already exists, update and sign in
      saveUser(existing);
      return existing;
    }

    const wallet = data.walletAddress?.trim() || generateStellarAddress(data.role);

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      phone: data.phone?.trim() || undefined,
      role: data.role,
      companyName: data.companyName?.trim() || `${data.name.trim()}'s Agricultural Enterprise`,
      walletAddress: wallet,
      balance: data.role === "buyer" ? 35000 : data.role === "farmer" ? 15000 : 5000,
      reputationScore: 100,
      joinedDate: "October 2026",
      country: data.country || "United States",
      password: data.password || undefined,
    };

    // Save to registered list
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          REGISTERED_USERS_KEY,
          JSON.stringify([...registered, newUser])
        );
      } catch (e) {
        console.error("Failed to save registered user", e);
      }
    }

    // Immediately activate session
    saveUser(newUser);
    return newUser;
  };

  const logout = () => {
    saveUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      saveUser({
        ...user,
        role,
        companyName: DEMO_USERS[role].companyName,
        walletAddress: DEMO_USERS[role].walletAddress,
      });
    } else {
      loginAsRole(role);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginAsRole,
        loginWithWallet,
        signup,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
