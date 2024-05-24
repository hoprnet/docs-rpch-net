import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={clsx('footer', styles.footer)}>
      <div className="container container-fluid">
        <div className="footer__bottom text--center">
          <div className="footer__copyright">
            ©2023 HOPR Association, all rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
