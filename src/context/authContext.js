import { createContext, useEffect, useState } from "react";
import axios from 'axios'


export const AuthContext = createContext();
const HOST = process.env.REACT_APP_HOST;
export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    //TO DO
      
      const res = await axios.post(`${HOST}/api/auth/login`,inputs,{withCredentials:true});
      console.log(res.data);
      setCurrentUser(res.data);

    }

    const logout = async ()=>{
      await axios.post(`${HOST}/api/auth/logout`, {withCredentials:true});
      setCurrentUser(null);
  }
   
  

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser,login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};