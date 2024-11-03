"use client";
import { createContext, useContext, useState } from "react";

const SideNavContext = createContext({
  expanded: false,
  setExpanded: () => {},
});

export function SideNavProvider({ children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <SideNavContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SideNavContext.Provider>
  );
}

export function useSideNav() {
  return useContext(SideNavContext);
}
