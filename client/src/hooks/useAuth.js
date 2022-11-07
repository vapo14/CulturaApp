import * as React from "react";
import axiosInstance from "../api/axiosInstance";
import Cookies from "js-cookie";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [UserData, setUserData] = React.useState({
    username: localStorage.getItem("username") || "",
    userId: localStorage.getItem("userId") || "",
  });

  React.useEffect(() => {
    if (Cookies.get("filmur_s")) {
      setAuthed(true);
    } else {
      setAuthed(false);
    }
  }, [authed]);

  return {
    UserData,
    authed,
    login(credentials) {
      return new Promise(async (res) => {
        const data = await axiosInstance
          .post("/user/login", credentials)
          .catch((error) => {
            return { status: "FAILED", message: error };
          });
        if (data.status === 200) {
          setUserData(data.data);
          localStorage.setItem("username", data.data.username);
          localStorage.setItem("userId", data.data.userId);
          setAuthed(true);
        } else {
          // handle message
          setAuthed(false);
        }
        res(data.status);
      });
    },
    logout() {
      return new Promise(async (res) => {
        const data = await axiosInstance.delete("/user/logout");
        if (data.status === 200) {
          setUserData({ username: "", userId: "" });
          localStorage.removeItem("username");
          localStorage.removeItem("userId");
          setAuthed(false);
        }
        res();
      });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
