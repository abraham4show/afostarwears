import { create } from "zustand";
import { syncUserWithDb } from "@/services/auth-functions";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  customerType?: string;
  createdAt: string;
};

type AuthState = {
  user: User | null;
  isModalOpen: boolean;
  modalMode: "signin" | "signup";
  onSuccessCallback: (() => void) | null; // Tracks checkout callback route
  openModal: (mode?: "signin" | "signup", callback?: () => void) => void;
  closeModal: () => void;
  setModalMode: (m: "signin" | "signup") => void;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (name: string, email: string, password: string, phone?: string) => Promise<User>;
  signOut: () => void;
  hydrate: () => void;
};

const STORAGE_KEY = "afostar.auth.user";
const USERS_KEY = "afostar.auth.users";

type StoredUser = User & { password: string };

const readUsers = (): StoredUser[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeUsers = (users: StoredUser[]) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isModalOpen: false,
  modalMode: "signin",
  onSuccessCallback: null,
  
  openModal: (mode = "signin", callback) => 
    set({ isModalOpen: true, modalMode: mode, onSuccessCallback: callback || null }),
    
  closeModal: () => set({ isModalOpen: false, onSuccessCallback: null }),
  
  setModalMode: (m) => set({ modalMode: m }),
  
  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) set({ user: JSON.parse(raw) });
    } catch {
      /* noop */
    }
  },
  
  signIn: async (email, password) => {
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!found) throw new Error("Invalid email or password");

    const { password: _pw, ...localUser } = found;

    // 🚀 Sync with Neon Postgres Server Database (Wrapped in 'data' key)
    const serverSync = await syncUserWithDb({
      data: {
        id: localUser.id,
        name: localUser.name,
        email: localUser.email,
        phone: localUser.phone,
      }
    });

    const finalUser = {
      ...localUser,
      role: serverSync.user.role,
      customerType: serverSync.user.customerType,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalUser));
    set({ user: finalUser, isModalOpen: false });

    // If there was a pending action (like proceeding to checkout), run it now!
    if (get().onSuccessCallback) {
      get().onSuccessCallback?.();
    }

    return finalUser;
  },
  
  signUp: async (name, email, password, phone) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists");
    }

    const localUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };

    writeUsers([...users, { ...localUser, password }]);

    // 🚀 Sync and register user inside Neon Postgres DB
    const serverSync = await syncUserWithDb({
      data: {
        id: localUser.id,
        name: localUser.name,
        email: localUser.email,
        phone: localUser.phone,
      }
    });

    const finalUser = {
      ...localUser,
      role: serverSync.user.role,
      customerType: serverSync.user.customerType,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(finalUser));
    set({ user: finalUser, isModalOpen: false });

    // If there was a pending action, run it!
    if (get().onSuccessCallback) {
      get().onSuccessCallback?.();
    }

    return finalUser;
  },
  
  signOut: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
}));