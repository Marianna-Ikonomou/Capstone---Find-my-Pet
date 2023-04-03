import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";

export const StateContext = React.createContext([]);

export const StateProvider = ({ children }) => {
  const [submissions, setSubmissions] = useLocalStorageState("submissions", {
    defaultValue: [],
  });
  return (
    <StateContext.Provider value={[submissions, setSubmissions]}>
      {children}
    </StateContext.Provider>
  );
};
