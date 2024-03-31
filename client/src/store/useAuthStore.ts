import { create } from "zustand";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
}

export interface AuthStore extends AuthState {
    setIsAuthenticated: (args: AuthState["isAuthenticated"]) => void;
    setToken: (token: string | null) => void;
    removeToken: () => void;
    goLogout: () => void;
}

const initialState: Pick<AuthStore, keyof AuthState> = {
    isAuthenticated: false,
    token: null,
};

export const useAuthStore = create<AuthStore>()((set) => ({
    ...initialState,
    setIsAuthenticated: (isAuthenticated) => {
        set(() => ({ isAuthenticated }));
    },
    setToken: (token) => {
        set(() => ({ token }));
    },
    removeToken: () => {
        set(() => ({ token: null }));
    },
    goLogout: async () => {
        set(() => ({ token: null, refreshToken: null, isAuthenticated: false }));
    },
}));

export default useAuthStore;
