import React, { createContext } from 'react';
import useAuthentication from '../Hooks/useAuthentication';

export const authContext=createContext();
const AuthProvider = ({ children}) => {
    const allContext=useAuthentication();
    return (
        <authContext.Provider value={allContext}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;