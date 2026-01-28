"use client"

import {createContext, useContext, useState, useEffect} from 'react'  

type Role = "admin" | "user";

type AuthState = {
  isAuthenticated: boolean;
  role: Role | null;
  fullName: string;
  email: string;
  isLoading: boolean;
};

type AuthContextType = {
  auth: AuthState;
  setAuthFromServer: (role: Role, fullName: string, email: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "news-shelter"

export function AuthProvider({children}: {children: React.ReactNode}){

    // const [auth, setAuth] = useState<AuthState>(() => {
    //   if (typeof window === "undefined") {
    //     return { isAuthenticated: false, role: null };
    //   }

    //   const stored = localStorage.getItem("news-shelter-auth");
    //   return stored
    //     ? JSON.parse(stored)
    //     : { isAuthenticated: false, role: null };
    // });

    const [auth, setAuth] = useState<AuthState>({
        isAuthenticated: false,
        role: null,
        fullName: "",
        email: "",
        isLoading: true,
    });

    // hydrate auth on refresh
    useEffect(() => {
      const syncAuth = async () => {
        try {
          const res = await fetch("/api/users/me", {
            credentials: "include",
          });

          if (!res.ok) throw new Error("Not authenticated");

          const data = await res.json();

          setAuth({
            isAuthenticated: true,
            role: data.role,
            fullName: data.fullName,
            email: data.email,
            isLoading: false,
          });

          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              isAuthenticated: true,
              role: data.role,
              fullName: data.fullName,
              email: data.email,
            }),
          );
        } catch {
          logout();
        }
      };

      syncAuth();
    }, []);

    //  called after successful login api response

    const setAuthFromServer = (role: Role, fullName: string, email: string) => {
        const data = {
            isAuthenticated: true,
            role,
            fullName,
            email,
            isLoading: false,
        }

        setAuth(data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    // const login = (role: Role) => {
    //     const data = {isAuthenticated: true, role};
    //     setAuth(data);
    //     localStorage.setItem("news-shelter-auth", JSON.stringify(data));
    // }

    const logout = async() => {
        localStorage.removeItem(STORAGE_KEY);

        setAuth({
            isAuthenticated: false,
            role: null,
            fullName: "",
            email: "",
            isLoading: false,
        })
    }

    return (
        <AuthContext.Provider value={{auth, setAuthFromServer, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}