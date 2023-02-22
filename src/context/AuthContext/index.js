import {createContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false);

    
 

    return (
    <AuthContext.Provider>
        {children}
    </AuthContext.Provider>
    )

}

