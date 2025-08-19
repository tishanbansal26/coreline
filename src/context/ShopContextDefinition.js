import { createContext } from 'react';

// This file solely defines the context, allowing the provider to be in its own
// file for React Fast Refresh compatibility.
export const ShopContext = createContext(null);
