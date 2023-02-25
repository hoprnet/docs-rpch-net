import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import  { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import styles from './index.module.css';

import { Homepage } from '../components/Homepage';


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  {
    return <Redirect to='/docs/tutorial-basics/What-is-RPCh' />;
  }
}
