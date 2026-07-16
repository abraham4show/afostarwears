import { create } from "zustand";
<<<<<<< HEAD
import { syncUserWithDb } from "@/services/auth-functions";
=======
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
<<<<<<< HEAD
  role?: string;
  customerType?: string;
=======
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
  createdAt: string;
};

type AuthState = {
  user: User | null;
  isModalOpen: boolean;
  modalMode: "signin" | "signup";
<<<<<<< HEAD
  onSuccessCallback: (() => void) | null; // Keeps track of where the user was going (e.g. checkout)
  openModal: (mode?: "signin" | "signup", callback?: () => void) => void;
=======
  openModal: (mode?: "signin" | "signup") => void;
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
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

<<<<<<< HEAD
export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isModalOpen: false,
  modalMode: "signin",
  onSuccessCallback: null,
  openModal: (mode = "signin", callback) => 
    set({ isModalOpen: true, modalMode: mode, onSuccessCallback: callback || null }),
  closeModal: () => set({ isModalOpen: false, onSuccessCallback: null }),
=======
export const useAuth = create<AuthState>((set) => ({
  user: null,
  isModalOpen: false,
  modalMode: "signin",
  openModal: (mode = "signin") => set({ isModalOpen: true, modalMode: mode }),
  closeModal: () => set({ isModalOpen: false }),
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
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
<<<<<<< HEAD
    const { password: _pw, ...localUser } = found;

    // 🚀 Sync with Neon Postgres Server Database
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
=======
    const { password: _pw, ...user } = found;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user, isModalOpen: false });
    return user;
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
  },
  signUp: async (name, email, password, phone) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists");
    }
<<<<<<< HEAD
    
    const localUser: User = {
=======
    const user: User = {
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };
<<<<<<< HEAD

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
=======
    writeUsers([...users, { ...user, password }]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user, isModalOpen: false });
    return user;
>>>>>>> 11f2069fcc43f46632a8f54260f077e6d52388cc
  },
  signOut: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
}));