import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ChatSection from '@/components/ChatSection';

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <main>
        <ChatSection />
      </main>
    </>
  );
}
