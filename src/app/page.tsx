import Header from '@/components/sections/Header/Header';
import Hero from '@/components/sections/Hero/Hero';
import Showreel from '@/components/sections/Showreel/Showreel';
import Intro from '@/components/sections/Intro/Intro';
import WorkIndex from '@/components/sections/WorkIndex/WorkIndex';
import ServicesPoster from '@/components/sections/ServicesPoster/ServicesPoster';
import ProcessStory from '@/components/sections/ProcessStory/ProcessStory';
import About from '@/components/sections/About/About';
import FooterClose from '@/components/sections/FooterClose/FooterClose';

export default function Page() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Showreel />
        <Intro />
        <WorkIndex />
        <ServicesPoster />
        <ProcessStory />
        <About />
      </main>
      <FooterClose />
    </>
  );
}
