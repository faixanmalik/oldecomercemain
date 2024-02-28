'use client'

import React from 'react';

type SaveChangesContextType = {
  shouldSave: boolean;
  setShouldSave: (shouldSave: boolean) => void;
}

export const SaveChangesContext = React.createContext<SaveChangesContextType>({
  shouldSave: false,
  setShouldSave: () => { },
});

export function SaveChangesProvider({ children }: { children: React.ReactNode }) {
  const [shouldSave, setShouldSave] = React.useState(false);

  return (
    <SaveChangesContext.Provider value={{ shouldSave, setShouldSave }}>
      {children}
    </SaveChangesContext.Provider>
  );
}
