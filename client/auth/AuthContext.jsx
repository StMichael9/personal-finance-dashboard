import { useEffect, useState } from "react";
import axios from "axios";

import { createContext } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signUp = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post("/signup", userData);
      setUser(res.data);
    } catch {
      setUser(null);
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    setLoading(true);
    try {
      const res = await axios.post("/login", userData);
      setUser(res.data);
    } catch {
      setUser(null);
      setError("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/logout");
      setUser(null); // Because the backend’s /logout route does not return a user.
    } catch {
      setError("Logout Failed");
    } finally {
      setLoading(false);
    }
  };

  const checkSession = async () => {
    try {
      const res = await axios.get("/check_session");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, signUp, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthProvider };
