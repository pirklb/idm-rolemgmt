import { createContext, useContext, useState } from 'react'

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'anonymous' });
  const [search, setSearch] = useState('');
  const [roles, setRoles] = useState([]);
  return <AppContext.Provider value={{ user, setUser, search, setSearch, roles, setRoles }}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext);