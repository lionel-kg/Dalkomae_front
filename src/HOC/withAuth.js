import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

const WithAuth = (WrappedComponent) => {

    return () => {

        const router = useRouter();

        const [isLogged, setIsLogged] = useState(true);

        useEffect(() => {
            const token = localStorage.getItem('token');
            if(token){
                setIsLogged(true);
            }

            else{
                setIsLogged(false);
            }
        }, [])

        if (isLogged){
            return <WrappedComponent/>
        } else{
            router.push("/")
        }
           
    }

}

export default WithAuth;
