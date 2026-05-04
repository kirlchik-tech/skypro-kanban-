import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  signIn as signInRequest,
  signUp as signUpRequest,
  logout as logoutRequest,
  isAuthenticated,
} from "../services/auth";

const AuthContext = createContext(null);

const getSavedUser = () => {
  try {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getSavedUser);
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  const login = useCallback(async (loginValue, password) => {
    const data = await signInRequest(loginValue, password);

    setUser(data.user);
    setIsAuth(true);

    return data;
  }, []);

  const register = useCallback(async (loginValue, name, password) => {
    const data = await signUpRequest(loginValue, name, password);

    setUser(data.user);
    setIsAuth(true);

    return data;
  }, []);

  const logout = useCallback(() => {
    logoutRequest();
    setUser(null);
    setIsAuth(false);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAuth,
      login,
      register,
      logout,
    }),
    [user, isAuth, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }

  return context;
};
