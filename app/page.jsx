import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import NetworkLabs from '@/components/sections/NetworkLabs';
import BentoGrid from '@/components/sections/BentoGrid';
import Skills from '@/components/sections/Skills';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import Certificates from '@/components/sections/Certificates';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="relative bg-black transition-colors duration-500">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <NetworkLabs />
      <BentoGrid />
      <ExperienceTimeline />
      <Certificates />
      <ContactForm />
      <Footer />
    </main>
  );
}
