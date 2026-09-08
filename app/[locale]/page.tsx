import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ChatSection from '@/components/ChatSection';
import Expertise from '@/components/Expertise';
import Projets from '@/components/Projets';
import Apropos from '@/components/Apropos';
import TrailFooter from '@/components/TrailFooter';
import ScrollFX from '@/components/ScrollFX';

export default function Page() {
  return (
    <>
      <ScrollFX />
      <Nav />
      <Hero />
      <Marquee />
      <main>
        <ChatSection />
        <Expertise />
        <Projets />
        <Apropos />
      </main>
      <TrailFooter />
    </>
  );
}
