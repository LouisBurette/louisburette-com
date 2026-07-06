import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ChatSection from '@/components/ChatSection';
import Expertise from '@/components/Expertise';
import Projets from '@/components/Projets';
import Partenaire from '@/components/Partenaire';
import Apropos from '@/components/Apropos';
import TrailFooter from '@/components/TrailFooter';

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <main>
        <ChatSection />
        <Expertise />
        <Projets />
        <Partenaire />
        <Apropos />
      </main>
      <TrailFooter />
    </>
  );
}
