import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [state, setState] = useState({
    loading: null,
    error: null,
    user: null,
  });

  const router = useRouter();
  const apiBaseUrl = "http://localhost:3000";

  const login = async (data) => {
    try {
      const result = await axios.post(`${apiBaseUrl}/api/auth/login`, data);

      //   log result
      console.log(result);
      alert(result.data.message);
      router.push("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);

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
