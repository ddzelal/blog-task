import { create } from "zustand";
import { getItem } from "../utils/localStorage";
import { LOCAL_STORAGE_KEY } from "../constants/appConstant";
import { User } from "../interfaces/user";

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: User | null;
}

export interface AuthStore extends AuthState {
    setIsAuthenticated: (args: AuthState["isAuthenticated"]) => void;
    setToken: (token: string | null) => void;
    removeToken: () => void;
    goLogout: () => void;
    setUser: (user: User | null) => void; 
}

const initialState: Pick<AuthStore, keyof AuthState> = {
    isAuthenticated: getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN) ? true : false,
    token: null,
    user:null
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
        set(() => ({ token: null, refreshToken: null, isAuthenticated: false ,user:null}));
    },
    setUser: (user) => {
        set(() => ({ user }));
    },
}));

export default useAuthStore;
