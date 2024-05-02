'use client';

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Home, Movies, Tv } from '@/routes';

import { NAV_ROUTES, TODO } from '@/types/global-types';
import { isValidRoute } from '@/lib/utils';

type NavigationContextProps = {
  lastActiveRoute: TODO;
  setLastActiveRoute: Dispatch<SetStateAction<TODO>>;
} | null;

type NavigationProviderProps = { children: ReactNode };

const NavigationContext = createContext<NavigationContextProps>(null);

const ROUTE_HANDLERS = {
  [NAV_ROUTES.home]: () => Home(),
  [NAV_ROUTES.tv]: () => Tv(),
  [NAV_ROUTES.movies]: () => Movies(),
};

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const pathname = usePathname();
  const [lastActiveRoute, setLastActiveRoute] = useState<TODO>();

  useEffect(() => {
    const isValid = isValidRoute(pathname);
    if (isValid && ROUTE_HANDLERS[pathname]) setLastActiveRoute(pathname);
  }, [pathname, setLastActiveRoute]);

  return (
    <NavigationContext.Provider value={{ lastActiveRoute, setLastActiveRoute }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationStore = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigationStore must be used within a NavigationProvider');
  return context;
};
