import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [state, setState] = useState({
    loading: null,
    success: null,
    error: null,
    user: null,
  });

  const router = useRouter();
  const apiBaseUrl = "http://localhost:3000";

  const login = async (data) => {
    try {
      const result = await axios.post(`${apiBaseUrl}/api/auth/login`, data);

      setState((prevState) => ({
        ...prevState,
        success: result.data?.message,
        error: null,
      }));

      router.push("/");
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.response?.data?.message || "Login failed",
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ state, login }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
