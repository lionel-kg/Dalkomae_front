import '@/styles/globals.css'
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router'
import LoginLayout from '../layouts/LoginLayout';
import MainLayout from '../layouts/MainLayout';
import {AuthContextProvider} from "../context/AuthContext"

export default function App({ Component, pageProps }) {

  const router = useRouter()


  return (
      <>
        {
        router && router.pathname === '/' ? (
          <LoginLayout>
            <Component {...pageProps} />
          </LoginLayout>
        ) : (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>  
        )}   
      </>
    )
}
