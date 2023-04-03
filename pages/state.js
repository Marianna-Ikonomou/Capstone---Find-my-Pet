import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export const StateContext = React.createContext([]);

export const StateProvider = ({ children }) => {
  if (typeof window !== "undefined") {
    const [submissions, setSubmissions] = React.useState(() => {
      const storedSubmissions = localStorage.getItem("submissions");
      return storedSubmissions ? JSON.parse(storedSubmissions) : [];
    });

    return (
      <StateContext.Provider value={[submissions, setSubmissions]}>
        {children}
      </StateContext.Provider>
    );
  }
};
