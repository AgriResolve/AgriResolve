"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "farmer" | "buyer" | "arbiter";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  walletAddress: string;
  companyName?: string;
  balance: number;
  reputationScore: number;
  joinedDate: string;
  country: string;
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
  login: (email: string) => Promise<boolean>;
  loginAsRole: (role: UserRole) => void;
  loginWithWallet: (address?: string) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    role: UserRole;
    companyName?: string;
    walletAddress?: string;
    country?: string;
  }) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "agriresolve_user_session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load session from localStorage", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = (newUser: UserProfile | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const loginAsRole = (role: UserRole) => {
    const demo = DEMO_USERS[role];
    saveUser(demo);
  };

  const login = async (email: string): Promise<boolean> => {
    // Check if matching demo user
    const matchedRole = (Object.keys(DEMO_USERS) as UserRole[]).find(
      (r) => DEMO_USERS[r].email.toLowerCase() === email.toLowerCase()
    );
    if (matchedRole) {
      saveUser(DEMO_USERS[matchedRole]);
      return true;
    }
    // Default account creation on login if custom email
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: email.split("@")[0].replace(/[\._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      email,
      role: "farmer",
      walletAddress: "GBJ5W4M4R5VTYOUCYA3E62L6JCG37VHYK2YGB6U2NZZK3J6D22A7FARM",
      companyName: "Agricultural Operations",
      balance: 5000,
      reputationScore: 100,
      joinedDate: "Today",
      country: "Global",
    };
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
      email: `trader-${addr.slice(0, 6).toLowerCase()}@stellar.account`,
      role: "buyer",
      walletAddress: addr,
      companyName: "Soroban Web3 Trader",
      balance: 10000,
      reputationScore: 98,
      joinedDate: "Today",
      country: "Stellar Network",
    };
    saveUser(newUser);
  };

  const signup = async (data: {
    name: string;
    email: string;
    role: UserRole;
    companyName?: string;
    walletAddress?: string;
    country?: string;
  }) => {
    const demo = DEMO_USERS[data.role];
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      companyName: data.companyName || `${data.name}'s Agricultural Services`,
      walletAddress: data.walletAddress || demo.walletAddress,
      balance: data.role === "buyer" ? 25000 : data.role === "farmer" ? 10000 : 2500,
      reputationScore: 100,
      joinedDate: "Just now",
      country: data.country || "Global",
    };
    saveUser(newUser);
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
