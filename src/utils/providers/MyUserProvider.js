
import React, { useReducer, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { MyUserContext } from "../MyContexts";
import { MyUserReducer } from "../reducers/MyUserReducer";

export const MyUserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(MyUserReducer, null);

useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await SecureStore.getItemAsync("user");
        if (userData) {
          dispatch({ type: "login", payload: JSON.parse(userData) }); 
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    const saveUser = async () => {
      if (user) {
        await SecureStore.setItemAsync("user", JSON.stringify(user));
      } else {
        await SecureStore.deleteItemAsync("user");
      }
    };
    saveUser();
  }, [user]);

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      {children}
    </MyUserContext.Provider>
  );
};