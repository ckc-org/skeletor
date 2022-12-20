import React, {useMemo} from 'react';
import Link from 'next/link';
import Image from "next/image";
import logo from '../../../assets/images/ckc.png';
import {AppBar, Toolbar, Typography} from '@mui/material';
import styles from './header.module.css'

function Header() {
  return (
    <AppBar position="static">
      <Toolbar className="d-flex justify-between">
        <Link href="/">
          <Image src={logo} alt="Logo" className={styles.image} />
        </Link>
        <div className="d-flex">
          <Link className={styles.link} href="/">
            Home
          </Link>
          <Link className={styles.link} href="/">
            Pricing
          </Link>
          <Link className={styles.link} href="/">
            Projects
          </Link>
          <Link className={styles.link} href="/">
            Settings
          </Link>
          <Link className={styles.link} href="/harvey_login">
            Login
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
