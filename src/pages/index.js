import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Footer from '../components/Footer';
import styles from './index.module.css';

import { Homepage } from '../components/Homepage';


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <Layout
        title={`${siteConfig.title}`}
        description="Description will go into a meta tag in <head />">
        <Homepage/>
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
      {/* <Footer/> */}
    </>
  );
}
