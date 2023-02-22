import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import styles from "./index.module.scss";
import Input from '../Input';
import Logo from "../../../public/logo.png";

import { AccountCircleRounded, Filter, FilterAlt, FilterAltRounded, Menu, SearchRounded, TuneSharp } from '@mui/icons-material';
import { useRouter } from 'next/router';



const Header = () => {
  const [value, setValue] = useState();
  const router = useRouter();

  const handleChangeInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

    return (
        <header className={styles.header_main}>
        <div className={styles.header_logo} onClick={()=>{router.push("/home")}}>
        <img src={Logo.src} alt="Netflix" />
        </div>
        <div className={styles.searchBar}>
          <Input name="search" classes={styles.inputSearch} handleChange={(e)=>{ handleChangeInput(e.target.value)}}/>
          <SearchRounded className={styles.icons} onClick={()=>{setOpenModal(!openModal)}} />
        </div>
        <div className={styles.header_menu}>
          <ul className={styles.nav_list}>
            <li className={styles.nav_item}>
            <Link href="/ressource">
                ressource
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link href="/campagne">
                campagne
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link href="/admin">
                admin
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
}

export default Header;
