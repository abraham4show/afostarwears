import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
};

type AuthState = {
  user: User | null;
  isModalOpen: boolean;
  modalMode: "signin" | "signup";
  openModal: (mode?: "signin" | "signup") => void;
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

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isModalOpen: false,
  modalMode: "signin",
  openModal: (mode = "signin") => set({ isModalOpen: true, modalMode: mode }),
  closeModal: () => set({ isModalOpen: false }),
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
    const { password: _pw, ...user } = found;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user, isModalOpen: false });
    return user;
  },
  signUp: async (name, email, password, phone) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with this email already exists");
    }
    const user: User = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };
    writeUsers([...users, { ...user, password }]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    set({ user, isModalOpen: false });
    return user;
  },
  signOut: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ user: null });
  },
}));