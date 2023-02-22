import {createContext, useState, useEffect} from 'react';
import RessourceService from "../../services/ressource.service";

const RessourceContext = createContext();

export default RessourceContext;

export const RessourceContextProvider = ({ children }) => {

    const [ressources, setRessources] = useState(false);

    useEffect(() => {
        RessourceService.getRessources
    }, [places, router.isReady])
 

    return (
    <RessourceContext.Provider>
        {children}
    </RessourceContext.Provider>
    )

}

