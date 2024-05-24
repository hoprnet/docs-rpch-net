import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import lottie from 'lottie-web';
import animation from '../../../static/animations/RPCh_hero_wallets.json';
import styled from 'styled-components';

export const AnimationContainer = styled.section`
    max-width: 320px;
    margin: auto;
`;

export const Animation = styled.section`
  height: 100%;
  width: 100%;
`;

export function Homepage() {
  const {siteConfig} = useDocusaurusContext();

  const animationLoaded = useRef(null);
  useEffect(() => {
    if (!animationLoaded.current) {
      lottie.loadAnimation({
        container: document.querySelector('#hero-rpch-animation'),
        animationData: animation,
        loop: true,
      });
    }
    animationLoaded.current = true;
  }, []);

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <br/>
        <AnimationContainer>
          <Animation id="hero-rpch-animation" />
        </AnimationContainer>

        <div className={styles.buttons}>
          {/* <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link> */}
        </div>
      </div>
    </header>
  );
}