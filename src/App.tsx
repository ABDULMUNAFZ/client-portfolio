import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { appReady, gsap, markReady, reduced, ScrollTrigger, scrollToTarget } from './lib/motion';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import { CloudDefs } from './components/Clouds';
import Topbar from './components/Topbar';
import Dock from './components/Dock';
import Home from './pages/Home';
import Project from './pages/Project';

function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    const lenis = new Lenis({ lerp: 0.09 });
    window.__lenis = lenis;
    lenis.stop();
    appReady.then(() => lenis.start());
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); window.__lenis = undefined; };
  }, []);
}

export default function App() {
  const { pathname, hash } = useLocation();
  useSmoothScroll();

  useEffect(() => { history.scrollRestoration = 'manual'; markReady(); }, []);

  // New page: jump to top (or the requested section) once layout + pins are measured.
  useEffect(() => {
    scrollToTarget(0, true);
    const id = setTimeout(() => {
      ScrollTrigger.refresh();
      if (hash) appReady.then(() => scrollToTarget(hash));
    }, 120);
    return () => clearTimeout(id);
  }, [pathname, hash]);

  return (
    <>
      <CloudDefs />
      <Cursor />
      <Topbar />
      <main id="top">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:id" element={<Project />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Dock />
    </>
  );
}
