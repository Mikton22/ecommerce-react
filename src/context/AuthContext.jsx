import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";

const AuthContext = createContext(null);

function getInitialUser() {
  const email = localStorage.getItem("currentUserEmail");
  return email ? { email } : null;
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser);

  const signUp = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already exists" };
    }

    const newUser = { email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });

    return { success: true };
  }, []);

  const login = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      signUp,
      login,
      logout,
    }),
    [user, signUp, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
