import { createContext, useContext } from 'react';

export type PortalOpenArgs = {
  route: string;
  x: number;
  y: number;
  color?: string;
  effect?: 'sky' | 'tunnel';
};

export const PortalContext = createContext<{ open: (a: PortalOpenArgs) => void }>({
  open: () => {},
});

export const usePortal = () => useContext(PortalContext);
